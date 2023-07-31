import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ControllingAnimationProgress() {
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    if (animationTriggered) {
      const toValue = isReverse ? 0 : 1;
      Animated.timing(animationProgress.current, {
        toValue,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        if (isReverse) {
          setAnimationTriggered(false);
        }
      });
    }
  }, [animationTriggered, isReverse]);

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

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={handlePauseToggle} style={{ flex: 1 }}>
        <AnimatedLottieView
          source={require("./animation.json")}
          progress={animationProgress.current}
          style={{ flex: 1 }}
        />
      </TouchableOpacity>
    </View>
  );
}
