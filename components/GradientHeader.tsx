import { View, StyleSheet, Animated, Text } from 'react-native';
import LinearGradient from 'expo-linear-gradient';

interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  scrollY?: Animated.Value;
  colors?: string[];
}

export function GradientHeader({
  title,
  subtitle,
  scrollY,
  colors = ['#4A90D9', '#2E5C8A'],
}: GradientHeaderProps) {
  const headerHeight = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [120, 70],
        extrapolate: 'clamp',
      })
    : new Animated.Value(120);

  const titleOpacity = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [1, 0.5],
        extrapolate: 'clamp',
      })
    : new Animated.Value(1);

  return (
    <Animated.View style={[styles.container, { height: headerHeight }]}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>{title}</Animated.Text>
        {subtitle && <Animated.Text style={[styles.subtitle, { opacity: titleOpacity }]}>{subtitle}</Animated.Text>}
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
});
