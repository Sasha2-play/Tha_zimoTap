import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClickerScreen() {
  const [coins, setCoins] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  useEffect(() => {
    loadCoins();
    const interval = setInterval(loadCoins, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadCoins = async () => {
    try {
      const savedCoins = await AsyncStorage.getItem('coins');
      if (savedCoins) {
        setCoins(parseFloat(savedCoins));
      }
    } catch (error) {
      console.error('Error loading coins:', error);
    }
  };

  const saveCoins = async (amount: number) => {
    try {
      await AsyncStorage.setItem('coins', amount.toString());
    } catch (error) {
      console.error('Error saving coins:', error);
    }
  };

  const handleTap = () => {
    const tapReward = 0.1 * multiplier;
    const newCoins = parseFloat((coins + tapReward).toFixed(1));
    setCoins(newCoins);
    saveCoins(newCoins);
  };

  return (
    <LinearGradient
      colors={['#0a0a2e', '#1a1a4f']}
      style={styles.container}
    >
      <View style={styles.starsContainer}>
        {[...Array(50)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.star,
              {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
              },
            ]}
          />
        ))}
      </View>
      
      <Text style={styles.coinsText}>{coins.toFixed(1)} Coins</Text>
      
      <Pressable
        onPress={handleTap}
        style={({ pressed }) => [
          styles.tapButton,
          pressed && styles.tapButtonPressed
        ]}
      >
        <LinearGradient
          colors={['#4a00ff', '#00ffff']}
          style={styles.buttonGradient}
        >
          <Ionicons name="planet" size={64} color="#fff" />
        </LinearGradient>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starsContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  coinsText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  tapButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  buttonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
});