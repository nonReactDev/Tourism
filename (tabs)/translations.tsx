import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import LinearGradient from 'expo-linear-gradient';
import { Search, Heart, Copy, Languages } from 'lucide-react-native';
import { phrases, TranslationCategory, categoryMeta } from '@/app/data/translations';

function PhraseItem({
  phrase,
  isFavorite,
  onToggleFavorite,
  index,
}: {
  phrase: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  index: number;
}) {
  const heartScale = useRef(new Animated.Value(1)).current;
  const slideIn = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(slideIn, {
      toValue: 0,
      duration: 300,
      delay: index * 30,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const handleHeartPress = () => {
    Animated.sequence([
      Animated.spring(heartScale, {
        toValue: 1.3,
        useNativeDriver: true,
        tension: 200,
        friction: 8,
      }),
      Animated.spring(heartScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 200,
        friction: 8,
      }),
    ]).start();
    onToggleFavorite();
  };

  return (
    <Animated.View
      style={[
        styles.phraseItem,
        { transform: [{ translateX: slideIn }] },
      ]}
    >
      <View style={styles.phraseContent}>
        <Text style={styles.phraseEnglish}>{phrase.english}</Text>
        <Text style={styles.phraseSpanish}>{phrase.spanish}</Text>
        {phrase.pronunciation && (
          <Text style={styles.phrasePronunciation}>
            /{phrase.pronunciation}/
          </Text>
        )}
      </View>

      <View style={styles.phraseActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Copy size={16} color="#4A90D9" />
        </TouchableOpacity>
        <Animated.View style={{ transform: [{ scale: heartScale }] }}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              isFavorite && styles.actionButtonActive,
            ]}
            onPress={handleHeartPress}
          >
            <Heart
              size={16}
              color={isFavorite ? '#FF6B6B' : '#CCC'}
              fill={isFavorite ? '#FF6B6B' : 'none'}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

export default function TranslationsScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedCategory, setSelectedCategory] = useState<TranslationCategory>('greetings');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories: TranslationCategory[] = [
    'greetings',
    'food',
    'directions',
    'emergency',
    'shopping',
  ];

  const filteredPhrases = phrases.filter(p => {
    const matchesCategory = p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.spanish.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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

  const catMeta = categoryMeta[selectedCategory];

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
            colors={['#56AB2F', '#3D7A23']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
            <View style={styles.headerTitleRow}>
              <Languages size={24} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Phrases</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              Essential Spanish phrases
            </Text>
          </Animated.View>
        </Animated.View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map(cat => {
            const meta = categoryMeta[cat];
            const isActive = cat === selectedCategory;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  isActive && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={styles.categoryIcon}>{meta.icon}</Text>
                <Text
                  style={[
                    styles.categoryLabel,
                    isActive && styles.categoryLabelActive,
                  ]}
                >
                  {meta.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={18} color="#999" />
          <TextInput
            placeholder="Search phrases..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholderTextColor="#CCC"
          />
        </View>

        {/* Phrases List */}
        <View style={styles.phrasesSection}>
          {filteredPhrases.length > 0 ? (
            filteredPhrases.map((phrase, idx) => (
              <PhraseItem
                key={phrase.id}
                phrase={phrase}
                isFavorite={favorites.has(phrase.id)}
                onToggleFavorite={() => handleToggleFavorite(phrase.id)}
                index={idx}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyText}>No phrases found</Text>
              <Text style={styles.emptySubtext}>
                Try a different search or category
              </Text>
            </View>
          )}
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
  categoryScroll: {
    paddingVertical: 12,
  },
  categoryContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingRight: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0F7FF',
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: '#56AB2F',
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  categoryLabelActive: {
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1A1A1A',
  },
  phrasesSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  phraseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  phraseContent: {
    flex: 1,
    gap: 4,
  },
  phraseEnglish: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  phraseSpanish: {
    fontSize: 15,
    fontWeight: '700',
    color: '#56AB2F',
  },
  phrasePronunciation: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  phraseActions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 12,
  },
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonActive: {
    backgroundColor: '#FFE8E8',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
  spacer: {
    height: 20,
  },
});
