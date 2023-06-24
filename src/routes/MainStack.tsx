import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { View, Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchRadius from '../ui/pages/SearchRadius';
import Keywords from '../ui/pages/Keywords';
import AppHeader from '../ui/components/AppHeader';
/* import RestaurantSelection from "../ui/pages/RestaurantSelection";
import Results from "../ui/pages/Results"; */

export type MainStackParamList = {
  SearchRadius: { locationDenied: boolean };
  Keywords: undefined;
};

interface IMainStackProps {
  locationDenied: boolean;
  onData: Function;
}

export type MainStackNavigation = StackNavigationProp<MainStackParamList>;

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = ({ locationDenied, onData }: IMainStackProps) => {
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

  const imagePath = require('../../assets/img/logo.png');

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      let state = navigation.canGoBack();
      setTimeout(() => setShowBackButton(state), 100);
    });

    return unsubscribe;
  }, [navigation]);

  const globalScreenOptions = {
    /* headerMode: 'float',
    header: () => (
      <AppHeader opacity={fadeAnim} showBackButton={showBackButton} />
    ), */
    headerShown: false,
  };
  return (
    <View style={{ width: '100%', flex: 1 }}>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          name="SearchRadius"
          initialParams={{ locationDenied: locationDenied }}
        >
          {(props) => (
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
              <SearchRadius {...props} />
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
