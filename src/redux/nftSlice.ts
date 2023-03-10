import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';

import {GLOBAL} from '../GLOBAL';
import {NFT} from '../types/NFT';
import {Bookmark} from '../types/Bookmark';

const {BASE_URL, NFT_CONTRACT, KEY} = GLOBAL.env;
const {LIMIT, MAX} = GLOBAL.pagination;

const initialState = {
  nfts: [] as NFT[],
  refreshing: false,
  loading: false,
  endReached: false,
  tokenId: 0,
};

export const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    setNFTs: (state, action: PayloadAction<NFT[]>) => {
      state.nfts = action.payload;
    },
    addNfts: (state, action: PayloadAction<NFT[]>) => {
      state.nfts = [...state.nfts, ...action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.refreshing = action.payload;
    },
    setEndReached: (state, action: PayloadAction<boolean>) => {
      state.endReached = action.payload;
    },
    setTokenId: (state, action: PayloadAction<number>) => {
      state.tokenId = action.payload;
    },
  },
});

export const {
  setNFTs,
  addNfts,
  setLoading,
  setRefreshing,
  setEndReached,
  setTokenId,
} = nftSlice.actions;

export default nftSlice.reducer;

const getApiCall = (tokenId: number): Promise<any> => {
  return fetch(
    `${BASE_URL}/${NFT_CONTRACT}/nft_metadata/${tokenId}/?key=${KEY}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getNFTFeed = ({
  tokenId = 0,
  loading = false,
  endReached = false,
  refresh = false,
}) => {
  return async (dispatch: Dispatch) => {
    try {
      if (refresh) {
        dispatch(setTokenId(0));
        dispatch(setRefreshing(true));
      }
      const jsonBookmarks = await AsyncStorage.getItem('bookmarks');
      const bookmarks: Bookmark[] = jsonBookmarks
        ? JSON.parse(jsonBookmarks)
        : [];
      if (!endReached || refresh === true) {
        let newTokenId = tokenId + LIMIT;
        /*
          @dev: 89 is a missing token and skipping it
        */
        if (newTokenId === 90 || newTokenId === 100) {
          newTokenId++;
        }
        if (newTokenId >= MAX) {
          dispatch(setEndReached(true));
          return;
        }
        if (!loading) {
          dispatch(setLoading(true));
          const promises = [];
          for (let i = tokenId + 1; i <= newTokenId; i++) {
            /*
              @dev: 89 is a missing token and skipping it
            */
            if (i === 89) {
              continue;
            }
            promises.push(getApiCall(i));
          }
          const responses = await Promise.all(promises);
          const nfts: NFT[] = await Promise.all(
            responses.map(async response => {
              const res = await response.json();
              const data = res.data;
              const nftData = data.items[0].nft_data[0];
              return {
                name: nftData.external_data.name,
                imageUrl: nftData.external_data.image_256,
                owner: nftData.owner_address,
                animationUrl: nftData.external_data.animation_url,
                tokenId: nftData.token_id,
                isBookmarked:
                  bookmarks.find(
                    bookmark => bookmark.id === nftData.token_id,
                  ) !== undefined,
              };
            }),
          );
          dispatch(setTokenId(newTokenId));
          if (refresh || tokenId === 0) {
            dispatch(setNFTs(nfts));
            dispatch(setEndReached(false));
          } else {
            dispatch(addNfts(nfts));
          }
          if (nfts.length === 0 || newTokenId >= MAX) {
            dispatch(setEndReached(true));
          }
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
      dispatch(setRefreshing(false));
    }
  };
};
