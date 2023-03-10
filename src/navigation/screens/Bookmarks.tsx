import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {getBookmarks} from '../../redux/bookmarkSlice';
import BookmarkCard from '../../components/BookmarkCard';
import {ReduxState, useAppDispatch} from '../../redux/store';
import ListEmptyComponent from '../../components/ListEmptyComponent';

const Bookmarks = () => {
  const dispatch = useAppDispatch();
  const bookmarks = useSelector(
    (state: ReduxState) => state.bookmarkReducer.bookmarks,
  );

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text style={styles.pageTitle}>Bookmarks</Text>}
        data={bookmarks}
        renderItem={({item}) => <BookmarkCard bookmark={item} />}
        keyExtractor={item => item.NFT.tokenId.toString()}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
