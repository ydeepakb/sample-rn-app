import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, Button } from 'react-native';

const AnimatedDivideExample = () => {
  // 1. Create an Animated.Value for the input (e.g., initial scale of 1)
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // 2. Create the output Animated.Value using Animated.divide()
  //    This creates a new value that is 1 divided by the current value of scaleAnim
  const inverseScaleAnim = Animated.divide(1, scaleAnim);

  const startAnimation = () => {
    // Animate the input value (scaleAnim) from 1 to 2
    Animated.spring(scaleAnim, {
      toValue: 2,
      useNativeDriver: true, // Use native driver for performance
    }).start(() => {
      // After completion, animate it back to 1
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // The first box uses the scaleAnim value directly (1x -> 2x -> 1x)
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.text}>Scaling In</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            marginTop: 20,
            // The second box uses the inverseScaleAnim value (1x -> 0.5x -> 1x)
            transform: [{ scale: inverseScaleAnim }],
          },
        ]}
      >
        <Text style={styles.text}>Scaling Out</Text>
      </Animated.View>
      <Button title="Start Divide Animation" onPress={startAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  fadingContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'skyblue',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default AnimatedDivideExample;
