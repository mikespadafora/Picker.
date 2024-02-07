import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useCallback } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import FadeInAnimation from '../../animations/FadeInAnimation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes/MainStack';
import FadeOutAnimation from '../../animations/FadeOutAnimation';

SplashScreen.preventAutoHideAsync();

export type NavigationProps = NativeStackScreenProps<
  MainStackParamList,
  'WelcomeMessage',
  'MainStack'
>;

const WelcomeMessage = ({ navigation }: NavigationProps) => {
  //--------------------- Instantiate Animations

  const [fadeInComplete, setFadeInComplete] = useState<boolean>(false);

  const fadeIn = new FadeInAnimation(1500);
  const fadeOut = new FadeOutAnimation(1000);

  const [fontsLoaded] = useFonts({
    'Nunito-Medium': require('../../../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-ExtraBold': require('../../../assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-Light': require('../../../assets/fonts/Nunito-Light.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      fadeIn.start();
    }
  }, [fontsLoaded]);

  fadeIn.registerAnimationComplete(() => {
    setTimeout(() => {
      setFadeInComplete(true);
      fadeOut.start();
    }, 2000);
  });

  fadeOut.registerAnimationComplete(() => {
    navigation.navigate('SearchRadius');
  });

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeInComplete ? fadeOut.opacity : fadeIn.opacity,
          },
        ]}
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

export default WelcomeMessage;
