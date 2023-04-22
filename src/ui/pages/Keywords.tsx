import { View, StyleSheet, Animated, Text, ActivityIndicator } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { useFonts } from "expo-font";
import FadeInAnimation from "../../animations/FadeInAnimation";
import * as SplashScreen from "expo-splash-screen";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../routes/MainStack";
import Emitter from "../../logic/emitter";

SplashScreen.preventAutoHideAsync();

type NavigationProps = NativeStackScreenProps<MainStackParamList, "Keywords", "MainStack">;

const Keywords = ({ route, navigation }: NavigationProps) => {
  //---------------------Variables

  //--------------------- Instantiate Animations

  const fade = new FadeInAnimation(300);

  const [fontsLoaded] = useFonts({
    "Nunito-Medium": require("../../../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-ExtraBold": require("../../../assets/fonts/Nunito-ExtraBold.ttf"),
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

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Animated.View style={[{ opacity: fade.opacity }]}>
        <Text>Keywords</Text>
      </Animated.View>
    </View>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Keywords;
