import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Bookmark} from '../types/Bookmark';

const BookmarkCard = ({bookmark}: {bookmark: Bookmark}) => {
  return (
    <View style={styles.bookmarkContainer}>
      <Image source={{uri: bookmark.NFT.imageUrl}} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text style={styles.name}>{bookmark.NFT.name}</Text>
        <Text style={styles.ownerAddress}>{bookmark.NFT.owner}</Text>
      </View>
    </View>
  );
};

export default BookmarkCard;

const styles = StyleSheet.create({
  bookmarkContainer: {
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    margin: 10,
  },
  rightContainer: {
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ownerAddress: {
    fontSize: 14,
    color: 'grey',
  },
});
