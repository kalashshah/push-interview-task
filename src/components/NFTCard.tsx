import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {NFT} from '../types/NFT';
import BookmarkIcon from './BookmarkIcon';
import {useAppDispatch} from '../redux/store';
import {addToBookmarks, removeFromBookmarks} from '../redux/bookmarkSlice';

const NftCard = ({nft}: {nft: NFT}) => {
  const dispatch = useAppDispatch();
  const [isBookmarked, setIsBookmarked] = React.useState(nft.isBookmarked);

  const toggleBookmark = () => {
    setIsBookmarked(prev => {
      if (prev) {
        dispatch(removeFromBookmarks(nft.tokenId));
      } else {
        dispatch(addToBookmarks(nft));
      }
      return !prev;
    });
  };

  const copyContent = (content: string) => () => {
    Clipboard.setString(content);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: nft.imageUrl}} style={styles.image} />
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{nft.name}</Text>
        <View style={styles.addressContainer}>
          <TouchableOpacity onPress={copyContent(nft.owner)}>
            <MCIcon name="content-copy" size={20} color="grey" />
          </TouchableOpacity>
          <Text style={styles.ownerAddress}>{nft.owner}</Text>
        </View>
        <Text style={styles.tokenId}>Token Id: {nft.tokenId}</Text>
      </View>
      <View style={styles.rightContainer}>
        <BookmarkIcon isOn={isBookmarked} toggle={toggleBookmark} />
      </View>
    </View>
  );
};

export default NftCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ownerAddress: {
    fontSize: 12,
    color: 'grey',
    marginLeft: 8,
    marginRight: 24,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  rightContainer: {
    justifyContent: 'center',
  },
  leftContainer: {
    flex: 3,
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  tokenId: {
    fontSize: 12,
    color: 'grey',
  },
});
