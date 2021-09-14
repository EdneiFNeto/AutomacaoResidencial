import React from 'react';
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
} from './style';

import imageInfo from '../../assets/undraw_my_notifications.png';
import StatusBarComponent from '../../components/StatusBarComponent';
import {RootStackParamList} from '../../type';

const Signin: React.FC = () => {
  type SigninScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
  const navigation = useNavigation<SigninScreenProp>();

  return (
    <>
      <StatusBarComponent />
      <Container>
        <TextWelComer>Welcome Back !</TextWelComer>
        <ImageInfo source={imageInfo} />
        <Input placeholder="Enter your emial" />
        <Input placeholder="Enter your password" />

        <ButtonLogin onPress={() => navigation.navigate('Home')}>
          <TextButtonLogin>Login</TextButtonLogin>
        </ButtonLogin>

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
