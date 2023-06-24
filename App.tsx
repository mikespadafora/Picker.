// -------------------------------------------- Import Dependencies

import { StyleSheet, View, Animated, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';

// -------------------------------------------- Import Animations

import FadeOutAnimation from './src/animations/FadeOutAnimation';

// -------------------------------------------- Import Emitter

import Emitter from './src/logic/emitter';

// -------------------------------------------- Import Components

import PostSplash from './src/ui/pages/PostSplash';
import Splash from './src/ui/pages/Splash';
import MainStack from './src/routes/MainStack';

const App = () => {
  // -------------------------------------------- Variables

  const views = {
    Splash: 'Splash',
    PostSplash: 'PostSplash',
    MainStack: 'MainStack',
  };

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationDenied, setLocationDenied] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>(views.Splash);

  const fade = new FadeOutAnimation(1000);
  const postFade = new FadeOutAnimation(1000);

  // -------------------------------------------- Setup

  fade.registerAnimationComplete(() => setCurrentView(views.PostSplash));
  postFade.registerAnimationComplete(() =>
    setTimeout(() => setCurrentView(views.MainStack), 1000)
  );

  // -------------------------------------------- Lifecycle

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, [currentView]);

  // -------------------------------------------- Methods

  const startSplashFadeOut = (delay: number) => {
    if (fade instanceof FadeOutAnimation) setTimeout(() => fade.start(), delay);
  };

  const processLocationResponse = (): void => {
    startSplashFadeOut(1000);
    Emitter.emit('OnReceivingLocationChange', false);
  };

  const getLocation = async () => {
    console.log('Getting location...');
    Emitter.emit('OnReceivingLocationChange', true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'denied') {
      setLocationDenied(true);
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLocationDenied(false);
    }

    processLocationResponse();
  };

  // -------------------------------------------- Events

  Emitter.on('OnAnimationComplete', () => {
    console.log('Complete!');
    setTimeout(() => getLocation(), 1000);
  });

  Emitter.on('OnPostSplashComplete', () => {
    postFade.start();
  });

  // -------------------------------------------- Render

  return (
    <NavigationContainer>
      {currentView !== views.MainStack && (
        <View style={styles.container}>
          {currentView === views.Splash && (
            <Animated.View style={{ opacity: fade.opacity }}>
              <Splash />
            </Animated.View>
          )}
          {currentView === views.PostSplash && (
            <Animated.View style={{ opacity: postFade.opacity }}>
              <PostSplash />
            </Animated.View>
          )}
        </View>
      )}
      {currentView === views.MainStack && (
        <>
          <View style={{ height: 50 }} />
          <MainStack locationDenied />
        </>
      )}
    </NavigationContainer>
  );
};

// -------------------------------------------- Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
