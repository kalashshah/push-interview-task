import React, {memo} from 'react';
import {Pressable, Text, View} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch} from '../redux/store';
import {addToBookmarks, removeBookmark} from '../redux/bookmarkSlice';
import {NFT} from '../types/NFT';

const NftCard = ({nft}: {nft: NFT}) => {
  const dispatch = useAppDispatch();
  const [isBookmarked, setIsBookmarked] = React.useState(nft.isBookmarked);

  const toggleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(nft.tokenId));
      setIsBookmarked(false);
    } else {
      dispatch(addToBookmarks(nft));
      setIsBookmarked(true);
    }
  };

  return (
    <View
      style={{
        height: 120,
        width: '100%',
      }}>
      <Text>{nft.name}</Text>
      <Pressable onPress={toggleBookmark}>
        <MCIcon
          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color="blue"
        />
      </Pressable>
    </View>
  );
};

export default memo(NftCard);
