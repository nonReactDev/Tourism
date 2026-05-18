import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { PlaceCategory, categoryIcons, categoryColors } from '@/app/data/places';

interface CategoryFilterProps {
  selected: PlaceCategory | null;
  onSelect: (category: PlaceCategory | null) => void;
}

const categories: { value: PlaceCategory; label: string }[] = [
  { value: 'restaurants', label: 'Restaurants' },
  { value: 'beaches', label: 'Beaches' },
  { value: 'museums', label: 'Museums' },
  { value: 'nightlife', label: 'Nightlife' },
  { value: 'nature', label: 'Nature' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'cafes', label: 'Cafes' },
];

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity
        style={[styles.filterBtn, !selected && styles.filterBtnActive]}
        onPress={() => onSelect(null)}
      >
        <Text style={[styles.filterText, !selected && styles.filterTextActive]}>All</Text>
      </TouchableOpacity>

      {categories.map(cat => (
        <TouchableOpacity
          key={cat.value}
          style={[styles.filterBtn, selected === cat.value && styles.filterBtnActive]}
          onPress={() => onSelect(cat.value)}
        >
          <Text style={styles.icon}>{categoryIcons[cat.value]}</Text>
          <Text style={[styles.filterText, selected === cat.value && styles.filterTextActive]}>
            {cat.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    marginHorizontal: 16,
  },
  content: {
    gap: 8,
    paddingRight: 16,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#F0F7FF',
    borderWidth: 1,
    borderColor: '#D4E6FF',
    gap: 6,
  },
  filterBtnActive: {
    backgroundColor: '#4A90D9',
    borderColor: '#4A90D9',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A90D9',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  icon: {
    fontSize: 16,
  },
});
