import { StyleSheet, View, Animated } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import FadeOutAnimation from "./src/animations/FadeOutAnimation";
import Emitter from "./src/logic/emitter";

import Splash from "./src/ui/components/Splash";

const App = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locationDenied, setLocationDenied] = useState<Boolean>(false);

  const fade = new FadeOutAnimation(1000);

  Emitter.on("OnAnimationComplete", () => {
    console.log("Complete!");
    if (locationDenied) {
    } else {
      if (fade instanceof FadeOutAnimation) 
        setTimeout(() => fade.start(), 1000);
    }
  });

  useEffect(() => {
    if (location === null) {
      getLocation();
    }
  }, []);

  const processLocationResponse = (): void => {
    if (locationDenied) {
      // Prompt use to enable location services
      console.log("fail");
    } else {
    }
  };

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
      setLocationDenied(true);
    } else if (location) {
      console.log(JSON.stringify(location));
      setLocationDenied(false);
    }

    processLocationResponse();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fade.opacity,
        }}
      >
        <Splash />
      </Animated.View>
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
