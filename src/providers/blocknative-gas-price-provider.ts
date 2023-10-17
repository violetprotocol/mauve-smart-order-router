import { BigNumber } from '@ethersproject/bignumber';
import retry from 'async-retry';
import axios from 'axios';

import { log } from '../util/log';

import { GasPrice, IGasPriceProvider } from './gas-price-provider';

// Gas prices from ethgasstation are in x10 Gwei. Must divide by 10 to use.
export type BlockNativeGasPriceResponse = {
  system: string;
  network: string;
  unit: string;
  maxPrice: number;
  currentBlockNumber: number;
  msSinceLastBlock: number;
  blockPrices: BlockPrice[];
  estimatedBaseFees: { [block: string]: BaseFeeEstimate };
};

interface BlockPrice {
  blockNumber: number;
  estimatedTransactionCount: number;
  baseFeePerGas: number;
  estimatedPrices: PriceEstimate[];
}

interface PriceEstimate {
  confidence: number;
  price: number;
  maxPriorityFeePerGas: number;
  maxFeePerGas: number;
}

interface BaseFeeEstimate {
  confidence: number;
  baseFee: number;
}

export class BlockNativeGasPriceProvider extends IGasPriceProvider {
  private apiKey: string;
  private url: string;
  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
    this.url = 'https://api.blocknative.com/gasprices/blockprices';
  }

  public async getGasPrice(): Promise<GasPrice> {
    log.info(`About to get gas prices from gas station ${this.url}`);
    const response = await retry(
      async () => {
        return axios.get<BlockNativeGasPriceResponse>(this.url, {
          headers: { Authorization: `${this.apiKey}` },
        });
      },
      { retries: 1 }
    );

    const { data: gasPriceResponse, status } = response;

    if (status != 200) {
      log.error({ response }, `Unabled to get gas price from ${this.url}.`);

      throw new Error(`Unable to get gas price from ${this.url}`);
    }

    log.info(
      { gasPriceResponse },
      'Gas price response from API. About to parse "fast" to big number'
    );

    // Gas prices from ethgasstation are in GweiX10.
    const baseFee = BigNumber.from(
      Math.ceil(gasPriceResponse.blockPrices[0]!.baseFeePerGas)
    );
    const priorityFee = BigNumber.from(
      Math.ceil(
        gasPriceResponse.blockPrices[0]!.estimatedPrices[0]!
          .maxPriorityFeePerGas
      )
    );

    log.info(
      `Base gas price in wei: ${baseFee} and max priority fee: ${priorityFee} as of block ${
        gasPriceResponse.blockPrices[0]!.blockNumber
      }`
    );

    return { gasPriceWei: baseFee.add(priorityFee) };
  }
}
