import * as React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootState } from '../logic/state/store';
import { useSelector } from 'react-redux';

import AppHeader from '../ui/components/AppHeader';

import Keywords from '../ui/pages/Keywords';
import SearchRadius from '../ui/pages/SearchRadius';
import AppStart from '../ui/pages/AppStart';
import WelcomeMessage from '../ui/pages/WelcomeMessage';

export type MainStackParamList = {
  AppStart: undefined;
  WelcomeMessage: undefined;
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
    <View className="w-full flex-1">
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          name="AppStart"
          component={AppStart}
          options={{ headerShown: false, animation: 'fade' }}
        />
        <Stack.Screen
          name="WelcomeMessage"
          component={WelcomeMessage}
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
      </Stack.Navigator>
    </View>
  );
};

export default MainStack;
