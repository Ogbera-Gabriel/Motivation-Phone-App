import React from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';

interface ShareableContentProps {
  quote: string;
  imageUrl: string | number;
}

export const ShareableContent: React.FC<ShareableContentProps> = ({ quote, imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {typeof imageUrl === 'string' ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Image source={imageUrl} style={styles.image} />
        )}
        <View style={styles.quoteOverlay}>
          <ThemedText style={styles.quoteText}>{quote}</ThemedText>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    width: width - 40, // Full width minus padding
    aspectRatio: 1, // Square aspect ratio
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  quoteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  quoteText: {
    fontFamily: 'Georgia',
    fontSize: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'white', // Ensure text is visible on the image
  },
 
});