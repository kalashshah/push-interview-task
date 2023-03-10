import {FlatList, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ReduxState, useAppDispatch} from '../../redux/store';
import {useSelector} from 'react-redux';
import {getBookmarks} from '../../redux/bookmarkSlice';

const Bookmarks = () => {
  const dispatch = useAppDispatch();
  const bookmarks = useSelector(
    (state: ReduxState) => state.bookmarkReducer.bookmarks,
  );

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <Text>Bookmarks</Text>
      <FlatList
        data={bookmarks}
        renderItem={({item}) => (
          <View style={{height: 40, width: '100%'}}>
            <Text>{item.NFT.name}</Text>
          </View>
        )}
        keyExtractor={item => item.NFT.tokenId.toString()}
        ListEmptyComponent={<Text>Empty</Text>}
      />
    </View>
  );
};

export default Bookmarks;
