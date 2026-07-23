import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, { FadeInUp, useReducedMotion } from "react-native-reanimated";

type Props = {
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
};

export default function VendorDashboardReveal({ children, delay = 0, style }: Props) {
  const reduceMotion = useReducedMotion();
  const entering = reduceMotion
    ? undefined
    : FadeInUp.delay(delay).duration(280).withInitialValues({
        opacity: 0,
        transform: [{ translateY: 10 }],
      });
  return <Animated.View entering={entering} style={style}>{children}</Animated.View>;
}
