import React, {useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Container, ImageStarted, TextInfo, TextTitleInfo} from './style';

import imageInfo from '../../assets/undraw_Developer.png';
import StatusBarComponent from '../../components/StatusBarComponent';
import {RootStackParamList} from '../../type';
import ShapeComponent from '../../components/shapeComponent';
import MessageComponent from '../../components/MessageComponent';
import AuthContext from '../../contexts/auth';
import {Preferences} from '../../model/Preferences';
import ButtonComponent from '../../components/ButtonComponent';

const SplashScreen: React.FC = () => {
  type ISigninScreenProp = StackNavigationProp<RootStackParamList, 'Accept'>;
  type ISigninScreenSignin = StackNavigationProp<RootStackParamList, 'Signin'>;
  type ISigninScreenPropSetings = StackNavigationProp<
    RootStackParamList,
    'Settings'
  >;
  const navigation = useNavigation<ISigninScreenProp>();
  const navigationSetting = useNavigation<ISigninScreenPropSetings>();
  const navigationSignin = useNavigation<ISigninScreenSignin>();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [myPreferences, setMyPreferences] = useState<Preferences>();
  const {getPreferences} = useContext(AuthContext);

  useEffect(() => {
    async function getFlag(flag: string): Promise<string | undefined> {
      let myFlag;
      switch (flag) {
        case 'yellow':
          myFlag = 'Amarela';
          break;

        case 'red':
          myFlag = 'Vermelha';
          break;

        case 'green':
          myFlag = 'Verde';
          break;
      }

      return myFlag;
    }

    async function preferences() {
      await getPreferences()
        .then(async result => {
          const {tarrif, flag} = JSON.parse(result as string) as Preferences;
          setMyPreferences({tarrif, flag});
          setMessage(
            `Deseja atualizar tarifa de R$${tarrif.toFixed(
              2,
            )} ou bandeira (${await getFlag(flag)})!`,
          );
        })
        .catch(() => setMessage(undefined));
    }
    preferences();
  }, [getPreferences]);

  function goScreenLogin() {
    if (myPreferences === undefined) {
      navigation.navigate('Accept');
    } else {
      navigationSignin.navigate('Signin');
    }
  }

  return (
    <Container>
      <ShapeComponent />

      <StatusBarComponent />

      <ImageStarted source={imageInfo} />
      <TextTitleInfo> Bem vindo ao IoT - App</TextTitleInfo>
      <TextInfo>
        Para realizar a ativação do aplicativo, basta clicar no botão Get
        Started para iniciar a configuração e acesso ao IoT-App
      </TextInfo>

      <ButtonComponent text="Get started" onPress={() => goScreenLogin()} />

      {message !== undefined && (
        <MessageComponent
          color="#fbc02d"
          message={message}
          name="alert-triangle"
          onPressButton={() => navigationSetting.navigate('Settings')}
          onPressIcon={() => setMessage(undefined)}
          textButton="confirmar"
          size={60}
        />
      )}
    </Container>
  );
};

export default SplashScreen;
