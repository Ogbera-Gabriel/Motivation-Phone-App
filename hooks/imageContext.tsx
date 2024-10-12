import React, { createContext, useState, useContext } from 'react';

type ImageContextType = {
  selectedImage: string;
  setSelectedImage: (image: string) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(require('@/assets/images/sunflower.jpg'));

  return (
    <ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};