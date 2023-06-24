import {
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export interface IAppHeaderProps {
  opacity: Animated.Value;
  showBackButton: boolean;
}

const AppHeader = (props: IAppHeaderProps) => {
  const imagePath = require('../../../assets/img/logo.png');
  const navigation = useNavigation();

  return (
    <Animated.View
      style={{
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray',
        opacity: props.opacity,
      }}
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

export default AppHeader;

const styles = StyleSheet.create({});
