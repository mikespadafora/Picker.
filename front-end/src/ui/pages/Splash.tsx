import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  ActivityIndicator,
} from 'react-native';

import FadeInAnimation from '../../animations/FadeInAnimation';
import Emitter from '../../logic/util/emitter';
import AnimatedLogo from '../components/subcomponents/AnimatedLogo';

SplashScreen.preventAutoHideAsync();

const Splash = () => {
  //---------------------Variables

  const [receivingLocation, setReceivingLocation] = useState<boolean>(false);

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

  Emitter.on('OnReceivingLocationChange', (status: boolean) => {
    setReceivingLocation(status);
    console.log('Event: OnReceivingLocationChange: ' + status.toString());
  });

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Animated.View style={[styles.logoContainer, { opacity: fade.opacity }]}>
        <AnimatedLogo />
        <Animated.Text
          style={{
            marginLeft: 5,
            marginTop: 10,
            fontSize: 60,
            fontFamily: 'Nunito-Medium',
            textAlign: 'center',
            color: '#383838',
          }}
        >
          Picker.
        </Animated.Text>
      </Animated.View>

      <View style={styles.loadingContainer}>
        {receivingLocation && (
          <>
            <Text
              style={[
                styles.gettingLocationText,
                { fontFamily: 'Nunito-ExtraBold' },
              ]}
            >
              {' '}
              Getting location...
            </Text>
            <ActivityIndicator size="small" color="#ff0000" />
          </>
        )}
      </View>
    </View>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    height: 50,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gettingLocationText: {
    marginBottom: 10,
    opacity: 0.7,
  },
});

export default Splash;
