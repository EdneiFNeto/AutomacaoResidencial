import React from 'react';
import {
  Container,
  DigitalBg,
  TitleConsumo,
  TitleValue,
  TitleKWH,
} from './style';

import StatusBarComponent from '../../components/StatusBarComponent';

const Home: React.FC = () => {
  return (
    <>
      <StatusBarComponent />
      <Container>
        <DigitalBg>
          <TitleConsumo>Consumption</TitleConsumo>
          <TitleValue>120,00</TitleValue>
          <TitleKWH>KWH</TitleKWH>
        </DigitalBg>
      </Container>
    </>
  );
};

export default Home;
