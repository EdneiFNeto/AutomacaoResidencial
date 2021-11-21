import React from 'react';
import {Container, ContainerWebView} from './style';
import {IP} from '@env';

const ChartComponent: React.FC = () => {
  return (
    <Container>
      <>
        <ContainerWebView source={{uri: `http://${IP}:3000`}} />
      </>
    </Container>
  );
};

export default ChartComponent;
