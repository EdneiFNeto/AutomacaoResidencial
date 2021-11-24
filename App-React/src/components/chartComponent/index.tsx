import React from 'react';
import {Container, ContainerWebView} from './style';

const ChartComponent: React.FC = () => {
  return (
    <Container>
      <>
        <ContainerWebView source={{uri: 'http://192.168.1.106:3000'}} />
      </>
    </Container>
  );
};

export default ChartComponent;
