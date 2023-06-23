export default interface IReactNativeAnimation {
  start: () => void;
  registerAnimationComplete: (callback: () => void) => void;
}
