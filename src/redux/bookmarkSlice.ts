import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {Bookmark} from '../types/Bookmark';
import {NFT} from '../types/NFT';

const initialState = {
  bookmarks: [] as Bookmark[],
  loading: false,
};

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setBookmarks: (state, action: PayloadAction<Bookmark[]>) => {
      state.bookmarks = action.payload;
    },
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      state.bookmarks = [...state.bookmarks, action.payload];
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      state.bookmarks = state.bookmarks.filter(
        bookmark => bookmark.id !== action.payload,
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {setBookmarks, addBookmark, removeBookmark, setLoading} =
  bookmarkSlice.actions;

export default bookmarkSlice.reducer;

export const getBookmarks = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      const bookmarks = await AsyncStorage.getItem('bookmarks');
      if (bookmarks) {
        dispatch(setBookmarks(JSON.parse(bookmarks) as Bookmark[]));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const addToBookmarks = (nft: NFT) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      const bookmarks = await AsyncStorage.getItem('bookmarks');
      const newBookmark: Bookmark = {
        id: nft.tokenId,
        NFT: nft,
      };
      if (bookmarks) {
        const parsedBookmarks = JSON.parse(bookmarks) as Bookmark[];
        if (parsedBookmarks.find(bookmark => bookmark.id === newBookmark.id)) {
          return;
        }
        const newBookmarks = [...parsedBookmarks, newBookmark];
        await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        dispatch(addBookmark(newBookmark));
      } else {
        await AsyncStorage.setItem('bookmarks', JSON.stringify([newBookmark]));
        dispatch(addBookmark(newBookmark));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const removeFromBookmarks = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      console.log('remove from bookmarks');
      dispatch(setLoading(true));
      const bookmarks = await AsyncStorage.getItem('bookmarks');
      if (bookmarks) {
        const parsedBookmarks = JSON.parse(bookmarks) as Bookmark[];
        const newBookmarks = parsedBookmarks.filter(
          bookmark => bookmark.id !== id,
        );
        await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        dispatch(removeBookmark(id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};
