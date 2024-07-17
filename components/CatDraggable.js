import React, { useState, useRef } from "react";
import { View, StyleSheet, PanResponder, Alert, Button } from "react-native";
import CatImage from "./CatImage";
import CatControls from "./CatControls";

const CatDraggable = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState("");
  const [size, setSize] = useState(100);
  const [actionGroup, setActionGroup] = useState([]);
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
        positionRef.current = {
          x: position.x + gestureState.dx,
          y: position.y + gestureState.dy,
        };
        setPosition(positionRef.current);
      },
    })
  ).current;

  const addActionToGroup = (action) => {
    setActionGroup([...actionGroup, action]);
  };
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const executeActionsSequentially = async () => {
    for (const action of actionGroup) {
      await timeout(800);
      await action();
    }
    setActionGroup([]);
  };

  const moveLeft = () => setPosition({ ...position, x: position.x - 10 });
  const moveRight = () => setPosition({ ...position, x: position.x + 10 });
  const rotate = () => setRotation(rotation + 10);
  const getPosition = () => {
    Alert.alert(
      "Position",
      `X: ${position.x.toFixed(2)}, Y: ${position.y.toFixed(2)}`
    );
  };

  const sayHello = () => {
    setMessage("Hello");
    setTimeout(() => setMessage(""), 2000);
  };

  const thinkHmm = () => {
    setMessage("HMM");
    setTimeout(() => setMessage(""), 2000);
  };

  const increaseSize = () => setSize(size + 10);
  const resetSize = () => setSize(100);

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.controlsContainer}>
        <CatControls
          addActionToGroup={addActionToGroup}
          moveLeft={() => addActionToGroup(moveLeft)}
          moveRight={() => addActionToGroup(moveRight)}
          rotate={() => addActionToGroup(rotate)}
          getPosition={() => addActionToGroup(getPosition)}
          sayHello={() => addActionToGroup(sayHello)}
          thinkHmm={() => addActionToGroup(thinkHmm)}
          increaseSize={() => addActionToGroup(increaseSize)}
          resetSize={() => addActionToGroup(resetSize)}
        />
        <View style={styles.catPlayer}>
          <Button title="Play Actions" onPress={executeActionsSequentially} />
        </View>
      </View>
      <CatImage
        position={position}
        rotation={rotation}
        size={size}
        message={message}
        panHandlers={panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f0f0f0",
  },
  controlsContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  catPlayer: {
    flex: 0.5,
    width: 100,
    height: 40,
    justifyContent: "space-evenly",
    marginBottom: 30,
    marginTop: 10,
    marginLeft: 40,
  },
});

export default CatDraggable;
