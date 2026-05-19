import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Animated,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import LinearGradient from 'expo-linear-gradient';
import { Sparkles, TrendingUp } from 'lucide-react-native';
import { recommendations, trendingItems, Recommendation } from '@/app/data/recommendations';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function TrendingCard({ item }: { item: Recommendation }) {
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.trendingCard,
        { transform: [{ scale }] },
      ]}
    >
      <LinearGradient
        colors={['#FF6B6B', '#E74C3C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.trendingGradient}
      >
        <View style={styles.trendingBadge}>
          <TrendingUp size={14} color="#FFFFFF" />
          <Text style={styles.trendingBadgeText}>TRENDING</Text>
        </View>
        <Text style={styles.trendingName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.trendingSource}>{item.trendSource}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

function RecommendationItem({ item, index }: { item: Recommendation; index: number }) {
  const slideIn = useRef(new Animated.Value(100)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideIn, {
        toValue: 0,
        duration: 400,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  return (
    <Animated.View
      style={[
        styles.recommendationItem,
        {
          transform: [{ translateX: slideIn }],
          opacity: fadeIn,
        },
      ]}
    >
      <View style={styles.recCard}>
        <View style={styles.recImageContainer}>
          <View style={styles.recImage} />
          {item.isTrending && (
            <View style={styles.trendingLabel}>
              <Text style={styles.trendingLabelText}>Trending</Text>
            </View>
          )}
          {!item.openNow && (
            <View style={styles.closedLabel}>
              <Text style={styles.closedLabelText}>Closed</Text>
            </View>
          )}
        </View>

        <View style={styles.recContent}>
          <View style={styles.recHeader}>
            <View style={styles.recTitleCol}>
              <Text style={styles.recName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.recType}>{item.type}</Text>
            </View>
            <View style={styles.recRating}>
              <Text style={styles.recRatingText}>⭐ {item.rating}</Text>
            </View>
          </View>

          <Text style={styles.recDesc} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.recFooter}>
            <Text style={styles.recDistance}>📍 {item.distance}</Text>
            <Text style={styles.recPrice}>{item.priceRange}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function RecommendationsScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [140, 70],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <LinearGradient
            colors={['#FF6B6B', '#E74C3C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
            <View style={styles.headerTitleRow}>
              <Sparkles size={24} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Discover</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              Best rated restaurants & experiences
            </Text>
          </Animated.View>
        </Animated.View>

        {/* Trending Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={18} color="#FF6B6B" />
            <Text style={styles.sectionTitle}>Trending Now</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
          >
            {trendingItems.map((item) => (
              <TrendingCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

        {/* All Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Recommendations</Text>

          {recommendations.map((item, index) => (
            <RecommendationItem key={item.id} item={item} index={index} />
          ))}
        </View>

        <View style={styles.spacer} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    overflow: 'hidden',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  trendingList: {
    gap: 12,
    paddingRight: 16,
  },
  trendingCard: {
    width: 150,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  trendingGradient: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    width: 'fit-content',
  },
  trendingBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  trendingName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  trendingSource: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  recommendationItem: {
    marginBottom: 12,
  },
  recCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  recImageContainer: {
    position: 'relative',
    height: 180,
    backgroundColor: '#F0F7FF',
  },
  recImage: {
    flex: 1,
    backgroundColor: '#E8F1FF',
  },
  trendingLabel: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trendingLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closedLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  closedLabelText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recContent: {
    padding: 12,
    gap: 8,
  },
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  recTitleCol: {
    flex: 1,
  },
  recName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  recType: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  recRating: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  recRatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFB800',
  },
  recDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  recFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recDistance: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  recPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A90D9',
  },
  spacer: {
    height: 20,
  },
});
