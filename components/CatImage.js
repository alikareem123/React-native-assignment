import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Image } from 'react-native-svg';

const CatImage = ({ position, rotation, size, message, panHandlers }) => (
  <View
    style={[
      styles.catContainer,
      {
        transform: [
          { translateX: position.x },
          { translateY: position.y },
          { rotate: `${rotation}deg` },
          { scale: size / 100 },
        ],
      },
    ]}
    {...panHandlers}
  >
    <Svg height={size} width={size}>
      <Image href={require('../assets/cat.png')} x="0" y="0" width="100%" height="100%" />
    </Svg>
    {message !== '' && (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  catContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  messageContainer: {
    position: 'absolute',
    top: -30,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  messageText: {
    color: '#000',
    fontSize: 14,
  },
});

export default CatImage;
