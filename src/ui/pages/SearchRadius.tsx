import { View, StyleSheet, Text, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { useEffect, useCallback, useState } from 'react';
import { useFonts } from 'expo-font';
import FadeInAnimation from '../../animations/FadeInAnimation';
import * as SplashScreen from 'expo-splash-screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes/MainStack';
import Emitter from '../../logic/emitter';

SplashScreen.preventAutoHideAsync();

type NavigationProps = NativeStackScreenProps<
  MainStackParamList,
  'SearchRadius',
  'MainStack'
>;

const SearchRadius = ({ route, navigation }: NavigationProps) => {
  //---------------------Variables

  const { locationDenied } = route.params;

  const [sliderValue, setSliderValue] = useState<number>(0);

  //--------------------- Instantiate Animations

  const fade = new FadeInAnimation(300);

  const [fontsLoaded] = useFonts({
    'Nunito-Medium': require('../../../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-ExtraBold': require('../../../assets/fonts/Nunito-ExtraBold.ttf'),
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
      <Text>Search Radius</Text>

      <Text>{sliderValue}</Text>
      <View
        style={{
          height: 50,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={50}
          step={1}
          onValueChange={onSlider}
          minimumTrackTintColor="red"
          maximumTrackTintColor="grey"
          thumbTintColor="black"
        />
      </View>
      <Button onPress={onPress} title="Next Page" />
    </View>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slider: {
    height: 50,
    width: '75%',
  },
});

export default SearchRadius;
