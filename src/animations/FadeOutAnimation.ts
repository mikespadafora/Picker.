import { Animated } from 'react-native';

import AReactNativeAnimation from './AReactAnimation';

export default class FadeOutAnimation extends AReactNativeAnimation {
  public opacity: Animated.AnimatedInterpolation<string | number>;

  constructor(duration: number) {
    super(duration);

    this.opacity = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
  }
}
