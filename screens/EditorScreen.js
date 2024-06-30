import React from 'react';
import { View, StyleSheet } from 'react-native';
import CatDraggable from "../components/CatDraggable";

const EditorScreen = () => {
  return (
    <View style={styles.container}>
      <CatDraggable />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditorScreen;
