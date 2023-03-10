import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ListEmptyComponent = () => {
  return (
    <View style={styles.end}>
      <Text style={styles.message}>No items available</Text>
    </View>
  );
};

export default ListEmptyComponent;

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
