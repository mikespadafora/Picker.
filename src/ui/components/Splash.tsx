import { View, StyleSheet, Animated, Platform } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useFonts } from "expo-font";
import FadeInAnimation from "../../animations/FadeInAnimation";
import MoveAnimation from "../../animations/MoveAnimation";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { LocationObject } from "expo-location";

SplashScreen.preventAutoHideAsync();

const Splash = () => {
  //------------------------------------ Variables

  //--------------------- Require Logo

  const logo = require("../../../assets/img/logo.png");

  //--------------------- Instantiate Animations

  const fade = new FadeInAnimation(1000);
  const move = new MoveAnimation(400, 20, 0);

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

    console.log(Platform.OS);

    if (location === null) getLocation();
  }, [fontsLoaded]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    if (errorMsg) {
      console.log(errorMsg);
    } else if (location) {
      console.log(JSON.stringify(location));
    }
  };

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
            fontSize: 70,
            opacity: fade.opacity,
            marginTop: 15,
            fontFamily: "Nunito-Medium",
            textAlign: "center",
            color: "#383838",
          }}
        >
          pickit.
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
