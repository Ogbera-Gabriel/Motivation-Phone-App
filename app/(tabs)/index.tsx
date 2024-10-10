import React, { useRef } from 'react';
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
          <ThemedText type="link" onPress={fetchQuoteAndImage}> {/*  change name of hook */}
            Get New Quote
          </ThemedText>
          <TouchableOpacity onPress={() => {}} style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#007AFF" />
            <ThemedText type="link" style={styles.shareButtonText}>
              Share
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
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
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
