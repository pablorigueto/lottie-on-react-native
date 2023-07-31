import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";

// AnimatedLottieView is a new component created to animate Lottie animations
// using the Animated API in React Native, allowing smooth and efficient animations.
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ControllingAnimationProgress() {
  // State variables to manage animation control
  const [animationTriggered, setAnimationTriggered] = useState(false); // Indicates whether the animation has been triggered
  const [isReverse, setIsReverse] = useState(false); // Indicates whether the animation should play in reverse

  // Ref to hold the animated value representing the progress of the animation
  const animationProgress = useRef(new Animated.Value(0));

  // Effect to control the animation behavior
  useEffect(() => {
    if (animationTriggered) {
      const toValue = isReverse ? 0 : 1;
      // Use Animated.timing to animate the progress value from current value to toValue
      Animated.timing(animationProgress.current, {
        toValue,
        duration: 1000, // Animation duration (1 second)
        easing: Easing.linear, // Linear easing for smooth animation
        useNativeDriver: false, // Lottie animation doesn't support native animations
      }).start(() => {
        // If isReverse is true, setAnimationTriggered to false when the animation completes (goes from 100% to 0%)
        if (isReverse) {
          setAnimationTriggered(false);
        }
      });
    }
  }, [animationTriggered, isReverse]);

  // Function to handle the toggle of the animation play/pause
  const handlePauseToggle = () => {
    if (!animationTriggered) {
      setAnimationTriggered(true);
      // Set to false to play the animation from 0% to 100%.
      setIsReverse(false);
    }
    // Set to true to play the animation from 100% to 0%.
    else {
      setIsReverse(true);
    }
  };

  // Component rendering
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={handlePauseToggle} style={{ flex: 1 }}>
        <AnimatedLottieView
          source={require("./animation.json")} // Source of the Lottie animation
          progress={animationProgress.current} // Progress value to control the animation
          style={{ flex: 1 }} // Stretch the animation to fill the available space
        />
      </TouchableOpacity>
    </View>
  );
}
