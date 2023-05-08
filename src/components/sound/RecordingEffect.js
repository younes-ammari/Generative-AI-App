import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
    interpolate,
  } from "react-native-reanimated";
  
  const Ring = ({ delay }) => {
    const ring = useSharedValue(0);
  
    const ringStyle = useAnimatedStyle(() => {
      return {
        opacity: 0.8 - ring.value,
        transform: [
          {
            scale: interpolate(ring.value, [0, 1], [0, 4]),
          },
        ],
      };
    });
    useEffect(() => {
      ring.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, {
            duration: 4000,
          }),
          -1,
          false
        )
      );
    }, []);
    return <Animated.View style={[styles.ring, ringStyle]} />;
  };
  
  export default function AnimatedRing({
    isRecording=false
  }) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Ring delay={0} />
        <Ring delay={1000} />
        <Ring delay={2000} />
        <Ring delay={3000} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    ring: {
      position: "absolute",
      width: 80,
      height: 80,
      borderRadius: 40,
      borderColor: "tomato",
      borderWidth: 10,
    },
  });