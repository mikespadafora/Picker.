import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import AnimatedLogo from "./subcomponents/AnimatedLogo"
import FadeInAnimation from "../../animations/FadeInAnimation";
import MoveAnimation from "../../animations/MoveAnimation";
import * as SplashScreen from "expo-splash-screen";
import Emitter from "../../logic/emitter";

SplashScreen.preventAutoHideAsync();

const Splash = () => {

  //--------------------- Instantiate Animations

  const fade = new FadeInAnimation(300);

  const [fontsLoaded] = useFonts({
    "Nunito-Medium": require("../../../assets/fonts/Nunito-Medium.ttf"),
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

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Animated.View style={[styles.logoContainer, {opacity: fade.opacity}]}>
        <AnimatedLogo />
        <Animated.Text
          style={{
            fontSize: 60,
            marginTop: 15,
            fontFamily: "Nunito-Medium",
            textAlign: "center",
            color: "#383838",
          }}
        >
          Picker.
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
});

export default Splash;
