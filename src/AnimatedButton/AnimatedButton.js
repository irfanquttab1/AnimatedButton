import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useCallback, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {styles} from './Style';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedButton = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const buttonWidth = useSharedValue(300);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      width: buttonWidth.value,
    };
  });

  const toggleButton = useCallback(() => {
    buttonWidth.value = withTiming(isExpanded ? 50 : 300, {duration: 500});
    setIsExpanded(prevState => !prevState);
  }, [buttonWidth, isExpanded]);

  return (
    <View style={styles.main}>
      <AnimatedTouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={() => toggleButton()}>
        {isExpanded ? (
          <Text style={styles.text}>SignUp</Text>
        ) : (
          <ActivityIndicator size="large" color="white" />
        )}
      </AnimatedTouchableOpacity>
    </View>
  );
};

export default AnimatedButton;
