import React, { createContext, useContext, useEffect, useState } from 'react';
import Helios3 from '../images/helios 3 mascot 32.jpeg'; 
import Helios6 from '../images/helios 6 mascot 32.jpeg';
import Helios7 from '../images/helios 7 mascot 32.jpeg';
import HeliosWarrior from '../images/Helios Warrior.svg';

// Create a context to store the preloaded images
const PreloadedImagesContext = createContext<string[]>([]);

interface PreloaderProviderProps {
  children: React.ReactNode;
}

export const PreloaderProvider: React.FC<PreloaderProviderProps> = ({ children }) => {
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);

  useEffect(() => {
    const imagesToPreload = [Helios3, Helios6, Helios7, HeliosWarrior];  // Use imported image paths

    const preloadImages = async () => {
      const promises = imagesToPreload.map((image) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = image;
          img.onload = () => resolve();
          img.onerror = () => resolve();  // Resolve on error to avoid hanging
        })
      );
      await Promise.all(promises);  // Wait until all images are preloaded
      setPreloadedImages(imagesToPreload);  // Store preloaded images in state
    };

    preloadImages();
  }, []);

  return (
    <PreloadedImagesContext.Provider value={preloadedImages}>
      {children}  {/* Render children after images are preloaded */}
    </PreloadedImagesContext.Provider>
  );
};

// Custom hook to access preloaded images
export const usePreloadedImages = () => useContext(PreloadedImagesContext);
