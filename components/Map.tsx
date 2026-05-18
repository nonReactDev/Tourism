import { View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { places, PlaceCategory, categoryColors, categoryIcons } from '@/app/data/places';

interface MapProps {
  onMarkerPress: (placeId: string) => void;
  selectedCategory: PlaceCategory | null;
}

export function Map({ onMarkerPress, selectedCategory }: MapProps) {
  const animScale = useRef(new Animated.Value(1)).current;
  const [newPlaces, setNewPlaces] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPlace = places[Math.floor(Math.random() * places.length)];
      if (!newPlaces.includes(randomPlace.id)) {
        setNewPlaces(prev => [...prev, randomPlace.id]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [newPlaces]);

  const filteredPlaces = selectedCategory
    ? places.filter(p => p.category === selectedCategory)
    : places;

  const handleMarkerPress = (placeId: string) => {
    Animated.sequence([
      Animated.timing(animScale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(animScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    onMarkerPress(placeId);
  };

  return (
    <View style={styles.mapContainer}>
      <View style={styles.map}>
        <View style={styles.mapBg} />

        {filteredPlaces.map(place => {
          const x = (place.lng + 116.7) * 400;
          const y = (place.lat - 31.7) * 500;
          const isNew = newPlaces.includes(place.id);

          return (
            <Animated.View
              key={place.id}
              style={[
                styles.marker,
                {
                  left: x,
                  top: y,
                  transform: [{ scale: animScale }],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.markerDot,
                  {
                    backgroundColor: categoryColors[place.category],
                  },
                ]}
                onPress={() => handleMarkerPress(place.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.markerIcon}>{categoryIcons[place.category]}</Text>
              </TouchableOpacity>
              {isNew && <View style={styles.newIndicator} />}
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F0F7FF',
  },
  map: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#E8F1FF',
  },
  mapBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E8F1FF',
  },
  marker: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -25,
    marginTop: -25,
  },
  markerDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  markerIcon: {
    fontSize: 20,
  },
  newIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B6B',
    right: -6,
    top: -6,
  },
});
