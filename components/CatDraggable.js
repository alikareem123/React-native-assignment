import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, TouchableOpacity, Alert } from 'react-native';
import CatImage from './CatImage';
import CatControls from './CatControls';

const CatDraggable = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState('');
  const [size, setSize] = useState(100);
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
    Alert.alert('Position', `X: ${position.x.toFixed(2)}, Y: ${position.y.toFixed(2)}`);
  };

  const sayHello = () => {
    setMessage('Hello');
    setTimeout(() => setMessage(''), 2000);
  };

  const thinkHmm = () => {
    setMessage('HMM');
    setTimeout(() => setMessage(''), 2000);
  };

  const increaseSize = () => setSize(size + 10);
  const resetSize = () => setSize(100);

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <CatImage
        position={position}
        rotation={rotation}
        size={size}
        message={message}
        panHandlers={panResponder.panHandlers}
      />
      <CatControls
        moveLeft={moveLeft}
        moveRight={moveRight}
        rotate={rotate}
        getPosition={getPosition}
        sayHello={sayHello}
        thinkHmm={thinkHmm}
        increaseSize={increaseSize}
        resetSize={resetSize}
      />
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
});

export default CatDraggable;
