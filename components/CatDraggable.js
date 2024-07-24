import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, PanResponder, Alert, Button } from "react-native";
import CatImage from "./CatImage";
import CatControls from "./CatControls";

const CatDraggable = () => {
  const [cats, setCats] = useState([
    {
      id: 1,
      position: { x: 0, y: 0 },
      rotation: 0,
      message: "",
      size: 100,
      actions: [],
    },
  ]);
  const [currentCatId, setCurrentCatId] = useState(1);
  const positionRefs = useRef({ 1: { x: 0, y: 0 } });

  useEffect(() => {
    const currentCat = cats.find((cat) => cat.id === currentCatId);
    if (currentCat) {
      positionRefs.current[currentCatId] = currentCat.position;
    }
  }, [currentCatId, cats]);

  const createPanResponder = (catId) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        setCurrentCatId(catId);
      },
      onPanResponderMove: (event, gestureState) => {
        const newX =
          positionRefs.current[catId].x +
          (gestureState.moveX - gestureState.x0) * sensitivity;
        const newY =
          positionRefs.current[catId].y +
          (gestureState.moveY - gestureState.y0) * sensitivity;
        updateCatPosition(catId, { x: newX, y: newY });
      },
      onPanResponderRelease: (event, gestureState) => {
        positionRefs.current[catId] = {
          x:
            positionRefs.current[catId].x +
            (gestureState.moveX - gestureState.x0) * sensitivity,
          y:
            positionRefs.current[catId].y +
            (gestureState.moveY - gestureState.y0) * sensitivity,
        };
        updateCatPosition(catId, positionRefs.current[catId]);
      },
    });
  };

  const sensitivity = 0.01; // Adjust this value to make the drag less sensitive

  const addCat = () => {
    const newCat = {
      id: cats.length + 1,
      position: { x: 0, y: 0 },
      rotation: 0,
      message: "",
      size: 100,
      actions: [],
    };
    setCats([...cats, newCat]);
    positionRefs.current[newCat.id] = { x: 0, y: 0 };
    setCurrentCatId(newCat.id);
  };

  const updateCatPosition = (id, position) => {
    setCats((prevCats) =>
      prevCats.map((cat) => (cat.id === id ? { ...cat, position } : cat))
    );
  };

  const updateCatState = (id, updates) => {
    setCats((prevCats) =>
      prevCats.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  };

  const addActionToCurrentCat = (action) => {
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === currentCatId
          ? { ...cat, actions: [...cat.actions, action] }
          : cat
      )
    );
  };

  const moveLeft = () =>
    addActionToCurrentCat(() =>
      updateCatPosition(currentCatId, {
        ...positionRefs.current[currentCatId],
        x: positionRefs.current[currentCatId].x - 10,
      })
    );
  const moveRight = () =>
    addActionToCurrentCat(() =>
      updateCatPosition(currentCatId, {
        ...positionRefs.current[currentCatId],
        x: positionRefs.current[currentCatId].x + 10,
      })
    );
  const rotate = () =>
    addActionToCurrentCat(() =>
      updateCatState(currentCatId, {
        rotation:
          (cats.find((cat) => cat.id === currentCatId).rotation + 10) % 360,
      })
    );
  const getPosition = () =>
    addActionToCurrentCat(() => {
      const currentCat = cats.find((cat) => cat.id === currentCatId);
      Alert.alert(
        "Position",
        `X: ${currentCat.position.x.toFixed(
          2
        )}, Y: ${currentCat.position.y.toFixed(2)}`
      );
    });

  const sayHello = () =>
    addActionToCurrentCat(() => {
      updateCatState(currentCatId, { message: "Hello" });
      setTimeout(() => updateCatState(currentCatId, { message: "" }), 2000);
    });

  const thinkHmm = () =>
    addActionToCurrentCat(() => {
      updateCatState(currentCatId, { message: "HMM" });
      setTimeout(() => updateCatState(currentCatId, { message: "" }), 2000);
    });

  const increaseSize = () =>
    addActionToCurrentCat(() =>
      updateCatState(currentCatId, {
        size: cats.find((cat) => cat.id === currentCatId).size + 10,
      })
    );
  const resetSize = () =>
    addActionToCurrentCat(() => updateCatState(currentCatId, { size: 100 }));

  const executeActionsSequentially = async () => {
    const actions = cats.find((cat) => cat.id === currentCatId).actions;
    for (const action of actions) {
      await timeout(800);
      await action();
    }
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === currentCatId ? { ...cat, actions: [] } : cat
      )
    );
  };

  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleCatPress = (cat) => {
    setCurrentCatId(cat.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.controlsContainer}>
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
        <Button title="Add Cat" onPress={addCat} />
        <View style={styles.catPlayer}>
          <Button title="Play Actions" onPress={executeActionsSequentially} />
        </View>
      </View>
      {cats.map((cat) => (
        <CatImage
          key={cat.id}
          position={cat.position}
          rotation={cat.rotation}
          size={cat.size}
          message={cat.message}
          panHandlers={createPanResponder(cat.id).panHandlers}
          onPress={() => handleCatPress(cat)}
        />
      ))}
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
