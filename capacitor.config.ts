import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'proyecto_ionic2',
  webDir: 'www',
  plugins: {
    'BarcodeScanner': {
      // Aquí puedes agregar configuraciones personalizadas si es necesario
      // Por ejemplo, podrías añadir configuraciones como:
      // "scanArea": "50%",
      // "scanDelay": 1000,
    },
  },
};

export default config;
