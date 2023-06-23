import { StyleSheet, View, Animated, Text } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import FadeOutAnimation from './src/animations/FadeOutAnimation';
import FadeInAnimation from './src/animations/FadeInAnimation';
import Emitter from './src/logic/emitter';
import { NavigationContainer } from '@react-navigation/native';
import PostSplash from './src/ui/pages/PostSplash';
import { BetweenPagesProvider } from 'between-pages';

import Splash from './src/ui/pages/Splash';
import MainStack from './src/routes/MainStack';

const App = () => {
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

  fade.registerAnimationComplete(() => setCurrentView(views.PostSplash));
  postFade.registerAnimationComplete(() =>
    setTimeout(() => setCurrentView(views.MainStack), 1000)
  );

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

  Emitter.on('OnAnimationComplete', () => {
    console.log('Complete!');
    setTimeout(() => getLocation(), 1000);
  });

  Emitter.on('OnPostSplashComplete', () => {
    postFade.start();
  });

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
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: '100%',
            }}
          >
            <Text>Test</Text>
          </View>

          <MainStack locationDenied />
        </>
      )}
      {/* <View style={styles.container}>
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
        {currentView === views.MainStack && (
          <MainStack locationDenied={locationDenied} />
        )}
      </View> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* backgroundColor: "#fff", */
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
