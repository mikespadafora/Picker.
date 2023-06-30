import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { LocationObject } from 'expo-location';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { View, Animated } from 'react-native';

import Keywords from '../ui/pages/Keywords';
import SearchRadius from '../ui/pages/SearchRadius';
/* import RestaurantSelection from "../ui/pages/RestaurantSelection";
import Results from "../ui/pages/Results"; */

export type MainStackParamList = {
  SearchRadius: { location: LocationObject | null };
  Keywords: undefined;
};

interface IMainStackProps {
  location: LocationObject | null;
  onData: Function;
}

export type MainStackNavigation = StackNavigationProp<MainStackParamList>;

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = ({ location, onData }: IMainStackProps) => {
  const navigation = useNavigation();

  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();

    onData({ fadeAnim, showBackButton });
  }, [fadeAnim]);

  useEffect(() => {
    onData({ fadeAnim, showBackButton });
  }, [showBackButton]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const state = navigation.canGoBack();
      setShowBackButton(state);
    });

    return unsubscribe;
  }, [navigation]);

  const globalScreenOptions = {
    headerShown: false,
  };

  return (
    <View className="w-full flex-1">
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="SearchRadius" initialParams={{ location }}>
          {(props) => (
            <Animated.View
              className="bg-white"
              style={{ flex: 1, opacity: fadeAnim }}
            >
              <SearchRadius location={location} {...props} />
            </Animated.View>
          )}
        </Stack.Screen>
        <Stack.Screen name="Keywords" component={Keywords} />
        {/* <Stack.Screen name="RestaurantSelection" component={RestaurantSelection} />
        <Stack.Screen name="Results" component={Results} /> */}
      </Stack.Navigator>
    </View>
  );
};

export default MainStack;
