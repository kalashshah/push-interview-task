import {KEY, NFT_CONTRACT, BASE_URL} from '@env';

export const GLOBAL = {
  env: {
    KEY,
    NFT_CONTRACT,
    BASE_URL,
  },
  pagination: {
    LIMIT: 10,
    /*
     @dev tokenId 89 has broken data hence +1
      */
    MAX: 101,
  },
  colors: {
    PRIMARY_BLUE: '#384aff',
  },
};
