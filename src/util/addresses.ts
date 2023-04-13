import { Token } from '@violetprotocol/mauve-sdk-core';
import { FACTORY_ADDRESS } from '@violetprotocol/mauve-v3-sdk';
import { ChainId, NETWORKS_WITH_SAME_UNISWAP_ADDRESSES } from './chains';

// Phlox Re-Deployments
const GOERLI_FACTORY_ADDRESS = '0x1EA6C6917e5b707aFfA07e00B7c6CD8dC346bB36';
// const GOERLI_SWAP_ROUTER = '0x9A119a53cb065202d631ba01d55e3850eDcf3EAa'
const GOERLI_SWAP_ROUTER_02 = '0x0ff2D6676456805b5218Dbc91A641fed48a1Ae78';
const GOERLI_POSITION_MANAGER = '0xaa8e717846745B6E7174A1bbd22e53500d767c21';
const GOERLI_QUOTER_V2 = '0xEc53699651FA98b967a08670055478BE6e99FbF5';
const GOERLI_QUOTER = '0x5dED7B5753488229fF3D46147Bcc02579af5480c';

// const ARBITRUM_GOERLI_V3_CORE_FACTORY_ADDRESSES =
//   '0x4893376342d5D7b3e31d4184c08b265e5aB2A3f6';
// const ARBITRUM_GOERLI_QUOTER_ADDRESSES =
//   '0x1dd92b83591781D0C6d98d07391eea4b9a6008FA';
// const ARBITRUM_GOERLI_MULTICALL_ADDRESS =
//   '0x8260CB40247290317a4c062F3542622367F206Ee';

export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  ...constructSameAddressMap(FACTORY_ADDRESS),
  // [ChainId.CELO]: CELO_V3_CORE_FACTORY_ADDRESSES,
  // [ChainId.CELO_ALFAJORES]: CELO_V3_CORE_FACTORY_ADDRESSES,

  // [ChainId.ARBITRUM_GOERLI]: ARBITRUM_GOERLI_V3_CORE_FACTORY_ADDRESSES,
  // TODO: Gnosis + Moonbeam contracts to be deployed
  // override GOERLI
  [ChainId.GOERLI]: GOERLI_FACTORY_ADDRESS,
};

export const QUOTER_V2_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x61fFE014bA17989E743c5F6cB21bF9697530B21e'),
  // [ChainId.CELO]: CELO_QUOTER_ADDRESSES,
  // [ChainId.CELO_ALFAJORES]: CELO_QUOTER_ADDRESSES,

  // [ChainId.ARBITRUM_GOERLI]: ARBITRUM_GOERLI_QUOTER_ADDRESSES,
  // TODO: Gnosis + Moonbeam contracts to be deployed
  // override GOERLI
  [ChainId.GOERLI]: GOERLI_QUOTER_V2,
};

export const MIXED_ROUTE_QUOTER_V1_ADDRESSES: AddressMap = {
  [ChainId.MAINNET]: '0x84E44095eeBfEC7793Cd7d5b57B7e401D7f1cA2E',
  [ChainId.RINKEBY]: '0x84E44095eeBfEC7793Cd7d5b57B7e401D7f1cA2E',
  [ChainId.ROPSTEN]: '0x84E44095eeBfEC7793Cd7d5b57B7e401D7f1cA2E',
  // // override GOERLI
  [ChainId.GOERLI]: GOERLI_QUOTER,
};

export const UNISWAP_MULTICALL_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984'),
  // [ChainId.CELO]: CELO_MULTICALL_ADDRESS,
  // [ChainId.CELO_ALFAJORES]: CELO_MULTICALL_ADDRESS,

  // [ChainId.ARBITRUM_GOERLI]: ARBITRUM_GOERLI_MULTICALL_ADDRESS,
  // TODO: Gnosis + Moonbeam contracts to be deployed
};

export const OVM_GASPRICE_ADDRESS =
  '0x420000000000000000000000000000000000000F';
export const ARB_GASINFO_ADDRESS = '0x000000000000000000000000000000000000006C';

export const TICK_LENS_ADDRESS = '0xbfd8137f7d1516D3ea5cA83523914859ec47F573';
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = GOERLI_POSITION_MANAGER;
export const SWAP_ROUTER_02_ADDRESS = GOERLI_SWAP_ROUTER_02;
export const V3_MIGRATOR_ADDRESS = '0xA5644E29708357803b5A882D272c41cC0dF92B34';
export const MULTICALL2_ADDRESS = '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696';

export type AddressMap = { [chainId: number]: string };

export function constructSameAddressMap<T extends string>(
  address: T,
  additionalNetworks: ChainId[] = []
): { [chainId: number]: T } {
  return NETWORKS_WITH_SAME_UNISWAP_ADDRESSES.concat(
    additionalNetworks
  ).reduce<{
    [chainId: number]: T;
  }>((memo, chainId) => {
    memo[chainId] = address;
    return memo;
  }, {});
}

export const WETH9: {
  [chainId in Exclude<
    ChainId,
    | ChainId.POLYGON
    | ChainId.POLYGON_MUMBAI
    | ChainId.CELO
    | ChainId.CELO_ALFAJORES
    | ChainId.GNOSIS
    | ChainId.MOONBEAM
  >]: Token;
} = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.GOERLI]: new Token(
    ChainId.GOERLI,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.KOVAN]: new Token(
    ChainId.KOVAN,
    '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.OPTIMISM]: new Token(
    ChainId.OPTIMISM,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.OPTIMISTIC_KOVAN]: new Token(
    ChainId.OPTIMISTIC_KOVAN,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ARBITRUM_ONE]: new Token(
    ChainId.ARBITRUM_ONE,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ARBITRUM_RINKEBY]: new Token(
    ChainId.ARBITRUM_RINKEBY,
    '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ARBITRUM_GOERLI]: new Token(
    ChainId.ARBITRUM_GOERLI,
    '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3',
    18,
    'WETH',
    'Wrapped Ether'
  ),
};
