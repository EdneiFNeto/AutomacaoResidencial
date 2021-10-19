/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

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

  async function handleLogin() {
  }

  return (
    <>
      <StatusBarComponent />
      <ShapeComponent />

      {visibility && <ProgressComponent />}

      <Container>
        <TextWelComer>Welcome Back !</TextWelComer>
        <ImageInfo source={imageInfo} />

        <ButtonLogin onPress={() => handleLogin()}>
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
          <TextButtonFacebook>Login Facebook</TextButtonFacebook>
        </ButtonLoginFacebook>
      </Container>
    </>
  );
};

export default Signin;
