import React from 'react';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {GLOBAL} from '../GLOBAL';
import {NFTs, Bookmarks} from './screens';

export interface BottomTabNavProps<
  Paramlist extends ParamListBase,
  RouteName extends keyof Paramlist = string,
> {
  navigation: BottomTabNavigationProp<Paramlist, RouteName>;
  route: RouteProp<Paramlist, RouteName>;
}

export type BottomTabNavRoutes = {
  NFTs: undefined;
  Bookmarks: undefined;
};

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const NFTIcon = ({size, focused}: TabBarIconProps) => (
  <MCIcon
    name={focused ? 'view-gallery' : 'view-gallery-outline'}
    color={GLOBAL.colors.PRIMARY_BLUE}
    size={size}
  />
);

const BookmarksIcon = ({size, focused}: TabBarIconProps) => (
  <MCIcon
    name={focused ? 'bookmark' : 'bookmark-outline'}
    color={GLOBAL.colors.PRIMARY_BLUE}
    size={size}
  />
);

const TabNav = createBottomTabNavigator<BottomTabNavRoutes>();

const BottomTabNavigator = () => {
  return (
    <TabNav.Navigator
      initialRouteName="NFTs"
      screenOptions={{headerShown: false}}>
      <TabNav.Screen
        name="NFTs"
        component={NFTs}
        options={{tabBarIcon: NFTIcon}}
      />
      <TabNav.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{tabBarIcon: BookmarksIcon}}
      />
    </TabNav.Navigator>
  );
};

export default BottomTabNavigator;
