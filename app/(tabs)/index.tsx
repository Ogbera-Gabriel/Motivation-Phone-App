import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { HelloWave } from '@/components/HelloWave';

export default function HomeScreen() {
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote({ text: data.content, author: data.author });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({ text: 'Failed to fetch quote', author: 'Error' });
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="chatbubble-ellipses" style={styles.headerImage} />}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.welcomeContainer}>
          <HelloWave />
          <ThemedText type="title">Daily Inspiration</ThemedText>
        </ThemedView>

        <ThemedView style={styles.quoteContainer}>
          <ThemedText type="defaultSemiBold" style={styles.quoteText}>
            "{quote.text}"
          </ThemedText>
          <ThemedText style={styles.authorText}>- {quote.author}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <ThemedText type="link" onPress={fetchRandomQuote}>
            Get New Quote
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quoteContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  authorText: {
    textAlign: 'right',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
