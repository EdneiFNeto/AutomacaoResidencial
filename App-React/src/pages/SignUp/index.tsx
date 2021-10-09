import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  Container,
  TextWelComer,
  Input,
  ButtonLogin,
  TextInfoSignUp,
  TextInf,
  TextSignUp,
  TextButtonLogin,
  TextSubTitle,
  ButtonSigUp,
} from './style';

import {RootStackParamList} from '../../type';
import StatusBarComponent from '../../components/StatusBarComponent';

const SignUp: React.FC = () => {
  type ISigninScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
  const navigation = useNavigation<ISigninScreenProp>();

  return (
    <>
      <StatusBarComponent />
      <Container>
        <TextWelComer>Welcome Onboard</TextWelComer>
        <TextSubTitle>
          Nulla libero diam eget sed velit vestibulum.
        </TextSubTitle>

        <Input placeholder="Enter your name" />
        <Input placeholder="Enter your emial" />
        <Input placeholder="Enter your password" />

        <ButtonLogin>
          <TextButtonLogin>Register User</TextButtonLogin>
        </ButtonLogin>

        <TextInfoSignUp>
          <TextInf>Dont have on account? </TextInf>
          <ButtonSigUp onPress={() => navigation.goBack()}>
            <TextSignUp>Signin</TextSignUp>
          </ButtonSigUp>
        </TextInfoSignUp>
      </Container>
    </>
  );
};

export default SignUp;
