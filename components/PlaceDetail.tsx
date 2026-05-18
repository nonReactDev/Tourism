import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Star, MapPin, Clock, Share2 } from 'lucide-react-native';
import { Place } from '@/app/data/places';

interface PlaceDetailProps {
  place: Place;
}

export function PlaceDetail({ place }: PlaceDetailProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: place.image }} style={styles.image} />

      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.titleCol}>
            <Text style={styles.name}>{place.name}</Text>
            <View style={styles.ratingRow}>
              <Star size={16} color="#FFB800" fill="#FFB800" />
              <Text style={styles.rating}>{place.rating}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.shareBtn}>
            <Share2 size={20} color="#4A90D9" />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{place.description}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <MapPin size={18} color="#4A90D9" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{place.address}</Text>
          </View>
        </View>

        {place.hours && (
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Clock size={18} color="#4A90D9" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Hours</Text>
              <Text style={styles.infoValue}>{place.hours}</Text>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionBtnText}>View on Maps</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtnSecondary}>
        <Text style={styles.actionBtnSecondaryText}>Save for Later</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  header: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8F1FF',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleCol: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90D9',
  },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  section: {
    gap: 16,
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#E8F1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  actionBtn: {
    backgroundColor: '#4A90D9',
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionBtnSecondary: {
    backgroundColor: '#F0F7FF',
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4A90D9',
  },
  actionBtnSecondaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90D9',
  },
});
