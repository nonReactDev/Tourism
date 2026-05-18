import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useState, useRef, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Star, Clock, X, Navigation, Layers } from 'lucide-react-native';
import { places, Place, PlaceCategory, categoryColors, categoryIcons } from '@/app/data/places';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CATEGORIES: { value: PlaceCategory; label: string }[] = [
  { value: 'restaurants', label: 'Eat' },
  { value: 'beaches', label: 'Beach' },
  { value: 'museums', label: 'Culture' },
  { value: 'nightlife', label: 'Night' },
  { value: 'nature', label: 'Nature' },
  { value: 'shopping', label: 'Shop' },
  { value: 'cafes', label: 'Cafe' },
];

function MapMarker({
  place,
  onPress,
  isSelected,
}: {
  place: Place;
  onPress: () => void;
  isSelected: boolean;
}) {
  const scale = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      delay: Math.random() * 300,
      useNativeDriver: true,
      tension: 200,
      friction: 8,
    }).start();
  }, []);

  useEffect(() => {
    if (isSelected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.3, duration: 600, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulse.setValue(1);
    }
  }, [isSelected]);

  const x = ((place.lng + 116.72) / 0.15) * (SCREEN_WIDTH - 80);
  const y = ((place.lat - 31.7) / 0.3) * (SCREEN_HEIGHT * 0.38);

  return (
    <Animated.View
      style={[
        styles.markerContainer,
        { left: x + 20, top: y + 10, transform: [{ scale }] },
      ]}
    >
      {isSelected && (
        <Animated.View
          style={[
            styles.markerPulse,
            {
              backgroundColor: categoryColors[place.category] + '40',
              transform: [{ scale: pulse }],
            },
          ]}
        />
      )}
      <TouchableOpacity
        style={[
          styles.marker,
          { backgroundColor: categoryColors[place.category] },
          isSelected && styles.markerSelected,
        ]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={styles.markerEmoji}>{categoryIcons[place.category]}</Text>
      </TouchableOpacity>
      {isSelected && (
        <View style={[styles.markerLabel, { borderColor: categoryColors[place.category] }]}>
          <Text style={styles.markerLabelText} numberOfLines={1}>{place.name}</Text>
        </View>
      )}
    </Animated.View>
  );
}

function SkeletonCard() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.skeleton, { opacity }]}>
      <View style={styles.skeletonImg} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonLine} />
        <View style={[styles.skeletonLine, { width: '60%' }]} />
      </View>
    </Animated.View>
  );
}

function PlaceDetailSheet({
  place,
  visible,
  onClose,
}: {
  place: Place | null;
  visible: boolean;
  onClose: () => void;
}) {
  const translateY = useRef(new Animated.Value(400)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, tension: 200, friction: 20 }),
        Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 400, duration: 280, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!place) return null;

  return (
    <>
      <Animated.View style={[styles.sheetOverlay, { opacity }]} pointerEvents={visible ? 'auto' : 'none'}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
      </Animated.View>
      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHeader}>
          <Image source={{ uri: place.image }} style={styles.sheetImage} />
          <TouchableOpacity style={styles.sheetClose} onPress={onClose}>
            <X size={18} color="#666" />
          </TouchableOpacity>
          {place.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
          {place.isPopular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularBadgeText}>Popular</Text>
            </View>
          )}
        </View>

        <View style={styles.sheetBody}>
          <View style={styles.sheetTitleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sheetName}>{place.name}</Text>
              <View style={styles.sheetRatingRow}>
                <Star size={14} color="#FFB800" fill="#FFB800" />
                <Text style={styles.sheetRating}>{place.rating}</Text>
                <View
                  style={[
                    styles.catBadge,
                    { backgroundColor: categoryColors[place.category] + '20' },
                  ]}
                >
                  <Text style={styles.catBadgeText}>
                    {categoryIcons[place.category]} {place.category}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.sheetDesc}>{place.description}</Text>

          <View style={styles.sheetInfoRow}>
            <MapPin size={14} color="#4A90D9" />
            <Text style={styles.sheetInfoText}>{place.address}</Text>
          </View>
          {place.hours && (
            <View style={styles.sheetInfoRow}>
              <Clock size={14} color="#4A90D9" />
              <Text style={styles.sheetInfoText}>{place.hours}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.sheetBtn}>
            <Navigation size={16} color="#FFFFFF" />
            <Text style={styles.sheetBtnText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

export default function MapScreen() {
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newPlaceIds, setNewPlaceIds] = useState<Set<string>>(new Set());
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);

    Animated.timing(headerAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();

    const interval = setInterval(() => {
      const randomPlace = places[Math.floor(Math.random() * places.length)];
      setNewPlaceIds(prev => new Set([...prev, randomPlace.id]));
      setTimeout(() => {
        setNewPlaceIds(prev => {
          const next = new Set(prev);
          next.delete(randomPlace.id);
          return next;
        });
      }, 3000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredPlaces = selectedCategory
    ? places.filter(p => p.category === selectedCategory)
    : places;

  const handleMarkerPress = useCallback((place: Place) => {
    setSelectedPlace(place);
    setSheetVisible(true);
  }, []);

  const handleCategorySelect = (cat: PlaceCategory | null) => {
    setSelectedCategory(cat);
    if (sheetVisible) {
      setSheetVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerAnim,
            transform: [{ translateY: headerAnim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }],
          },
        ]}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>Ensenada</Text>
              <Text style={styles.headerSubtitle}>Explore the city</Text>
            </View>
            <TouchableOpacity style={styles.layersBtn}>
              <Layers size={20} color="#4A90D9" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>

      <View style={styles.mapArea}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg' }}
          style={styles.mapBg}
          blurRadius={1}
        />
        <View style={styles.mapOverlay} />

        <View style={styles.waterLabel}>
          <Text style={styles.waterLabelText}>Pacific Ocean</Text>
        </View>
        <View style={styles.cityLabel}>
          <Text style={styles.cityLabelText}>Ensenada, B.C.</Text>
        </View>

        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          filteredPlaces.map(place => (
            <MapMarker
              key={place.id}
              place={place}
              onPress={() => handleMarkerPress(place)}
              isSelected={selectedPlace?.id === place.id}
            />
          ))
        )}

        {newPlaceIds.size > 0 && (
          <Animated.View style={styles.liveChip}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>New place spotted!</Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.filterBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          <TouchableOpacity
            style={[styles.filterChip, !selectedCategory && styles.filterChipActive]}
            onPress={() => handleCategorySelect(null)}
          >
            <Text style={[styles.filterChipText, !selectedCategory && styles.filterChipTextActive]}>All</Text>
          </TouchableOpacity>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.value}
              style={[
                styles.filterChip,
                selectedCategory === cat.value && styles.filterChipActive,
                selectedCategory === cat.value && { backgroundColor: categoryColors[cat.value] },
              ]}
              onPress={() => handleCategorySelect(cat.value)}
            >
              <Text style={styles.filterEmoji}>{categoryIcons[cat.value]}</Text>
              <Text
                style={[
                  styles.filterChipText,
                  selectedCategory === cat.value && styles.filterChipTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.placeList}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.placeListContent}
        >
          {filteredPlaces.map((place, i) => (
            <PlaceListCard
              key={place.id}
              place={place}
              index={i}
              onPress={() => handleMarkerPress(place)}
            />
          ))}
        </ScrollView>
      </View>

      <PlaceDetailSheet
        place={selectedPlace}
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
      />
    </View>
  );
}

function PlaceListCard({
  place,
  index,
  onPress,
}: {
  place: Place;
  index: number;
  onPress: () => void;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      delay: index * 80,
      useNativeDriver: true,
      tension: 180,
      friction: 12,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }],
      }}
    >
      <TouchableOpacity style={styles.placeCard} onPress={onPress} activeOpacity={0.88}>
        <Image source={{ uri: place.image }} style={styles.placeCardImg} />
        <View style={styles.placeCardOverlay} />
        <View style={styles.placeCardContent}>
          <Text style={styles.placeCardName} numberOfLines={1}>{place.name}</Text>
          <View style={styles.placeCardMeta}>
            <Star size={11} color="#FFB800" fill="#FFB800" />
            <Text style={styles.placeCardRating}>{place.rating}</Text>
          </View>
        </View>
        {place.isNew && (
          <View style={styles.placeCardNewBadge}>
            <Text style={styles.placeCardNewBadgeText}>NEW</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 12,
    zIndex: 10,
    shadowColor: '#1A4B7A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A3A5C',
    fontFamily: 'Poppins-Bold',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#7BAED4',
    fontFamily: 'Inter-Regular',
    marginTop: 1,
  },
  layersBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  mapBg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(224, 240, 255, 0.55)',
  },
  waterLabel: {
    position: 'absolute',
    bottom: 80,
    left: 20,
  },
  waterLabelText: {
    fontSize: 11,
    color: 'rgba(74, 144, 217, 0.7)',
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
  },
  cityLabel: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  cityLabelText: {
    fontSize: 11,
    color: '#1A3A5C',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerPulse: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  marker: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 6,
  },
  markerSelected: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
  },
  markerEmoji: {
    fontSize: 18,
  },
  markerLabel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginTop: 4,
    borderWidth: 1.5,
    maxWidth: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  markerLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1A3A5C',
    fontFamily: 'Inter-Bold',
  },
  liveChip: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A3A5C',
    fontFamily: 'Inter-SemiBold',
  },
  skeleton: {
    position: 'absolute',
    top: '30%',
    left: '30%',
    width: 120,
    height: 80,
    backgroundColor: '#C8DFF5',
    borderRadius: 12,
  },
  skeletonImg: {
    width: '100%',
    height: 48,
    backgroundColor: '#B0CDE8',
    borderRadius: 8,
  },
  skeletonContent: {
    padding: 8,
    gap: 6,
  },
  skeletonLine: {
    height: 8,
    backgroundColor: '#B0CDE8',
    borderRadius: 4,
    width: '80%',
  },
  filterBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEF4FB',
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#EEF6FF',
    borderWidth: 1.5,
    borderColor: '#D4E8F7',
    gap: 5,
  },
  filterChipActive: {
    backgroundColor: '#4A90D9',
    borderColor: '#4A90D9',
  },
  filterEmoji: {
    fontSize: 14,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A90D9',
    fontFamily: 'Inter-SemiBold',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  placeList: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEF4FB',
  },
  placeListContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  placeCard: {
    width: 110,
    height: 90,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#1A4B7A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  placeCardImg: {
    width: '100%',
    height: '100%',
  },
  placeCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  placeCardContent: {
    position: 'absolute',
    bottom: 6,
    left: 7,
    right: 7,
  },
  placeCardName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  placeCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  placeCardRating: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFB800',
    fontFamily: 'Inter-SemiBold',
  },
  placeCardNewBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#22C55E',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  placeCardNewBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  sheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 20,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    zIndex: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 20,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D4E8F7',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  sheetHeader: {
    position: 'relative',
  },
  sheetImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  sheetClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#22C55E',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6B6B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  popularBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  sheetBody: {
    padding: 18,
    gap: 10,
  },
  sheetTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sheetName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A3A5C',
    fontFamily: 'Poppins-Bold',
    marginBottom: 6,
  },
  sheetRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sheetRating: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFB800',
    fontFamily: 'Inter-Bold',
  },
  catBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  catBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1A3A5C',
    textTransform: 'capitalize',
    fontFamily: 'Inter-SemiBold',
  },
  sheetDesc: {
    fontSize: 14,
    color: '#5A7A99',
    lineHeight: 21,
    fontFamily: 'Inter-Regular',
  },
  sheetInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sheetInfoText: {
    fontSize: 13,
    color: '#1A3A5C',
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  sheetBtn: {
    backgroundColor: '#4A90D9',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    shadowColor: '#4A90D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  sheetBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
});
