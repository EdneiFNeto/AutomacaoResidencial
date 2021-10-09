//Copiar assts da pasta para dentro do android/Ios nativo
//Run: yarn react-native link
//Android => android/app/src/main
//Ios => MyApp/info.plist

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
