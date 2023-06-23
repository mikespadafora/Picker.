import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Image, View, TouchableOpacity, Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchRadius from '../ui/pages/SearchRadius';
import Keywords from '../ui/pages/Keywords';
import PostSplash from '../ui/pages/PostSplash';
/* import RestaurantSelection from "../ui/pages/RestaurantSelection";
import Results from "../ui/pages/Results"; */

export type MainStackParamList = {
  SearchRadius: { locationDenied: boolean };
  Keywords: undefined;
};

export type MainStackNavigation = StackNavigationProp<MainStackParamList>;

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = ({ locationDenied }: { locationDenied: boolean }) => {
  const navigation = useNavigation();
  const [showBackButton, setShowBackButton] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const imagePath = require('../../assets/img/logo.png');

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      let state = navigation.canGoBack();
      setTimeout(() => setShowBackButton(state), 100);
    });

    return unsubscribe;
  }, [navigation]);

  const globalScreenOptions = {
    /* headerTitle: () => <Image source={imagePath} style={{ width: 40, height: 40 }} />, */
    headerMode: 'float',
    header: () => (
      <Animated.View
        style={{
          height: 70,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          borderBottomWidth: 0.2,
          borderBottomColor: 'gray',
          opacity: fadeAnim,
        }}
      >
        {showBackButton ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ height: 40, width: 40 }}
          >
            <Icon
              name="angle-left"
              color="rgb(0,0,60)"
              size={40}
              style={[{ paddingBottom: 2 }]}
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
        <Image source={imagePath} style={{ height: 40, width: 40 }} />
        <View style={{ width: 40 }}></View>
      </Animated.View>
    ),
  };
  return (
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
  );
};

export default MainStack;
