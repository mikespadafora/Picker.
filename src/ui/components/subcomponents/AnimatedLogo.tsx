import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Emitter from "../../../logic/emitter";

const AnimatedMovingView = () => {
  const translateY = useRef(new Animated.Value(0)).current;
	const logo = require("../../../../assets/img/logo.png");

  useEffect(() => {
    const moveUp = () => {
      Animated.timing(translateY, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true
      }).start(moveDown);
    };

    const moveDown = () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => Emitter.emit("OnAnimationComplete", null));
    };

    moveUp();
  }, [translateY]);

  return (
    <View style={styles.container}>
      <Animated.Image source={logo} style={{
				height: 200,
				width: 200,
				transform: [{ translateY }]
			}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    /* flex: 1,
    justifyContent: 'center',
    alignItems: 'center' */
		height: 200,
		width: 200
  }
});

export default AnimatedMovingView;


