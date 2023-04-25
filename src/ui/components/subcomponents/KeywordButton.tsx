import { View, StyleSheet, Text, Pressable } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

interface IKeywordButtonProps {
  label: String;
  onPress: Function;
  index: number;
}

const KeywordButton = ({ label, onPress, index }: IKeywordButtonProps) => {
  //---------------------Variables

  //--------------------- Fonts

  const [fontsLoaded] = useFonts({
    "Nunito-Medium": require("../../../../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-ExtraBold": require("../../../../assets/fonts/Nunito-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  //------------------------------------ Lifecyle

  useEffect(() => {}, [label]);

  //------------------------------------ Event Handlers

  const onDelete = () => {
    if (onPress) {
      console.log(index);
      onPress(index);
    }
  };

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Pressable onPress={onDelete} style={styles.pressable}>
        <Text style={[styles.label, { fontFamily: "Nunito-ExtraBold" }]}>{label}</Text>
        <Icon name="close" color="white" size={20} style={[{ paddingBottom: 2 }]} />
      </Pressable>
    </View>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    height: 40,
    display: "flex",
    flexGrow: 0,
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "red",
    paddingLeft: 15,
    paddingRight: 10,
  },
  pressable: {
    display: "flex",
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "white",
    paddingRight: 15,
  },
});

export default KeywordButton;
