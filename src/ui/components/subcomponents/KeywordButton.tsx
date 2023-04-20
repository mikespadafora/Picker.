import { View, StyleSheet, Text, Pressable } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

interface IKeywordButtonProps {
	keyword: String,
	key: Number
}

const KeywordButton = ({keyword, key}: IKeywordButtonProps) => {

  //---------------------Variables


  //--------------------- Fonts

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

  }, []);

  //------------------------------------ Event Handlers

	const onDelete = () => {

	};

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Pressable onPress={onDelete}>

			</Pressable>
    </View>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "fit-content",
    flex: 1,
		flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
});

export default KeywordButton;
