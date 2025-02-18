import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const boosters = [
  {
    id: 1,
    name: 'Cosmic Multiplier',
    description: 'Doubles your tap reward',
    cost: 1000,
    icon: 'rocket',
    locked: true,
  },
  {
    id: 2,
    name: 'Nebula Boost',
    description: 'Triples all rewards for 1 hour',
    cost: 2500,
    icon: 'planet',
    locked: true,
  },
  {
    id: 3,
    name: 'Black Hole Power',
    description: '5x rewards for 30 minutes',
    cost: 5000,
    icon: 'nuclear',
    locked: true,
  },
];

export default function BoostersScreen() {
  return (
    <LinearGradient
      colors={['#0a0a2e', '#1a1a4f']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <Text style={styles.lockedMessage}>
          Boosters are available after donation
        </Text>
        {boosters.map((booster) => (
          <Pressable
            key={booster.id}
            style={({ pressed }) => [
              styles.boosterCard,
              pressed && styles.boosterCardPressed,
              booster.locked && styles.lockedCard
            ]}
          >
            <LinearGradient
              colors={['#2d2d5d', '#1f1f4f']}
              style={styles.boosterGradient}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={booster.icon} size={32} color="#00ffff" />
              </View>
              <View style={styles.boosterInfo}>
                <Text style={styles.boosterName}>{booster.name}</Text>
                <Text style={styles.boosterDescription}>{booster.description}</Text>
              </View>
              <View style={styles.costContainer}>
                <Text style={styles.costText}>{booster.cost}</Text>
                <Ionicons name="diamond" size={16} color="#00ffff" />
              </View>
              {booster.locked && (
                <View style={styles.lockedOverlay}>
                  <Ionicons name="lock-closed" size={24} color="#fff" />
                </View>
              )}
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  lockedMessage: {
    color: '#00ffff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  boosterCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  boosterGradient: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  boosterCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  lockedCard: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1a1a4f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boosterInfo: {
    flex: 1,
    marginLeft: 16,
  },
  boosterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  boosterDescription: {
    fontSize: 14,
    color: '#888',
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a4f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  costText: {
    color: '#00ffff',
    fontWeight: 'bold',
    marginRight: 4,
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});