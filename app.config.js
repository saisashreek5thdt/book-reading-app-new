import "dotenv/config";

export default {
  expo: {
    name: "book-reading-app-new",
    slug: "book-reading-app-new",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/images/book.jpg",
    scheme: "bookreadingappnew",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      bundleIdentifier: "com.fifthdt.bookreading",
      buildNumber: "3",
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription: "This app uses the camera for reading.",
      },
    },
    android: {
      package: "com.fifthdt.bookreading",
      versionCode: 3,
      adaptiveIcon: {
        foregroundImage: "./assets/images/book.jpg",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/book.jpg",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/book.jpg",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-secure-store",
    ],
    extra: {
      AUTH_LOGIN: process.env.AUTH_LOGIN,
      AUTH_REGISTER: process.env.AUTH_REGISTER,
      CATE_DATA: process.env.CATE_DATA,
      AUTH_LOGOUT: process.env.AUTH_LOGOUT,
      USER_DATA: process.env.USER_DATA
    },
    owner: "saisashreekd1992",
  },
};
