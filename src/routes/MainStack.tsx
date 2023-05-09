import * as React from "react";
import { useEffect, useState } from "react";
import { Image, View, TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import SearchRadius from "../ui/pages/SearchRadius";
import Keywords from "../ui/pages/Keywords";
/* import RestaurantSelection from "../ui/pages/RestaurantSelection";
import Results from "../ui/pages/Results"; */

export type MainStackParamList = {
  SearchRadius: { locationDenied: boolean };
  Keywords: undefined;
};

export type MainStackNavigation = StackNavigationProp<MainStackParamList>;

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = ({ locationDenied }: { locationDenied: boolean }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showBackButton, setShowBackButton] = useState(false);

  const imagePath = require("../../assets/img/logo.png");

  useEffect(() => {
    if (isFocused) {
      console.log("pass");
      setShowBackButton(navigation.canGoBack());
    }
  }, [isFocused, navigation]);

  const globalScreenOptions = {
    /* headerTitle: () => <Image source={imagePath} style={{ width: 40, height: 40 }} />, */
    header: () => (
      <View
        style={{
          height: 100,
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 30,
          borderBottomWidth: 0.2,
          borderBottomColor: "gray",
        }}
      >
        {showBackButton ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 40, width: 40 }}>
            <Icon name="angle-left" color="rgb(0,0,60)" size={40} style={[{ paddingBottom: 2 }]} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
        <Image source={imagePath} style={{ height: 40, width: 40 }} />
        <View style={{ width: 40 }}></View>
      </View>
    ),
  };
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen name="SearchRadius" component={SearchRadius} initialParams={{ locationDenied: locationDenied }} />
      <Stack.Screen name="Keywords" component={Keywords} />
      {/* <Stack.Screen name="RestaurantSelection" component={RestaurantSelection} />
        <Stack.Screen name="Results" component={Results} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
