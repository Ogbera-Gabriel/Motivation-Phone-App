import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useImageContext } from '@/hooks/imageContext';

export default function TabTwoScreen() {
  const { selectedImage, setSelectedImage } = useImageContext();

  const images = [
    require('@/assets/images/sunset.jpg'),
    require('@/assets/images/nature.jpg'),
    require('@/assets/images/river.jpg'),
    require('@/assets/images/storm.jpg'),
    require('@/assets/images/autumn.jpg'),
    require('@/assets/images/sunflower.jpg'),
  ];

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Explore</ThemedText>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Choose Your Images
        </ThemedText>
        <ThemedText style={styles.explanationText}>
          Tap on an image below to select it for your profile.
        </ThemedText>

        <ThemedView style={styles.imageContainer}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImageSelect(image)}
            >
              <ThemedView style={styles.imageWrapper}>
                <Image
                  source={typeof image === 'string' ? { uri: image } : image}
                  style={styles.image}
                />
                {selectedImage === image && (
                  <ThemedView style={styles.checkmarkOverlay}>
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                  </ThemedView>
                )}
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ThemedView>

        <ThemedText style={styles.explanationText}>
          Your selected image will appear on the home screen.
        </ThemedText>

        {selectedImage && (
          <ThemedView style={styles.selectedImageContainer}>
            <ThemedText style={styles.selectedImageText}>
              Selected Image:
            </ThemedText>
            <Image
              source={
                typeof selectedImage === 'string'
                  ? { uri: selectedImage }
                  : selectedImage
              }
              style={styles.selectedImage}
            />
          </ThemedView>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    marginTop: 60,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  explanationText: {
    textAlign: 'center',
    marginBottom: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: 20,
    paddingLeft: '15%', // Adjusted left padding to accommodate wider images
  },
  imageWrapper: {
    position: 'relative',
    width: '45%', // Increased width to make images wider
    aspectRatio: 3/4, // Maintained the taller aspect ratio
    margin: '2%', // Slightly reduced margin to maintain spacing
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  checkmarkOverlay: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 2,
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40, // Add some bottom margin for better scrolling
  },
  selectedImageText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
