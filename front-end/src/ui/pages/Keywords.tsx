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
    <View
      className="w-full h-full flex flex-col justify-between items-center bg-white"
      onLayout={onLayoutRootView}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="h-full w-full flex flex-col justify-start items-center"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>What are you feeling?</Text>
        </View>
        {keywords.length === 0 && (
          <View style={styles.subheaderContainer}>
            <Text style={styles.placeholderSubheader}>
              Enter keywords like: {'\n'}'Tacos', 'Comfort Food', or 'Burgers'
            </Text>
          </View>
        )}
        {keywords.length > 0 && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true} /*  */
            style={styles.keywordsDimensions}
            contentContainerStyle={styles.keywordsContainer}
            bounces={false}
            bouncesZoom={false}
            indicatorStyle="black"
            snapToEnd={true}
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
        <View className="w-full h-auto mb-14 flex flex-1 flex-col justify-center items-center">
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
            style={[
              { fontFamily: 'Nunito-Medium' },
              styles.textInput,
              // @ts-ignore
              Platform.OS === 'web' && { outline: 'none' },
            ]}
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

      <View className="w-full h-20  mb-5 flex flex-col justify-center items-center">
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
    </View>
  );
};

//------------------------------------ Style

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    height: 200,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    marginTop: 20,
    height: 40,
    overflow: 'visible',
  },
  subheaderContainer: {
    height: 138,
  },
  headerText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 30,
    textAlign: 'center',
  },
  placeholderSubheader: {
    fontFamily: 'Nunito-Medium',
    color: '#6c6c6cc6',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 25,
    marginTop: 5,
  },
  textInput: {
    fontSize: 32,
    marginVertical: 30,
    textAlign: 'center',
    width: '100%',
  },
  keywordsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 20,
    gap: 10,
  },
  keywordsDimensions: {
    maxWidth: 800,
    minHeight: 150,
    maxHeight: 150,
    width: '95%',
    overflowX: 'hidden',
  },
  actionContainer: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    /* marginTop: -20, */
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
  completeButtonContainer: {
    width: '100%',
    height: 75,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    justifySelf: 'flex-end',
    marginTop: 'auto',
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
