import React, { useRef, useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
//import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { HelloWave } from '@/components/HelloWave';
import { useQuoteFetch } from '@/hooks/useQuoteFetch';
import { ShareableContent } from '@/components/ShareableQuotes';

export default function HomeScreen() {
  const { quote, fetchQuoteAndImage } = useQuoteFetch();
  const imageUrl = require('@/assets/images/sunflower.jpg');
  const viewShotRef = useRef<ViewShot>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // const handleShare = async () => {
  //   if (viewShotRef.current && viewShotRef.current.capture) {
  //     try {
  //       const uri = await viewShotRef.current.capture();
  //       if (uri) {
  //         const shareOptions = {
  //           title: 'Share Quote',
  //           message: quote,
  //           url: uri,
  //           type: 'image/png',
  //         };
  //         await Share.open(shareOptions);
  //       }
  //     } catch (error) {
  //       console.error('Error sharing:', error);
  //     }
  //   } else {
  //     console.warn('ViewShot reference is null or undefined');
  //   }
  // };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={310}
          name="chatbubble-ellipses"
          style={styles.headerIcon}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.welcomeContainer}>
          <HelloWave />
          <ThemedText type="title">Daily Inspiration</ThemedText>
        </ThemedView>

        <ThemedView style={styles.viewShotContainer}>
          <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
            <ShareableContent quote={quote} imageUrl={imageUrl} />
          </ViewShot>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity onPress={fetchQuoteAndImage} style={styles.button}>
            <Ionicons name="refresh-outline" size={18} color="#FFFFFF" />
            <ThemedText style={styles.buttonText}>New</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Ionicons name="share-outline" size={18} color="#FFFFFF" />
            <ThemedText style={styles.buttonText}>Share</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setIsFavorite(!isFavorite)} 
            style={[styles.button, isFavorite && styles.favoriteButton]}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={18} 
              color="#FFFFFF" 
            />
            <ThemedText style={styles.buttonText}>
              {isFavorite ? 'Liked' : 'Like'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    alignSelf: 'flex-start',
  },
  viewShotContainer: {
    marginTop: 10,
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50, // Increased space between image and buttons
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 50, // Added top margin to the button container
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1DA1F2', // Twitter blue
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 9999, // Very high value for pill shape
    minWidth: 80,
    flex: 1, // Allow buttons to grow
    marginHorizontal: 5, // Add horizontal margin for gaps
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  favoriteButton: {
    backgroundColor: '#E0245E', // Twitter's like button color
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  shareButtonText: {
    marginLeft: 5,
  },
});
