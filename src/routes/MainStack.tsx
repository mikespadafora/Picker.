import * as React from "react";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import SearchRadius from "../ui/pages/SearchRadius";
import Keywords from "../ui/pages/Keywords";
/* import RestaurantSelection from "../ui/pages/RestaurantSelection";
import Results from "../ui/pages/Results"; */

export type MainStackParamList = {
  SearchRadius: { locationDenied: boolean };
  Keywords: undefined;
};

const imagePath = require("../../assets/img/logo.png");

const globalScreenOptions = {
  headerTitle: () => <Image source={imagePath} style={{ width: 40, height: 40 }} />,
  headerStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: "transparent",
    height: 60,
  },
  headerTitleAlign: "center",
  headerShadowVisible: false,
  headerBackTitleVisible: false,
};

export type MainStackNavigation = StackNavigationProp<MainStackParamList>;

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = ({ locationDenied }: { locationDenied: boolean }) => {
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
