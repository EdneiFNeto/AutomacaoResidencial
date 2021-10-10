/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, ToastAndroid} from 'react-native';

import {
  Container,
  TextWelComer,
  ImageInfo,
  Input,
  ButtonLogin,
  TextInfoSignUp,
  TextInf,
  TextSignUp,
  TextButtonLogin,
  ButtonSigUp,
  ButtonLoginFacebook,
  TextOur,
  TextButtonFacebook,
  TextInfo,
} from './style';

import Icon from 'react-native-vector-icons/Feather';

import imageInfo from '../../assets/undraw_my_notifications.png';
import StatusBarComponent from '../../components/StatusBarComponent';
import {RootStackParamList} from '../../type';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import {User} from '../../model/User';

import ProgressComponent from '../../components/progressComponent';
const db = database();

const Signin: React.FC = () => {
  type SigninScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
  const navigation = useNavigation<SigninScreenProp>();

  const [visibility, setVisibility] = useState<boolean>(true);
  const [email, setEmail] = useState<String>();
  const [isNotExisteUser, setIsExistiUser] = useState<boolean>(false);

  useEffect(() => {
    getUserAsyncStorage();
  }, [isNotExisteUser]);

  async function getUserAsyncStorage() {
    setTimeout(async () => {
      await AsyncStorage.getItem('user', data => {
        console.log('User', data);
        setVisibility(false);
        if (data !== null) {
          navigation.navigate('Home');
        }
      });
    }, 3000);
  }

  async function onFacebookButtonPress() {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      await auth()
        .signInWithCredential(facebookCredential)
        .then(dataFirebase => {
          saveUserDatabaseLocal(dataFirebase);
        });
    } catch (error) {
      setVisibility(false);
      console.log('Error[catch]', error);
    }
  }

  async function saveUserDatabaseLocal(result) {
    try {
      const user = result.additionalUserInfo.profile as User;
      await AsyncStorage.setItem('user', JSON.stringify(user))
        .then(() => saveDataInFirebase(user))
        .catch(error => {
          setVisibility(false);
          console.error('Error', error);
        });
    } catch (e) {
      setVisibility(false);
      console.error('error', e);
    }
  }

  async function saveDataInFirebase(user: User) {
    await db
      .ref('/users')
      .push()
      .set(user)
      .then(() => navigation.navigate('Home'))
      .catch(error => {
        setVisibility(false);
        console.log('error', error);
      });
  }

  async function handleLogin() {
    setVisibility(true);
    await db.ref('/users').once('value', snapshot => {
      setVisibility(false);
      snapshot.forEach(data => {
        toPageHome(data.child('email').val() as string);
      });
    });
  }

  function toPageHome(data: String) {
    if (email === data) {
      navigation.navigate('Home');
    }

    setIsExistiUser(!(email === data));
  }

  return (
    <>
      <StatusBarComponent />
      {visibility && <ProgressComponent />}

      <Container>
        <TextWelComer>Welcome Back !</TextWelComer>
        <ImageInfo source={imageInfo} />
        <Input
          placeholder="Enter your emial"
          onChangeText={(text: string) => setEmail(text)}
        />

        <Input placeholder="Enter your password" />
        {isNotExisteUser && <TextInfo>Não existe usuário!</TextInfo>}

        <ButtonLogin onPress={() => handleLogin()}>
          <TextButtonLogin>Login</TextButtonLogin>
        </ButtonLogin>

        <TextOur> Ou</TextOur>

        <ButtonLoginFacebook onPress={() => onFacebookButtonPress()}>
          <Icon size={24} name="facebook" color="#FFF" />
          <TextButtonFacebook>Facebook</TextButtonFacebook>
        </ButtonLoginFacebook>

        <TextInfoSignUp>
          <TextInf>Dont have on account? </TextInf>
          <ButtonSigUp onPress={() => navigation.navigate('SignUp')}>
            <TextSignUp>Sign Up</TextSignUp>
          </ButtonSigUp>
        </TextInfoSignUp>
      </Container>
    </>
  );
};

export default Signin;
