import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Heart, Copy } from 'lucide-react-native';
import { useRef } from 'react';
import { Phrase } from '@/app/data/translations';

interface PhraseCardProps {
  phrase: Phrase;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopy: (text: string) => void;
}

export function PhraseCard({ phrase, isFavorite, onToggleFavorite, onCopy }: PhraseCardProps) {
  const heartScale = useRef(new Animated.Value(1)).current;

  const handleFavoritePress = () => {
    Animated.sequence([
      Animated.spring(heartScale, { toValue: 1.3, useNativeDriver: true }),
      Animated.spring(heartScale, { toValue: 1, useNativeDriver: true }),
    ]).start();
    onToggleFavorite(phrase.id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.main}>
          <Text style={styles.english}>{phrase.english}</Text>
          <Text style={styles.spanish}>{phrase.spanish}</Text>
          {phrase.pronunciation && (
            <Text style={styles.pronunciation}>/{phrase.pronunciation}/</Text>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onCopy(phrase.spanish)}
          activeOpacity={0.7}
        >
          <Copy size={18} color="#4A90D9" />
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: heartScale }] }}>
          <TouchableOpacity
            style={[styles.actionBtn, isFavorite && styles.actionBtnActive]}
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <Heart
              size={18}
              color={isFavorite ? '#FF6B6B' : '#CCC'}
              fill={isFavorite ? '#FF6B6B' : 'none'}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  main: {
    gap: 4,
  },
  english: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  spanish: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4A90D9',
  },
  pronunciation: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 12,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnActive: {
    backgroundColor: '#FFE8E8',
  },
});
