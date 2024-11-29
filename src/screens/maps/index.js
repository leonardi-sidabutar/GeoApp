import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, {PROVIDER_GOOGLE, Polygon, Marker} from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

export default function Map() {
  return (
    <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE}
      transparent={true}
      animationType="fade"
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
    </MapView>
  </View>
  )
}