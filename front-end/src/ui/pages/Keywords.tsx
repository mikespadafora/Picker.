import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { storeKeywords } from '../../logic/state/slices/keywordsSlice';
import { MainStackParamList } from '../../routes/MainStack';
import KeywordButton from '../components/subcomponents/KeywordButton';
import PickerButton from '../components/subcomponents/PickerButton';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

type NavigationProps = NativeStackScreenProps<
  MainStackParamList,
  'Keywords',
  'MainStack'
>;

const Keywords = ({ route, navigation }: NavigationProps) => {
  //---------------------Variables

  const dispatch = useDispatch();

  const [text, setText] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const textInputRef = useRef<TextInput>(null);

  const [fontsLoaded] = useFonts({
    'Nunito-Medium': require('../../../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-ExtraBold': require('../../../assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-ExtraLight': require('../../../assets/fonts/Nunito-ExtraLight.ttf'),
    'Nunito-ExtraLightItalic': require('../../../assets/fonts/Nunito-ExtraLightItalic.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  //------------------------------------ Lifecyle

  useEffect(() => {}, [fontsLoaded]);

  useEffect(() => {
    console.log(keywords);

    if (keywords.length > 0) {
      dispatch(storeKeywords(keywords));
    }
  }, [keywords]);

  //------------------------------------ Event Handlers

  const onKeywordEnter = () => {
    if (text) {
      setKeywords((keywords) => [...keywords, text]);
      setText('');

      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }
  };

  const onRemoveKeyword = (keyword: number) => {
    setKeywords(keywords.filter((_, index) => index !== keyword));
  };

  //------------------------------------ Render

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      className="w-full h-full flex flex-col justify-start items-center bg-white"
      onLayout={onLayoutRootView}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex flex-col justify-start items-center h-1/4 w-full flex-1"
      >
        <View className=" h-2/5 w-full flex flex-col justify-start my-5">
          <Text style={styles.headerText} className="text-3xl mb-3">
            What are you feeling?
          </Text>

          {keywords.length === 0 && (
            <Text style={styles.placeholderSubheader}>
              Enter keywords like: {'\n'}'Tacos', 'Comfort Food', or 'Burgers'
            </Text>
          )}
          {keywords.length > 0 && (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator
              persistentScrollbar
              style={styles.keywordsDimensions}
              contentContainerStyle={styles.keywordsContainer}
              bounces={false}
              bouncesZoom={false}
              indicatorStyle="black"
            >
              {keywords.length > 0 &&
                keywords.map((keyword, index) => (
                  <KeywordButton
                    label={keyword}
                    key={index}
                    index={index}
                    onPress={(index: number) => onRemoveKeyword(index)}
                  />
                ))}
            </ScrollView>
          )}
        </View>
        <View className="w-full h-1/2 flex flex-col justify-start items-center">
          <TextInput
            ref={textInputRef}
            value={text}
            onChangeText={setText}
            onSubmitEditing={() => onKeywordEnter()}
            placeholder="Enter Keyword Here!"
            placeholderTextColor="gray"
            textAlign="center"
            underlineColorAndroid="transparent"
            selectionColor="gray"
            autoFocus={true}
            cursorColor="black"
            blurOnSubmit={true}
            style={[
              { fontFamily: 'Nunito-Medium' },
              styles.textInput,
              // @ts-ignore
              Platform.OS === 'web' && { outline: 'none' },
            ]}
            className="text-[9vw]"
          />
          <Pressable
            onPress={() => {
              if (text) onKeywordEnter();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed && text ? 'rgb(255, 134, 134)' : 'red',
                opacity: text ? 1 : 0.3,
              },
              styles.addButton,
              styles.buttonShadow,
            ]}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <View className="w-full h-1/5 flex flex-col justify-end items-center">
        {keywords.length > 0 && (
          <Pressable
            onPress={() => console.log(keywords)}
            style={({ pressed }) => [
              { backgroundColor: pressed ? 'rgb(255, 134, 134)' : 'red' },
              styles.completeButton,
              styles.buttonShadow,
            ]}
          >
            <Text
              style={[
                styles.completeButtonText,
                { fontFamily: 'Nunito-ExtraBold' },
              ]}
            >
              Find My Restaurants!
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Nunito-Medium',
    textAlign: 'center',
  },
  placeholderSubheader: {
    fontFamily: 'Nunito-Medium',
    color: '#6c6c6cc6',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 25,
  },
  textInput: {
    marginBottom: 30,
    textAlign: 'center',
    width: '100%',
  },
  keywordsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  keywordsDimensions: {
    maxWidth: 800,
    width: '95%',
    //@ts-ignore
    overflowX: 'hidden',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 0,
    width: 200,
  },

  completeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 0,
    height: 75,
    width: '75%',
    maxWidth: 800,
  },
  buttonShadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  completeButtonText: {
    fontSize: 22,
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
});

export default Keywords;
