import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AuthContext from '../../contexts/auth';

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
import {Alert} from 'react-native';

import {RootStackParamList} from '../../type';
import StatusBarComponent from '../../components/StatusBarComponent';

const SignUp: React.FC = () => {
  type ISigninScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
  const navigation = useNavigation<ISigninScreenProp>();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();

  const {saveDataInFirebase, saveUserAsyncStorage} = useContext(AuthContext);

  async function saveUserInAsynnStorage() {
    try {
      const user = {name: String(name), email: String(email)};
      await saveUserAsyncStorage(user);
      await saveDataInFirebase(user).then(() => {
        showDialog('Success save user!');
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  function showDialog(message: string) {
    Alert.alert('Atenção', message, [
      {
        text: 'Ok',
        onPress: () => {
          navigation.goBack();
        },
        style: 'cancel',
      },
    ]);
  }

  return (
    <>
      <StatusBarComponent />
      <Container>
        <TextWelComer>Welcome Onboard</TextWelComer>
        <TextSubTitle>
          Nulla libero diam eget sed velit vestibulum.
        </TextSubTitle>

        <Input
          placeholder="Enter your name"
          onChangeText={text => setName(text)}
        />
        <Input
          placeholder="Enter your emial"
          onChangeText={text => setEmail(text)}
        />

        <ButtonLogin onPress={() => saveUserInAsynnStorage()}>
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
