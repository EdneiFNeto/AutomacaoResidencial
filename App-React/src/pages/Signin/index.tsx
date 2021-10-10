import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
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
} from './style';

import Icon from 'react-native-vector-icons/Feather';

import imageInfo from '../../assets/undraw_my_notifications.png';
import StatusBarComponent from '../../components/StatusBarComponent';
import {RootStackParamList} from '../../type';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

import ProgressComponent from '../../components/progressComponent';
import {event} from 'react-native-reanimated';
const reference = database()
  .ref('/users')
  .push();

const Signin: React.FC = () => {
  type SigninScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
  const navigation = useNavigation<SigninScreenProp>();

  const [visibility, setVisibility] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  useEffect(() => {
    const getUserInstorage = async () => {
      AsyncStorage.getItem('user')
        .then(result => {
          setVisibility(false);
          if (result !== undefined) {
            navigation.navigate('Home');
          }
        })
        .catch(error => console.error(error));
    };

    setTimeout(() => {
      getUserInstorage();
    }, 3000);
  }, [navigation, visibility]);

  const onFacebookButtonPress = useCallback(async () => {
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
        .then(result => saveUserDatabaseLocal(result));
    } catch (error) {
      setVisibility(false);
      console.log('Error[catch]', error);
    }
  }, [visibility]);

  const saveUserDatabaseLocal = useCallback(
    async result => {
      try {
        console.log('Result', result.additionalUserInfo.profile);
        try {
          const userJson = JSON.stringify(result.additionalUserInfo.profile);
          await AsyncStorage.setItem('user', userJson)
            .then(result => saveDataInFirebase(userJson))
            .catch(error => {
              setVisibility(false);
              console.error('Error', error);
            });
        } catch (e) {
          setVisibility(false);
          console.error('error', e);
        }
      } catch (e) {
        setVisibility(false);
        console.log('Error', e);
      }
    },
    [visibility],
  );

  const saveDataInFirebase = useCallback(
    async user => {
      await reference
        .set({user})
        .then(result => navigation.navigate('Home'))
        .catch(error => {
          setVisibility(false);
          console.log('error', error);
        });
    },
    [navigation],
  );

  const handleLogin = async () => {
    setVisibility(true);
    console.log('emial', email);
    console.log('password', password);
    await saveDataInFirebase({user: email});
  };

  return (
    <>
      <StatusBarComponent />
      {visibility && <ProgressComponent />}

      <Container>
        <TextWelComer>Welcome Back !</TextWelComer>
        <ImageInfo source={imageInfo} />
        <Input
          placeholder="Enter your emial"
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Enter your password"
          onChangeText={text => setPassword(text)}
        />

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
