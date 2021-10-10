/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
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
  TextInfo,
} from './style';

import Icon from 'react-native-vector-icons/Feather';

import imageInfo from '../../assets/undraw_my_notifications.png';
import StatusBarComponent from '../../components/StatusBarComponent';
import {RootStackParamList} from '../../type';
import {User} from '../../model/User';
import AuthContext from '../../contexts/auth';

import ProgressComponent from '../../components/progressComponent';

const Signin: React.FC = () => {
  type SigninScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
  const navigation = useNavigation<SigninScreenProp>();

  const {signIn, getUserAsyncStorage, loginFacebook} = useContext(AuthContext);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [email, setEmail] = useState<String>();
  const [isNotExisteUser, setIsExistiUser] = useState<boolean>(false);

  useEffect(() => {
    getUserStorage();
  }, []);

  async function getUserStorage() {
    setVisibility(true);
    setInterval(async () => {
      const user = await getUserAsyncStorage();
      if (user !== null) {
        navigation.navigate('Home');
      }
      setVisibility(false);
    }, 3000);
  }

  async function onFacebookButtonPress() {
    try {
      await loginFacebook().then(() => navigation.navigate('Home'));
    } catch (error) {
      setVisibility(false);
      console.log('Error[catch]', error);
    }
  }

  async function handleLogin() {
    setVisibility(true);
    try {
      await signIn(getUser()).then(() => {
        setVisibility(false);
        setIsExistiUser(false);
        navigation.navigate('Home');
      });
    } catch (error) {
      setVisibility(false);
      setIsExistiUser(true);
      console.log('Error', error);
    }
  }

  function getUser(): User {
    return {
      name: 'Ednei',
      email: String(email),
      first_name: '',
      id: '',
      last_name: '',
      picture: {data: {width: 300, height: 300, url: ''}},
    };
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
