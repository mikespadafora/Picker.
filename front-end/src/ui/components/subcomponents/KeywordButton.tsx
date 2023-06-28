import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

SplashScreen.preventAutoHideAsync();

interface IKeywordButtonProps {
  label: string;
  onPress: Function;
  index: number;
}

const KeywordButton = ({ label, onPress, index }: IKeywordButtonProps) => {
  //---------------------Variables

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
      className="flex flex-row self-start grow-0 justify-center items-center bg-white border-2 border-black rounded-full"
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <Pressable onPress={onDelete} style={styles.pressable}>
        <Text style={[styles.label, { fontFamily: 'Nunito-ExtraBold' }]}>
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

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 10,
  },
  pressable: {
    display: 'flex',
    flexGrow: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: 'rgb(0, 0, 0)',
    paddingRight: 15,
  },
});

export default KeywordButton;
