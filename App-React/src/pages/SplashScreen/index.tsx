import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  Container,
  ImageStarted,
  TextInfo,
  ButtonStarted,
  TextTitleInfo,
  TextButton,
} from './style';

import imageInfo from '../../assets/undraw_Developer.png';
import StatusBarComponent from '../../components/StatusBarComponent';
import {RootStackParamList} from '../../type';

const SplashScreen: React.FC = () => {
  type ISigninScreenProp = StackNavigationProp<RootStackParamList, 'Signin'>;
  const navigation = useNavigation<ISigninScreenProp>();
  return (
    <Container>
      <StatusBarComponent />

      <ImageStarted source={imageInfo} />
      <TextTitleInfo> Gets things done whit todo</TextTitleInfo>
      <TextInfo>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris
        vulputate at bibendum turpis fusce egestas.
      </TextInfo>

      <ButtonStarted onPress={() => navigation.navigate('Signin')}>
        <TextButton>Get started</TextButton>
      </ButtonStarted>
    </Container>
  );
};

export default SplashScreen;
