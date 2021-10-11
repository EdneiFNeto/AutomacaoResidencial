import React from 'react';
import {
  Container,
  DigitalBg,
  TitleConsumo,
  TitleValue,
  TitleKWH,
  InfoDigital,
  TitleInfo,
  TitleDate,
  TitleDateInfo,
  Flag,
  TextFlag,
  ContainerDigital,
} from './style';

import Icon from 'react-native-vector-icons/FontAwesome';

import bgDigital from '../../assets/bg-digital.png';
import ShapeComponent from '../../components/shapeComponent';
import StatusBarComponent from '../../components/StatusBarComponent';

const Home: React.FC = () => {
  return (
    <>
      <StatusBarComponent />
      <Container>
        <ShapeComponent />
        <ContainerDigital>
          <DigitalBg source={bgDigital} resizeMode="cover">
            <TitleConsumo>Consumption</TitleConsumo>
            <TitleValue>120,00</TitleValue>
            <TitleKWH>KWH</TitleKWH>
          </DigitalBg>

          <InfoDigital>
            <TitleInfo>Month</TitleInfo>
            <TitleInfo>R$ 12,00</TitleInfo>
            <TitleDate>Date</TitleDate>
            <TitleDateInfo>12/09</TitleDateInfo>
            <Flag>
              <Icon size={24} name="flag" color="yellow" />
              <TextFlag>Yellow card</TextFlag>
            </Flag>
          </InfoDigital>
        </ContainerDigital>
      </Container>
    </>
  );
};

export default Home;
