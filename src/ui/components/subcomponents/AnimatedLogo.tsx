import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import MoveAnimation from '../../../animations/MoveAnimation';
import Emitter from '../../../logic/emitter';

const AnimatedLogo = () => {
  const logo = require('../../../../assets/img/logo.png');

  const move = new MoveAnimation(200, -20);

  let animationFinished = false;

  useEffect(() => {
    move.registerAnimationComplete(() => {
      if (!animationFinished) {
        animationFinished = true;
        move.updatePosition(0);
        move.start();
      } else {
        Emitter.emit('OnAnimationComplete', null);
      }
    });

    move.start();
  }, [move.position]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={{
          height: 200,
          width: 200,
          transform: [{ translateY: move.position }],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
  },
});

export default AnimatedLogo;
