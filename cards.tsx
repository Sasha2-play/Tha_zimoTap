import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const cardCategories = [
  {
    id: 'basic',
    name: 'Basic Planets',
    cards: [
      { id: 1, name: 'Mercury Miner', cost: 1, reward: 10, icon: 'planet' },
      { id: 2, name: 'Venus Extractor', cost: 5, reward: 60, icon: 'planet' },
      { id: 3, name: 'Mars Colony', cost: 25, reward: 350, icon: 'planet' },
    ]
  },
  {
    id: 'nebula',
    name: 'Nebula Systems',
    cards: [
      { id: 4, name: 'Orion Station', cost: 100, reward: 1500, icon: 'telescope' },
      { id: 5, name: 'Crab Harvester', cost: 500, reward: 8000, icon: 'telescope' },
    ]
  },
  {
    id: 'galaxy',
    name: 'Galaxy Core',
    cards: [
      { id: 6, name: 'Black Hole Tap', cost: 2500, reward: 45000, icon: 'nuclear' },
      { id: 7, name: 'Quantum Field', cost: 10000, reward: 200000, icon: 'nuclear' },
    ]
  }
];

export default function CardsScreen() {
  const [selectedCategory, setSelectedCategory] = useState(cardCategories[0].id);

  return (
    <LinearGradient
      colors={['#0a0a2e', '#1a1a4f']}
      style={styles.container}
    >
      <ScrollView horizontal style={styles.categoryScroll} showsHorizontalScrollIndicator={false}>
        {cardCategories.map((category) => (
          <Pressable
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.categoryTabActive
            ]}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.categoryTextActive
            ]}>
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView style={styles.cardsScroll}>
        {cardCategories
          .find(c => c.id === selectedCategory)
          ?.cards.map((card) => (
            <Pressable
              key={card.id}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed
              ]}
            >
              <LinearGradient
                colors={['#4a00ff', '#00ffff']}
                style={styles.cardGradient}
              >
                <View style={styles.cardHeader}>
                  <Ionicons name={card.icon} size={32} color="#fff" />
                  <Text style={styles.cardName}>{card.name}</Text>
                </View>
                
                <View style={styles.rewardContainer}>
                  <Text style={styles.rewardText}>
                    {card.reward} coins / 10min
                  </Text>
                </View>

                <View style={styles.costContainer}>
                  <Text style={styles.costText}>{card.cost}</Text>
                  <Ionicons name="diamond" size={16} color="#fff" />
                </View>
              </LinearGradient>
            </Pressable>
          ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryScroll: {
    padding: 16,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a4f',
  },
  categoryTabActive: {
    backgroundColor: '#00ffff',
  },
  categoryText: {
    color: '#888',
    fontWeight: 'bold',
  },
  categoryTextActive: {
    color: '#0a0a2e',
  },
  cardsScroll: {
    flex: 1,
    padding: 16,
  },
  card: {
    height: 160,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  rewardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  rewardText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  costText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 4,
  },
});