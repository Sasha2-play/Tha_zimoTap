import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const channels = [
  {
    id: 1,
    name: 'Gaming Channel',
    reward: 1000,
    subscribers: '100K',
  },
  {
    id: 2,
    name: 'Tech Reviews',
    reward: 2000,
    subscribers: '250K',
  },
  {
    id: 3,
    name: 'Daily Vlogs',
    reward: 5000,
    subscribers: '500K',
  },
  {
    id: 4,
    name: 'Tutorial Master',
    reward: 10000,
    subscribers: '1M',
  },
];

export default function ChannelsScreen() {
  return (
    <LinearGradient
      colors={['#1a1a1a', '#2a2a2a']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        {channels.map((channel) => (
          <Pressable
            key={channel.id}
            style={({ pressed }) => [
              styles.channelCard,
              pressed && styles.channelCardPressed
            ]}
          >
            <LinearGradient
              colors={['#2d2d2d', '#1f1f1f']}
              style={styles.channelGradient}
            >
              <View style={styles.channelInfo}>
                <Text style={styles.channelName}>{channel.name}</Text>
                <Text style={styles.subscriberCount}>
                  <Ionicons name="people" size={16} color="#888" /> {channel.subscribers}
                </Text>
              </View>
              <View style={styles.rewardContainer}>
                <Text style={styles.rewardText}>
                  Reward: {channel.reward}
                  <Ionicons name="coin" size={16} color="#ffd700" />
                </Text>
                <Pressable style={styles.subscribeButton}>
                  <Text style={styles.subscribeText}>Subscribe</Text>
                </Pressable>
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  channelCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  channelGradient: {
    padding: 16,
  },
  channelCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  channelInfo: {
    marginBottom: 12,
  },
  channelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subscriberCount: {
    fontSize: 14,
    color: '#888',
  },
  rewardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardText: {
    color: '#ffd700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subscribeButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscribeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});