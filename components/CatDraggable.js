import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, TouchableOpacity, Alert,  } from 'react-native';
import Svg, { Image } from 'react-native-svg';

const CatDraggable = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const positionRef = useRef(position);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const newX = positionRef.current.x + gestureState.dx;
        const newY = positionRef.current.y + gestureState.dy;
        setPosition({ x: newX, y: newY });
      },
      onPanResponderRelease: (event, gestureState) => {
        positionRef.current = { x: position.x + gestureState.dx, y: position.y + gestureState.dy };
        setPosition(positionRef.current);
      },
    })
  ).current;

  const moveLeft = () => setPosition({ ...position, x: position.x - 10 });
  const moveRight = () => setPosition({ ...position, x: position.x + 10 });
  const rotate = () => setRotation(rotation + 10);

  const getPosition = () => {
    Alert.alert(`Position`, `X: ${position.x.toFixed(2)}, Y: ${position.y.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.background} />

      <View
        style={[styles.catContainer, { transform: [{ translateX: position.x }, { translateY: position.y }, { rotate: `${rotation}deg` }] }]}
        {...panResponder.panHandlers}
      >
        <Svg height="100" width="100">
          <Image
            href={require('../assets/cat.png')}
            x="0"
            y="0"
            width="100"
            height="100"
          />
        </Svg>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonGreen} onPress={moveLeft}>
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGreen} onPress={moveRight}>
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBlue} onPress={rotate}>
          <Text style={styles.buttonText}>Rotate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBlue} onPress={getPosition}>
          <Text style={styles.buttonText}>Position</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f0f0f0', 
  },
  catContainer: {
    position: 'absolute',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  buttonGreen: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonBlue: {
    backgroundColor: '#2196F3', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CatDraggable;
