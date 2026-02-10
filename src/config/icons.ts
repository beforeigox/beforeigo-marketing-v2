// Custom icons configuration
export const customIcons = {
  beautifulPresentation: "/Screenshot 2025-06-24 at 2.48.48 AM.png",
  // Add more custom icons here as you upload them
  // example: "/path-to-your-icon.png"
};

// Icon mappings for different features
export const featureIcons = {
  guidedStorytelling: 'sparkles', // Lucide icon
  securePrivate: 'shield', // Lucide icon  
  beautifulPresentation: 'custom', // Custom icon
};

export const getCustomIcon = (iconName: keyof typeof customIcons) => {
  return customIcons[iconName];
};