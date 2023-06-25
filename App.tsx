// -------------------------------------------- Import Dependencies
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { NativeWindStyleSheet } from 'nativewind';
import { useEffect, useState } from 'react';
import { View, Animated, StatusBar, SafeAreaView } from 'react-native';

// -------------------------------------------- Import Modules & Components
import FadeOutAnimation from './src/animations/FadeOutAnimation';
import Emitter from './src/logic/emitter';
import MainStack from './src/routes/MainStack';
import AppHeader, { IAppHeaderProps } from './src/ui/components/AppHeader';
import PostSplash from './src/ui/pages/PostSplash';
import Splash from './src/ui/pages/Splash';

// -------------------------------------------- Tailwind Setup
NativeWindStyleSheet.setOutput({
  default: 'native',
});

const App = () => {
  // -------------------------------------------- Variables

  const views = {
    Splash: 'Splash',
    PostSplash: 'PostSplash',
    MainStack: 'MainStack',
  };

  const [, setLocation] = useState<LocationObject | null>(null);
  const [, setLocationDenied] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>(views.Splash);

  const [headerData, setHeaderData] = useState<IAppHeaderProps>();

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

  const onMainStackData = (data: IAppHeaderProps) => {
    if (data) setHeaderData(data);
  };

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
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'denied') {
      setLocationDenied(true);
    } else {
      const location = await Location.getCurrentPositionAsync({});
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
    <NavigationContainer
      documentTitle={{
        formatter: (options, route) => `${options?.title ?? route?.name}`,
      }}
    >
      {currentView !== views.MainStack && (
        <View className="w-full h- full flex flex-column items-center justify-between">
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
        <SafeAreaView className="w-full h-full flex absolute top-0 left-0 flex-col justify-start items-center">
          <AppHeader
            opacity={headerData ? headerData.opacity : new Animated.Value(0)}
            showBackButton={headerData ? headerData.showBackButton : false}
          />
          <MainStack locationDenied onData={onMainStackData} />
        </SafeAreaView>
      )}
    </NavigationContainer>
  );
};

export default App;
