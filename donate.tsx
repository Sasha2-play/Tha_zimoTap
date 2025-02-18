import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { styles } from '@/src/App';

export default function DonateScreen() {
  const [copied, setCopied] = useState(false);
  const walletAddress = 'UQARJUg2Ewvs60wvRCXkLjqMPN24AjUpJtitjR8R9VQ_E80p';
  const donationAmount = 0.1;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LinearGradient
      colors={['#0a0a2e', '#1a1a4f']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="diamond" size={64} color="#00ffff" />
        </View>
        
        <Text style={styles.title}>Support the Game</Text>
        <Text style={styles.description}>
          Donate {donationAmount} TON to unlock boosters and support development!
        </Text>

        <Pressable
          onPress={copyToClipboard}
          style={({ pressed }) => [
            styles.walletCard,
            pressed && styles.walletCardPressed
          ]}
        >
          <LinearGradient
            colors={['#2d2d5d', '#1f1f4f']}
            style={styles.walletGradient}
          >
            <Text style={styles.walletLabel}>TON Wallet Address:</Text>
            <Text style={styles.walletAddress}>{walletAddress}</Text>
            <View style={styles.copyButton}>
              <Ionicons
                name={copied ? "checkmark" : "copy"}
                size={24}
                color={copied ? "#4CAF50" : "#00ffff"}
              />
            </View>
          </LinearGradient>
        </Pressable>

        <Text style={styles.rewardNote}>
          * After donation, boosters will be unlocked automatically
        </Text>
      </View>
    </LinearGradient>
  );
}

tg.ready();
});
export function openTonPayment(): void {
  throw new Error('Function not implemented.');
}

