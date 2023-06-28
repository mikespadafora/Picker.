import Slider from '@react-native-community/slider';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

import FadeInAnimation from '../../animations/FadeInAnimation';
import IReactNativeAnimation from '../../animations/IReactNativeAnimation';
import { MainStackParamList } from '../../routes/MainStack';

SplashScreen.preventAutoHideAsync();

export type NavigationProps = NativeStackScreenProps<
  MainStackParamList,
  'SearchRadius',
  'MainStack'
>;

const SearchRadius = ({ route, navigation }: NavigationProps) => {
  //---------------------Variables

  //const { locationDenied } = route.params;

  const [sliderValue, setSliderValue] = useState<number>(1);

  //--------------------- Instantiate Animations

  const fade: IReactNativeAnimation = new FadeInAnimation(300);

  const [fontsLoaded] = useFonts({
    'Nunito-Medium': require('../../../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-ExtraBold': require('../../../assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-ExtraLight': require('../../../assets/fonts/Nunito-ExtraLight.ttf'),
    'Nunito-Light': require('../../../assets/fonts/Nunito-Light.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  //------------------------------------ Lifecyle

  useEffect(() => {
    fade.start();
  }, [fontsLoaded]);

  //------------------------------------ Event Handlers

  const onPress = () => {
    navigation.navigate('Keywords');
  };

  const onSlider = (value: number) => {
    setSliderValue(value);
  };

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <Text style={styles.title}>Search Radius</Text>
        <Text style={styles.subtitle}>How far should we search for you?</Text>
      </View>

      <View style={styles.distanceContainer}>
        <Text style={styles.distanceText}>{sliderValue}</Text>
        <Text style={styles.milesText}>
          {sliderValue > 1 ? 'miles' : 'mile'}
        </Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={25}
          step={1}
          onValueChange={onSlider}
          minimumTrackTintColor="red"
          maximumTrackTintColor="grey"
          thumbTintColor="black"
        />
      </View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          { backgroundColor: pressed ? 'rgb(255, 134, 134)' : 'red' },
          styles.completeButton,
          styles.buttonShadow,
        ]}
      >
        <Text
          style={[
            styles.completeButtonText,
            { fontFamily: 'Nunito-ExtraBold' },
          ]}
        >
          Continue
        </Text>
      </Pressable>
    </View>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 38,
    fontFamily: 'Nunito-Medium',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Nunito-Medium',
    color: '#6c6c6c',
  },
  distanceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 50,
  },
  distanceText: {
    fontSize: 175,
    fontFamily: 'Nunito-ExtraLight',
    color: '#424242',
  },
  milesText: {
    fontSize: 30,
    fontFamily: 'Nunito-Light',
    marginTop: -40,
    color: '#424242',
  },
  sliderContainer: {
    height: 50,
    width: '100%',
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    height: 50,
    width: '75%',
  },
  completeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 0,
    height: 75,
    width: '75%',
    maxWidth: 800,
  },
  completeButtonText: {
    fontSize: 22,
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  buttonShadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default SearchRadius;
