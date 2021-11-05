import React, {useState} from 'react';
import ShapeComponent from '../../components/shapeComponent';
import StatusBarComponent from '../../components/StatusBarComponent';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  ImageStarted,
  Title,
  TitleInfo,
  ContainerCheckBox,
} from './style';

import imageInfo from '../../assets/accept.png';
import CheckBox from '@react-native-community/checkbox';
import ButtonComponent from '../../components/ButtonComponent';
import {RootStackParamList} from '../../type';
import {StackNavigationProp} from '@react-navigation/stack';

const Accept: React.FC = () => {
  const [isAccept, setIsAccept] = useState<boolean>(false);
  type ISigninScreenProp = StackNavigationProp<RootStackParamList, 'Settings'>;
  const navigation = useNavigation<ISigninScreenProp>();

  return (
    <Container>
      <StatusBarComponent />
      <ShapeComponent />
      <ImageStarted source={imageInfo} />

      <Title>Olá usuário tudo bem? Leia com atenção</Title>
      <TitleInfo>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry.
      </TitleInfo>

      <ContainerCheckBox>
        <CheckBox
          disabled={false}
          onValueChange={() => setIsAccept(!isAccept)}
          value={isAccept}
        />
        <TitleInfo>Aceitar os termos</TitleInfo>
      </ContainerCheckBox>

      {isAccept && (
        <ButtonComponent
          onPress={() => navigation.navigate('Settings')}
          text="Avança"
        />
      )}
    </Container>
  );
};

export default Accept;
