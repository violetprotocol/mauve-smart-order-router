import { BigNumber } from '@ethersproject/bignumber';

import { GasPrice, IGasPriceProvider } from './gas-price-provider';

export class HighGasPriceProvider extends IGasPriceProvider {
  public async getGasPrice(): Promise<GasPrice> {
    return { gasPriceWei: BigNumber.from(500) };
  }
}
