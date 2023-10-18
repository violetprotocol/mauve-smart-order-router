import { BigNumber } from '@ethersproject/bignumber';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { BlockNativeGasPriceProvider } from '../../../src/providers/blocknative-gas-price-provider';

jest.mock('axios');

describe('gas price provider', () => {
  let gasPriceProvider: BlockNativeGasPriceProvider;
  beforeAll(() => {
    mocked(axios.get).mockResolvedValue({
      data: {
        blockPrices: [
          {
            baseFeePerGas: 9000000,
            estimatedPrices: [
              {
                maxPriorityFeePerGas: 1000000,
              },
            ],
          },
        ],
      },
      status: 200,
    });

    gasPriceProvider = new BlockNativeGasPriceProvider('dummyUrl');
  });

  test('succeeds to get gas price and converts it to wei', async () => {
    await expect(gasPriceProvider.getGasPrice()).resolves.toMatchObject({
      gasPriceWei: BigNumber.from('10000000'),
    });
  });
});
