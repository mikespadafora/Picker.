import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  ActivityIndicator,
} from 'react-native';

import FadeInAnimation from '../../animations/FadeInAnimation';
import AnimatedLogo from '../components/subcomponents/AnimatedLogo';
import { MainStackParamList } from '../../routes/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useInitializeLocation } from '../../logic/hooks/useInitializeLocation';

SplashScreen.preventAutoHideAsync();

export type NavigationProps = NativeStackScreenProps<
  MainStackParamList,
  'AppStart',
  'MainStack'
>;

const AppStart = ({ navigation }: NavigationProps) => {
  //--------------------- Instantiate Animations

  const fade = new FadeInAnimation(300);

  const initializeLocation = useInitializeLocation();
  const [receivingLocation, setReceivingLocation] = useState<boolean>();

  const [fontsLoaded] = useFonts({
    'Nunito-Medium': require('../../../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-ExtraBold': require('../../../assets/fonts/Nunito-ExtraBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();

      fade.registerAnimationComplete(() => {
        setReceivingLocation(true);

        initializeLocation()
          .then((locationDenied) => {
            console.log('Location initialization completed');

            if (!locationDenied) {
              setTimeout(() => {
                setReceivingLocation(false);
                navigation.navigate('WelcomeMessage');
              }, 2000);
            } else {
              //TODO: navigate to zip code entry page.
              setTimeout(() => {
                navigation.navigate('WelcomeMessage');

                setReceivingLocation(false);
              }, 2000);
            }
          })
          .catch((error: Error) => {
            console.error(error);
            navigation.navigate('WelcomeMessage');
          });
      });

      fade.start();
    }
  }, [fontsLoaded]);

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={styles.container}
      className="bg-white"
      onLayout={onLayoutRootView}
    >
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

export default AppStart;
