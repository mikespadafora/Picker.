import { View, StyleSheet, Animated, Text, TextInput, Pressable, ScrollView, Platform } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { useFonts } from "expo-font";
import FadeInAnimation from "../../animations/FadeInAnimation";
import * as SplashScreen from "expo-splash-screen";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../routes/MainStack";
import Emitter from "../../logic/emitter";
import KeywordButton from "../components/subcomponents/KeywordButton";

SplashScreen.preventAutoHideAsync();

type NavigationProps = NativeStackScreenProps<MainStackParamList, "Keywords", "MainStack">;

const Keywords = ({ route, navigation }: NavigationProps) => {
  //---------------------Variables

  const [text, setText] = useState<string>("");
  const [keywords, setKeywords] = useState<Array<string>>([]);

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

  useEffect(() => {}, [fontsLoaded, keywords]);

  //------------------------------------ Event Handlers

  const onKeywordEnter = () => {
    if (text) {
      setKeywords([...keywords, text]);
      setText("");
    }
  };

  const onRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((item) => item !== keyword));
  };

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ScrollView showsVerticalScrollIndicator={true} style={styles.keywordsDimensions} contentContainerStyle={styles.keywordsContainer}>
        {keywords.map((keyword, index) => (
          <KeywordButton label={keyword} key={index} onPress={(keyword: string) => onRemoveKeyword(keyword)} />
        ))}
      </ScrollView>
      <View style={styles.actionContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={onKeywordEnter}
          placeholder="Enter Keyword Here!"
          placeholderTextColor="gray"
          textAlign="center"
          underlineColorAndroid="transparent"
          selectionColor="gray"
          autoFocus={true}
          cursorColor="black"
          style={[{ fontFamily: "Nunito-Medium" }, styles.textInput, Platform.OS === "web" && { outline: "none" }]}
        />
        <Pressable
          onPress={onKeywordEnter}
          style={({ pressed }) => [{ backgroundColor: pressed ? "rgb(255, 134, 134)" : "red" }, styles.addButton, styles.buttonShadow]}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <View style={styles.completeButtonContainer}>
        {keywords.length > 0 && (
          <Pressable
            onPress={onKeywordEnter}
            style={({ pressed }) => [{ backgroundColor: pressed ? "rgb(255, 134, 134)" : "red" }, styles.completeButton, styles.buttonShadow]}
          >
            <Text style={[styles.completeButtonText, { fontFamily: "Nunito-ExtraBold" }]}>Find My Restaurants!</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  textInput: {
    fontSize: 35,
    marginHorizontal: 20,
    marginVertical: 30,
    textAlign: "center",
  },
  keywordsContainer: {
    /* minHeight: 250,
    maxHeight: 250,
    width: "100%", */
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 20,
    gap: 10,
  },
  keywordsDimensions: {
    minHeight: 250,
    maxHeight: 250,
    maxWidth: 800,
    width: "100%",
    marginTop: 20,
  },
  actionContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: -300,
  },
  completeButtonContainer: {
    width: "100%",
    height: 75,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 0,
    width: 200,
  },
  completeButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
    marginBottom: 125,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 0,
    height: 75,
    width: "90%",
    maxWidth: 800,
  },
  buttonShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  completeButtonText: {
    fontSize: 22,
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});

export default Keywords;
