/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from "@expo/config";
import { ClientEnv, Env } from "./env";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  slug: Env.SCHEME,
  version: Env.VERSION,
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: Env.SCHEME,
  userInterfaceStyle: "automatic",
  description: `${Env.NAME} Mobile App`,
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#2E3C4B",
        image: "./assets/images/splash-icon.png",
        imageWidth: 150,
      },
    ],
  ],
  extra: {
    ...ClientEnv,
  },
});
