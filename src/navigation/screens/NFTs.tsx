import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {getNFTFeed} from '../../redux/nftSlice';
import {ReduxState, useAppDispatch} from '../../redux/store';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import NftCard from '../../components/NFTCard';

const NftListFooter = ({endReached}: {endReached: boolean}) => {
  return !endReached ? <ActivityIndicator size="large" /> : <Text>End</Text>;
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
    <View style={{flex: 1}}>
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
      />
    </View>
  );
};

export default NFTs;
