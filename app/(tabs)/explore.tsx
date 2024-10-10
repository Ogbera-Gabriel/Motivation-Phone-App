import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [selectedImage, setSelectedImage] = useState('https://via.placeholder.com/200x200?text=Selected+Image');

  const images = [
    'https://via.placeholder.com/100x100?text=Image+1',
    'https://via.placeholder.com/100x100?text=Image+2',
    'https://via.placeholder.com/100x100?text=Image+3',
  ];

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Explore</ThemedText>
      
      <ThemedText type="subtitle" style={styles.sectionTitle}>Choose Your Images</ThemedText>
      <ThemedText style={styles.explanationText}>
        Tap on an image below to select it for your profile. You can choose up to three images.
      </ThemedText>
      
      <ThemedView style={styles.imageContainer}>
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageSelect(image)}>
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ThemedView>
      
      <ThemedText style={styles.explanationText}>
        Your selected image will appear here:
      </ThemedText>
      <Image 
        source={{ uri: selectedImage }} 
        style={styles.selectedImage} 
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});

