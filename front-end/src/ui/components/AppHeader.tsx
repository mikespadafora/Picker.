import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface IAppHeaderProps {
  backScreen?: string;
  showBackButton: boolean;
}

const AppHeader = (props: IAppHeaderProps) => {
  const imagePath = require('../../../assets/img/logo.png');
  const navigation = useNavigation();

  const mybool: boolean = false;

  const headerMarginTop: number = Platform.OS === 'android' ? 50 : 0;

  return (
    <Animated.View
      className="w-full bg-white flex flex-row justify-between items-center"
      style={[{ marginTop: headerMarginTop }, styles.headerContainer]}
    >
      {props.showBackButton ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ height: 40, width: 40 }}
        >
          <Icon
            name="angle-left"
            color="rgb(0,0,60)"
            size={40}
            style={[{ paddingBottom: 2 }]}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}
      <Image source={imagePath} style={{ height: 40, width: 40 }} />
      <View style={{ width: 40 }} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
  },
});

export default AppHeader;
