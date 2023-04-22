import * as React from "react";
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

export type MainStackNavigation = StackNavigationProp<MainStackParamList>;

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = ({ locationDenied }: { locationDenied: boolean }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchRadius" component={SearchRadius} initialParams={{ locationDenied: locationDenied }} />
      <Stack.Screen name="Keywords" component={Keywords} />
      {/* <Stack.Screen name="RestaurantSelection" component={RestaurantSelection} />
        <Stack.Screen name="Results" component={Results} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
