import React, {useState} from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {GLOBAL} from '../GLOBAL';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

interface BookmarkIconProps {
  isOn: boolean;
  toggle: () => void;
}

function BookmarkIcon({isOn, toggle}: BookmarkIconProps) {
  const [animation, _] = useState(new Animated.Value(0));
  const spin = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '30deg', '0deg'],
  });
  const size = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  const animateIcon = () => {
    Animated.parallel([
      Animated.spring(animation, {
        toValue: isOn ? 0 : 1,
        bounciness: 0,
        useNativeDriver: true,
      }),
      Animated.spring(animation, {
        toValue: isOn ? 0 : 1,
        bounciness: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPress = () => {
    toggle();
    animateIcon();
  };

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <AnimatedIcon
        name={isOn ? 'bookmark' : 'bookmark-outline'}
        size={40}
        color={GLOBAL.colors.PRIMARY_BLUE}
        style={{transform: [{rotate: spin}, {scale: size}]}}
      />
    </Pressable>
  );
}

export default BookmarkIcon;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
