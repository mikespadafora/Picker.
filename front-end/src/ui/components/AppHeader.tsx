import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface IAppHeaderProps {
  opacity: Animated.Value;
  showBackButton: boolean;
}

const AppHeader = (props: IAppHeaderProps) => {
  const imagePath = require('../../../assets/img/logo.png');
  const navigation = useNavigation();

  return (
    <Animated.View
      className="w-full bg-white flex flex-row justify-between items-center"
      style={[{ opacity: props.opacity }, styles.headerContainer]}
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
      <View style={{ width: 40 }}></View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
  },
});

export default AppHeader;
