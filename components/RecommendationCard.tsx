import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Star, MapPin, TrendingUp } from 'lucide-react-native';
import { useRef } from 'react';
import { Recommendation } from '@/app/data/recommendations';

interface RecommendationCardProps {
  item: Recommendation;
  onPress: () => void;
}

export function RecommendationCard({ item, onPress }: RecommendationCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Image source={{ uri: item.image }} style={styles.image} />

        {item.isTrending && (
          <View style={styles.trendingBadge}>
            <TrendingUp size={12} color="#FFFFFF" />
            <Text style={styles.trendingText}>Trending</Text>
          </View>
        )}

        {!item.openNow && (
          <View style={styles.closedBadge}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleCol}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.type}>{item.type}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Star size={14} color="#FFB800" fill="#FFB800" />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.footer}>
            <View style={styles.distanceRow}>
              <MapPin size={12} color="#666" />
              <Text style={styles.distance}>{item.distance}</Text>
            </View>
            <Text style={styles.priceRange}>{item.priceRange}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#F0F7FF',
  },
  trendingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF6B6B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  closedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  closedText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    padding: 12,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleCol: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  type: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF8E1',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFB800',
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  priceRange: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A90D9',
  },
});
