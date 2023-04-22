import { StyleSheet, View, Animated } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import FadeOutAnimation from "./src/animations/FadeOutAnimation";
import Emitter from "./src/logic/emitter";
import { NavigationContainer } from "@react-navigation/native";

import Splash from "./src/ui/pages/Splash";
import MainStack from "./src/routes/MainStack";

const App = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locationDenied, setLocationDenied] = useState<boolean>(false);
  const [ready, setReady] = useState<Boolean>(false);

  const fade = new FadeOutAnimation(1000);

  useEffect(() => {
    fade.registerAnimationComplete(() => {
      setReady(true);
    });
  }, []);

  // Delay in milliseconds. Method starts the fade out animation for the splash screen.
  const startSplashFadeOut = (delay: number) => {
    if (fade instanceof FadeOutAnimation) setTimeout(() => fade.start(), delay);
  };

  const processLocationResponse = (): void => {
    if (!locationDenied) {
      console.log("pass");
      startSplashFadeOut(1000);
    } else {
      // Prompt use to enable location services
      startSplashFadeOut(1000);
      console.log("Failed to receive location.");
    }

    Emitter.emit("OnReceivingLocationChange", false);
  };

  const getLocation = async () => {
    Emitter.emit("OnReceivingLocationChange", true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);

    if (status === "denied") {
      console.log(errorMsg);
      setLocationDenied(true);
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(JSON.stringify(location));
      setLocationDenied(false);
    }

    processLocationResponse();
  };

  Emitter.on("OnAnimationComplete", () => {
    console.log("Complete!");
    setTimeout(() => getLocation(), 1000);
  });

  return (
    <NavigationContainer>
      {!ready && (
        <View style={styles.container}>
          <Animated.View
            style={{
              opacity: fade.opacity,
            }}
          >
            <Splash />
          </Animated.View>
        </View>
      )}
      {ready && <MainStack locationDenied={locationDenied} />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
