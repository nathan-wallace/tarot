import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

export default function LottieAnimation() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/lottie/intro.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});
