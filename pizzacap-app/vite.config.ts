import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const httpsEnabled = process.env.VITE_HTTPS_ENABLED === 'true';

const serverConfig = httpsEnabled
  ? {
      https: {
        key: fs.readFileSync(
          path.resolve(__dirname, '.cert/localhost+2-key.pem')
        ),
        cert: fs.readFileSync(
          path.resolve(__dirname, '.cert/localhost+2.pem')
        ),
      },
    }
  : {};

export default defineConfig({
  plugins: [react()],
  server: {
    ...serverConfig,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
