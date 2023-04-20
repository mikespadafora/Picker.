import { StyleSheet, View, Animated } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import FadeOutAnimation from "./src/animations/FadeOutAnimation";
import Emitter from "./src/logic/emitter";

import Splash from "./src/ui/pages/Splash";
import KeywordButton from "./src/ui/components/subcomponents/KeywordButton";

const App = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locationDenied, setLocationDenied] = useState<Boolean>(false);
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
      console.log("Failed to receive location.");
    }

    Emitter.emit("OnReceivingLocationChange", false);
  };

  const getLocation = async () => {
    Emitter.emit("OnReceivingLocationChange", true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    if (errorMsg) {
      console.log(errorMsg);
      setLocationDenied(true);
    } else if (location) {
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
    <View style={styles.container}>
      {!ready && (
        <Animated.View
          style={{
            opacity: fade.opacity,
          }}
        >
          <Splash />
        </Animated.View>
      )}
      {ready && (
        <View style={[{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10, padding: 20 }]}>
          <KeywordButton key={1} label={"Italian"} />
          <KeywordButton key={2} label={"Chinese"} />
          <KeywordButton key={3} label={"American"} />
          <KeywordButton key={4} label={"Comfort Food"} />
          <KeywordButton key={5} label={"Sushi"} />
          <KeywordButton key={6} label={"Tacos"} />
        </View>
      )}
    </View>
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
