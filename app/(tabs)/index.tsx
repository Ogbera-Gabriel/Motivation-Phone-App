import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { HelloWave } from '@/components/HelloWave';
import { useQuoteFetch } from '@/hooks/useQuoteFetch';

export default function HomeScreen() {
  const { quote, fetchQuoteAndImage, imageUrl } = useQuoteFetch();
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.headerImage} />
      ) : (
        <Ionicons size={310} name="chatbubble-ellipses" style={styles.headerIcon} />
      )}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.welcomeContainer}>
          <HelloWave />
          <ThemedText type="title">Daily Inspiration</ThemedText>
        </ThemedView>

        <ThemedView style={styles.quoteContainer}>
          <ThemedText type="defaultSemiBold" style={styles.quoteText}>
            {quote}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <ThemedText type="link" onPress={fetchQuoteAndImage}>
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
    width: '100%',
    height: 310,
    resizeMode: 'cover', // Makes sure the image covers the header space properly
  },
  headerIcon: {
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
