/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId:
    '842760815061-07d5u9i79e1u7mg8qh0q26tkabb4prbn.apps.googleusercontent.com',
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

import {
  Container,
  TextWelComer,
  ImageInfo,
  ButtonLogin,
  TextButtonLogin,
  ButtonLoginFacebook,
  TextOur,
  TextButtonFacebook,
  Divider,
  Line,
} from './style';

import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import imageInfo from '../../assets/undraw_my_notifications.png';
import StatusBarComponent from '../../components/StatusBarComponent';
import {RootStackParamList} from '../../type';
import AuthContext from '../../contexts/auth';
import ShapeComponent from '../../components/shapeComponent';

import ProgressComponent from '../../components/progressComponent';
import {ToastAndroid} from 'react-native';

const Signin: React.FC = () => {
  type SigninScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
  const navigation = useNavigation<SigninScreenProp>();

  const {getUserAsyncStorage, loginFacebook} = useContext(AuthContext);
  const [visibility, setVisibility] = useState<boolean>(true);

  useEffect(() => {
    getUserStorage();
  }, []);

  async function getUserStorage() {
    const user = await getUserAsyncStorage();

    if (user !== 'null') {
      navigation.navigate('Home');
    }

    setVisibility(false);
  }

  async function onFacebookButtonPress() {
    try {
      await loginFacebook().then(() => navigation.navigate('Home'));
    } catch (error) {
      setVisibility(false);
      console.log('Error[catch]', error);
    }
  }

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      ToastAndroid.show('Failure auth in google!', ToastAndroid.SHORT);
      console.log('error', error);
    }
  }

  return (
    <>
      <StatusBarComponent />
      <ShapeComponent />

      {visibility && <ProgressComponent />}

      <Container>
        <TextWelComer>Welcome Back !</TextWelComer>
        <ImageInfo source={imageInfo} />
        <ButtonLogin onPress={async () => await onGoogleButtonPress()}>
          <FontAwesome size={24} name="google" color="#FFF" />
          <TextButtonLogin>Google Login</TextButtonLogin>
        </ButtonLogin>

        <Divider>
          <Line />
          <TextOur>OU</TextOur>
          <Line />
        </Divider>
        <ButtonLoginFacebook onPress={() => onFacebookButtonPress()}>
          <Icon size={24} name="facebook" color="#FFF" />
          <TextButtonFacebook>Facebook Login </TextButtonFacebook>
        </ButtonLoginFacebook>
      </Container>
    </>
  );
};

export default Signin;
