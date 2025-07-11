import { Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { PropsWithChildren } from 'react';

export type TarotCardProps = PropsWithChildren<{
  front: ImageSourcePropType;
  back: ImageSourcePropType;
  onSwipe?: () => void;
}>;

export default function TarotCard({ front, back, onSwipe }: TarotCardProps) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      const threshold = 150;
      if (Math.abs(translateX.value) > threshold) {
        if (onSwipe) runOnJS(onSwipe)();
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const tap = Gesture.Tap()
    .onEnd(() => {
      const toValue = rotateY.value >= 90 ? 0 : 180;
      rotateY.value = withTiming(toValue, { duration: 300 });
    });

  const gesture = Gesture.Simultaneous(pan, pinch, tap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { perspective: 800 },
    ],
  }));

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
    backfaceVisibility: 'hidden',
  }));

  const backStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: [{ rotateY: `${rotateY.value + 180}deg` }],
    backfaceVisibility: 'hidden',
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Animated.View style={[StyleSheet.absoluteFill, frontStyle]}>
          <Image source={front} style={styles.image} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, backStyle]}>
          <Image source={back} style={styles.image} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 280,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
