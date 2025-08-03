import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'appPropiedades',
  webDir: 'www',

  plugins: {
    Camera: {
      presentationStyle: 'fullscreen',
    },
  },
};

export default config;
