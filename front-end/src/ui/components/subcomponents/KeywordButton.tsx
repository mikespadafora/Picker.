import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

SplashScreen.preventAutoHideAsync();

interface KeywordButtonProps {
  label: string;
  onPress: Function;
  index: number;
}

const KeywordButton = ({ label, onPress, index }: KeywordButtonProps) => {
  //--------------------- Fonts

  const [fontsLoaded] = useFonts({
    'Nunito-Medium': require('../../../../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-ExtraBold': require('../../../../assets/fonts/Nunito-ExtraBold.ttf'),
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
    if (onPress) onPress(index);
  };

  //------------------------------------ Template

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      className="flex flex-row self-start grow-0 justify-center items-center bg-white border-2 border-black rounded-full h-9 pr-2 pl-4"
      onLayout={onLayoutRootView}
    >
      <Pressable
        onPress={onDelete}
        className="flex flex-grow-0 flex-row justify-center items-center"
      >
        <Text
          style={{ fontFamily: 'Nunito-ExtraBold' }}
          className="text-sm text-black pr-4"
        >
          {label}
        </Text>
        <Icon
          name="close"
          color="red"
          size={20}
          style={[{ paddingBottom: 2 }]}
        />
      </Pressable>
    </View>
  );
};

export default KeywordButton;
