import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ListEndComponent = () => {
  return (
    <View style={styles.end}>
      <Text style={styles.message}>No more items</Text>
    </View>
  );
};

export default ListEndComponent;

const styles = StyleSheet.create({
  end: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
  },
});
