import Slider from '@react-native-community/slider';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import FadeInAnimation from '../../animations/FadeInAnimation';
import IReactNativeAnimation from '../../animations/IReactNativeAnimation';
import { setRadius } from '../../logic/state/slices/radiusSlice';
import { MainStackParamList } from '../../routes/MainStack';

SplashScreen.preventAutoHideAsync();

export type NavigationProps = NativeStackScreenProps<
  MainStackParamList,
  'SearchRadius',
  'MainStack'
>;

const SearchRadius = ({ navigation }: NavigationProps) => {
  //---------------------Variables

  const dispatch = useDispatch();
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

  const onRadiusConfirm = () => {
    dispatch(setRadius(sliderValue));
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
    <View
      className="w-full h-full pt-5 flex flex-col justify-between items-center bg-white"
      onLayout={onLayoutRootView}
    >
      <View className="flex items-center">
        <Text className="text-4xl" style={{ fontFamily: 'Nunito-Medium' }}>
          Search Radius
        </Text>
        <Text
          className="text-m text-base text-grey"
          style={{ fontFamily: 'Nunito-Medium' }}
        >
          How far should we search for you?
        </Text>
      </View>

      <View className="flex flex-col items-center mb-12 ">
        <Text
          className="text-9xl pt-12 text-darkGrey"
          style={{ fontFamily: 'Nunito-ExtraLight' }}
        >
          {sliderValue}
        </Text>
        <Text
          className="text-3xl text-darkGrey"
          style={{ fontFamily: 'Nunito-Light' }}
        >
          {sliderValue > 1 ? 'miles' : 'mile'}
        </Text>
      </View>
      <View className="w-full max-w-3xl h-12 flex flex-col justify-center items-center">
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
        onPress={onRadiusConfirm}
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
