import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import FadeInAnimation from "../../animations/FadeInAnimation";
import MoveAnimation from "../../animations/MoveAnimation";
import * as SplashScreen from "expo-splash-screen";
import Emitter from "../../logic/emitter";

SplashScreen.preventAutoHideAsync();

const Splash = () => {
  //------------------------------------ Variables

  //--------------------- Require Logo

  const logo = require("../../../assets/img/logo.png");

  //--------------------- Instantiate Animations

  const fade = new FadeInAnimation(2000);
  const move = new MoveAnimation(400, 20, 0);

  fade.registerAnimationComplete(() => {
    Emitter.emit("OnAnimationComplete", null);
  });

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
    move.start();
    fade.start();
  }, [fontsLoaded]);

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Animated.View style={{}}>
        <Animated.Image
          source={logo}
          style={{
            height: 200,
            width: 200,
            resizeMode: "stretch",
            transform: [{ translateY: move.position }],
            opacity: fade.opacity,
          }}
        />
        <Animated.Text
          style={{
            fontSize: 60,
            opacity: fade.opacity,
            marginTop: 15,
            fontFamily: "Nunito-Medium",
            textAlign: "center",
            color: "#383838",
          }}
        >
          Pickr.
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Splash;
