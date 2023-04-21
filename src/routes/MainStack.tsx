import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import SearchRadius from "../ui/pages/SearchRadius";
import Keywords from "../ui/pages/Keywords";
/* import RestaurantSelection from "../ui/pages/RestaurantSelection";
import Results from "../ui/pages/Results"; */

export type MainStackParamList = {
  SearchRadius: undefined;
  Keywords: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SearchRadius" component={SearchRadius} />
        <Stack.Screen name="Keywords" component={Keywords} />
        {/* <Stack.Screen name="RestaurantSelection" component={RestaurantSelection} />
        <Stack.Screen name="Results" component={Results} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
