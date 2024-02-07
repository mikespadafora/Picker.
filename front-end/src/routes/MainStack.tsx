import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';

import { useSelector } from 'react-redux';

import AppHeader from '../ui/components/AppHeader';

import Keywords from '../ui/pages/Keywords';
import SearchRadius from '../ui/pages/SearchRadius';
import Splash from '../ui/pages/Splash';
import PostSplash from '../ui/pages/PostSplash';
import { RootState } from '../logic/state/store';

/* import RestaurantSelection from "../ui/pages/RestaurantSelection";
import Results from "../ui/pages/Results"; */

export type MainStackParamList = {
  Splash: undefined;
  PostSplash: undefined;
  SearchRadius: undefined;
  Keywords: undefined;
};

export type MainStackNavigation = StackNavigationProp<MainStackParamList>;

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  const globalScreenOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  const locationDenied = useSelector(
    (state: RootState) => state.location.locationDenied
  );

  return (
    // @ts-ignore
    <View className="w-full flex-1">
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false, animation: 'fade' }}
        />
        <Stack.Screen
          name="PostSplash"
          component={PostSplash}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="SearchRadius"
          component={SearchRadius}
          options={{
            headerShown: true,
            animation: 'fade',
            header: () => (
              <AppHeader
                showBackButton={locationDenied}
                backScreen={locationDenied ? 'PostSplash' : undefined}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Keywords"
          component={Keywords}
          options={{
            headerShown: true,
            animation: 'ios',
            header: () => (
              <AppHeader showBackButton={true} backScreen="SearchRadius" />
            ),
          }}
        />
        {/* <Stack.Screen name="RestaurantSelection" component={RestaurantSelection} />
        <Stack.Screen name="Results" component={Results} /> */}
      </Stack.Navigator>
    </View>
  );
};

export default MainStack;
