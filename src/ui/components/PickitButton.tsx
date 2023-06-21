import { View, StyleSheet, Text, Pressable } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

interface IPickitButtonProps {
    label: string;
    callback: Function;
    index: number;
}

const PickitButton = () => {

  //--------------------- Fonts

  const [fontsLoaded] = useFonts({
    "Nunito-Medium": require("../../../../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-ExtraBold": require("../../../../assets/fonts/Nunito-ExtraBold.ttf"),
  });

}