import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CatControls = ({ moveLeft, moveRight, rotate, getPosition, sayHello, thinkHmm, increaseSize, resetSize }) => (
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
    <TouchableOpacity style={styles.buttonGreen} onPress={sayHello}>
      <Text style={styles.buttonText}>Say Hello</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonGreen} onPress={thinkHmm}>
      <Text style={styles.buttonText}>Think HMM</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonBlue} onPress={increaseSize}>
      <Text style={styles.buttonText}>Increase Size</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonBlue} onPress={resetSize}>
      <Text style={styles.buttonText}>Reset Size</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1
  },
  buttonGreen: {
    backgroundColor: '#4CAF50',
    
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: 120,
    justifyContent: 'center',
    flex: 1
  },
  buttonBlue: {
    backgroundColor: '#2196F3',
    marginLeft: 20,
    marginTop: 10,
    width: 100,
    justifyContent: 'center',
    borderRadius: 8,
    margin: 5,
    flex: 1
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CatControls;
