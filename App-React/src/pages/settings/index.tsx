import React, {useState, useCallback, useContext} from 'react';
import ShapeComponent from '../../components/shapeComponent';
import StatusBarComponent from '../../components/StatusBarComponent';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../type';
import AuthContext from '../../contexts/auth';

import {
  Container,
  Title,
  TitleInfo,
  InputTariff,
  ContainerInputTariff,
  LineInput,
  LabelInput,
  ContainerRadioButtton,
  ContainerRadioButtonYellowCard,
  RadioButtonYellow,
  ImageFlag,
  ContainerAllRadio,
  TitleFlag,
  ButtonSavePreferences,
  TextButtonPreferences,
} from './style';

import imageInfoYellow from '../../assets/flag_yellow.png';
import imageInfoGreen from '../../assets/flag_green.png';
import imageInfoRed from '../../assets/flag_red.png';
import MessageComponent from '../../components/MessageComponent';

const Settings: React.FC = () => {
  type ISigninScreenProp = StackNavigationProp<RootStackParamList, 'Signin'>;
  const navigation = useNavigation<ISigninScreenProp>();
  const {savetPreferences} = useContext(AuthContext);

  const [flag, setFlag] = useState<string>();
  const [tarrif, setTarrif] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [iconName, seticonName] = useState<string | undefined>();

  async function saveMyPreferences() {
    try {
      if (tarrif === undefined) {
        throw 'Tarifa inválida, tente novamente!';
      }

      if (flag === undefined) {
        throw 'Selecione uma bandeira!';
      }

      await savetPreferences({tarrif: Number(tarrif), flag});
      seticonName('check-circle');
      setMessage('Dados salvos com sucesso!');
    } catch (error) {
      seticonName('alert-circle');
      setMessage(error as string);
    }
  }

  const clearAll = useCallback(() => {
    setMessage(undefined);
    setFlag(undefined);
    setTarrif(undefined);
    if (message === 'Dados salvos com sucesso!') {
      navigation.navigate('Signin');
    }
  }, [message, navigation]);

  return (
    <Container>
      <StatusBarComponent />
      <ShapeComponent />

      <Title>Gets things done whit todo</Title>
      <TitleInfo>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris
        vulputate at bibendum turpis fusce egestas.
      </TitleInfo>

      <ContainerInputTariff>
        <LabelInput>Tarifa</LabelInput>
        <InputTariff
          value={tarrif}
          placeholder="R$0,00"
          keyboardType="decimal-pad"
          onChangeText={text => setTarrif(text)}
        />
        <LineInput />
      </ContainerInputTariff>

      <ContainerRadioButtonYellowCard.Group
        onValueChange={newValue => setFlag(newValue)}
        value={flag as string}>
        <TitleFlag>Definir Bandeiras</TitleFlag>
        <ContainerAllRadio>
          <ContainerRadioButtton>
            <RadioButtonYellow value="yellow" />
            <ImageFlag source={imageInfoYellow} />
          </ContainerRadioButtton>

          <ContainerRadioButtton>
            <RadioButtonYellow value="red" />
            <ImageFlag source={imageInfoRed} />
          </ContainerRadioButtton>

          <ContainerRadioButtton>
            <RadioButtonYellow value="green" />
            <ImageFlag source={imageInfoGreen} />
          </ContainerRadioButtton>
        </ContainerAllRadio>
      </ContainerRadioButtonYellowCard.Group>

      <ButtonSavePreferences onPress={() => saveMyPreferences()}>
        <TextButtonPreferences>Save Preferences </TextButtonPreferences>
      </ButtonSavePreferences>

      {message !== undefined && (
        <MessageComponent
          message={message}
          name={iconName as string}
          size={60}
          textButton="Fechar"
          onPressIcon={() => clearAll()}
          onPressButton={() => clearAll()}
          color={iconName === 'check-circle' ? 'green' : 'red'}
        />
      )}
    </Container>
  );
};

export default Settings;
