import React from 'react';
import { StyleSheet } from 'react-native';
import { ARKit } from 'react-native-arkit';

export default function ARCardSpread() {
  return (
    <ARKit style={styles.flex} planeDetection={ARKit.ARPlaneDetection.Horizontal}>
      {/* Placeholder cards rendered as planes */}
      <ARKit.Plane
        position={{ x: -0.05, y: 0, z: -0.3 }}
        eulerAngles={{ x: -Math.PI / 2 }}
        shape={{ width: 0.06, height: 0.1 }}
        material={{ diffuse: { contents: 'white' } }}
      />
      <ARKit.Plane
        position={{ x: 0, y: 0, z: -0.3 }}
        eulerAngles={{ x: -Math.PI / 2 }}
        shape={{ width: 0.06, height: 0.1 }}
        material={{ diffuse: { contents: 'white' } }}
      />
      <ARKit.Plane
        position={{ x: 0.05, y: 0, z: -0.3 }}
        eulerAngles={{ x: -Math.PI / 2 }}
        shape={{ width: 0.06, height: 0.1 }}
        material={{ diffuse: { contents: 'white' } }}
      />
    </ARKit>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
