import { MotiView } from "moti";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function FitnessLoader() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 70 * (1 - progress.value),
  }));

  return (
    <View style={styles.overlay}>
      <MotiView
        from={{
          scale: 0.85,
          opacity: 0.45,
        }}
        animate={{
          scale: 1.15,
          opacity: 1,
        }}
        transition={{
          type: "timing",
          duration: 900,
          loop: true,
          repeatReverse: true,
        }}
        style={styles.outerCircle}
      >
        <View style={styles.innerCircle}>
          <Svg width={36} height={36} viewBox="0 0 30 30" style={styles.heart}>
            <Path
              d="M15 25 C13 23 5 18 5 11 C5 7.5 7.3 5 10.3 5 C12.3 5 14 6.1 15 7.8 C16 6.1 17.7 5 19.7 5 C22.7 5 25 7.5 25 11 C25 18 17 23 15 25Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Svg width={36} height={28} viewBox="0 0 30 24" style={styles.ecg}>
            <AnimatedPath
              d="M0 13 H5 L8 13 L10 5 L13 19 L16 10 L18 13 H30"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="35 35"
              animatedProps={animatedProps}
            />
          </Svg>
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.88)",
    zIndex: 99999,
    elevation: 99999,
  },
  outerCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: "#C8FF35",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0B8F5A",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heart: {
    position: "absolute",
    top: 7,
    left: 7,
  },
  ecg: {
    position: "absolute",
    top: 12,
    left: 7,
  },
});
