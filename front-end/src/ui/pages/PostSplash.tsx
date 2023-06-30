import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import FadeInAnimation from '../../animations/FadeInAnimation';
import Emitter from '../../logic/util/emitter';

SplashScreen.preventAutoHideAsync();

const PostSplash = () => {
  //--------------------- Instantiate Animations

  const fadeIn = new FadeInAnimation(1500);

  const [fontsLoaded] = useFonts({
    'Nunito-Medium': require('../../../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-ExtraBold': require('../../../assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-Light': require('../../../assets/fonts/Nunito-Light.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  fadeIn.registerAnimationComplete(() => {
    setTimeout(() => {
      Emitter.emit('OnPostSplashComplete', null);
    }, 3000);
  });

  //------------------------------------ Lifecyle

  useEffect(() => {
    fadeIn.start();
  }, [fontsLoaded]);

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Animated.View
        style={[styles.logoContainer, { opacity: fadeIn.opacity }]}
      >
        <Animated.Text
          style={{
            marginLeft: 5,
            marginTop: 10,
            fontSize: 30,
            fontFamily: 'Nunito-Light',
            textAlign: 'center',
            color: '#383838',
          }}
        >
          Let's find you some food
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
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

export default PostSplash;
