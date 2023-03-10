import React from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import NftCard from '../../components/NFTCard';
import {getNFTFeed} from '../../redux/nftSlice';
import {ReduxState, useAppDispatch} from '../../redux/store';
import ListEndComponent from '../../components/ListEndComponent';

const NftListFooter = ({endReached}: {endReached: boolean}) => {
  return !endReached ? (
    <ActivityIndicator size="large" />
  ) : (
    <ListEndComponent />
  );
};

const NFTs = () => {
  const dispatch = useAppDispatch();
  const endReached = useSelector(
    (state: ReduxState) => state.nftReducer.endReached,
  );
  const nftFeed = useSelector((state: ReduxState) => state.nftReducer.nfts);
  const refreshing = useSelector(
    (state: ReduxState) => state.nftReducer.refreshing,
  );

  const refresh = () => {
    dispatch(getNFTFeed({tokenId: 0, refresh: true}));
  };
  const fetchMore = () => {
    if (endReached) {
      return;
    }
    dispatch(getNFTFeed({tokenId: nftFeed.length}));
  };

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={refreshing}
        onRefresh={refresh}
        data={nftFeed}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMore}
        keyExtractor={item => item.name}
        renderItem={({item}) => <NftCard nft={item} />}
        ListFooterComponent={<NftListFooter endReached={endReached} />}
        ListEmptyComponent={<Text>Empty</Text>}
        ListHeaderComponent={<Text style={styles.pageTitle}>NFTs</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NFTs;

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
