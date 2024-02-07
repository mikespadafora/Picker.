import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Make sure to install this package

interface PickerButtonProps {
  title: string;
  iconName?: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object; // Using className for Tailwind styles
  textStyle?: string;
  iconStyle?: string;
}

const PickerButton: React.FC<PickerButtonProps> = ({
  title,
  iconName,
  onPress,
  style,
  textStyle,
  iconStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        style,
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <View
        className={`flex flex-row items-center justify-center h-full w-full`}
      >
        <Icon
          name={iconName ? iconName : ''}
          size={24}
          color="white"
          className={`mr-4 ${iconStyle}`}
        />
        <Text className={`text-white text-lg ${textStyle}`}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PickerButton;
