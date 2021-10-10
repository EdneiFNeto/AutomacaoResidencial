import React from 'react';
import {Container, TextLoader} from './style';
import Icon from '../../assets/ampulheta.png';
import {Image} from 'react-native';

const ProgressComponent: React.FC = () => {
  return (
    <Container>
      <Image source={Icon} />
      <TextLoader>Carregando..</TextLoader>
    </Container>
  );
};

export default ProgressComponent;
