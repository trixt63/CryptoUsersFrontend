import { LS } from 'src/constants';
import BSC from 'public/images/tokens/BSC.svg';
import ETH from 'public/images/tokens/ETH.png';
import FTM from 'public/images/tokens/FTM.svg';

export const NETWORKS = [
  { id: 0, name: 'All' },
  {
    id: 1,
    name: 'BSC',
    chainId: '56',
    hexChainId: '0x38',
    blockExplorerUrls: ['https://bscscan.com/'],
    metadata: {
      chainName: 'BSC Mainnet',
      shortName: 'BSC',
      image: BSC,
    },
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: [
      'https://bsc-dataseed.binance.org/',
      'https://bsc-dataseed1.binance.org/',
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed2.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
      'https://bsc-dataseed2.ninicoin.io/',
    ],
  },
  {
    id: 2,
    name: 'FTM',
    chainId: '250',
    hexChainId: '0xfa',
    blockExplorerUrls: ['https://ftmscan.com/'],
    metadata: {
      chainName: 'Fantom Opera',
      shortName: 'FTM',
      image: FTM,
    },
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://nd-556-873-672.p2pify.com/a2f14010fdfd5ed907a6e8f2307d8c21'],
  },
  {
    id: 3,
    name: 'ETH',
    chainId: '1',
    hexChainId: '0x1',
    blockExplorerUrls: ['https://etherscan.io'],
    metadata: {
      chainName: 'ETH Mainnet',
      shortName: 'ETH',
      image: ETH,
    },
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://nd-867-350-180.p2pify.com/783c7718e05463aa0828656842db85a7'],
  },
];

export const getCurrentNetwork = () => {
  const id = localStorage.getItem(LS.ID) || NETWORKS[0].id;
  const data = NETWORKS.find((item) => {
    if (item.id === Number(id)) {
      return item;
    }
  });
  return data;
};

export const chainSelectConfigs: { [key: string]: { chainId: string; name: string; img: string } } = {
  '0x38': {
    chainId: '0x38',
    name: 'BNB Smart Chain',
    img: '/images/chains/56.png',
  },
  '0x1': {
    chainId: '0x1',
    name: 'Ethereum',
    img: '/images/chains/1.png',
  },
  '0xfa': {
    chainId: '0xfa',
    name: 'Fantom',
    img: '/images/chains/250.png',
  },
  '0x89': {
    chainId: '0x89',
    name: 'Polygon',
    img: '/images/chains/137.png',
  },
};
