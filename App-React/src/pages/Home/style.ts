import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: #eeeeee;
`;

export const ContainerDigital = styled.View`
  background-color: #e2e2e2e2;
  flex: 1;
  flex-direction: row;
  padding: 8px;
`;

export const DigitalBg = styled.ImageBackground`
  width: 200px;
  height: 200px;
  padding: 30px;
`;

export const TitleConsumo = styled.Text`
  font-size: 18px;
  margin-top: 12px;
  font-family: 'Roboto-Medium';
`;

export const TitleValue = styled.Text`
  font-family: 'DS-DIGI';
  font-size: 32px;
  text-align: center;
`;

export const TitleKWH = styled.Text`
  font-family: 'DS-DIGI';
  font-size: 22px;
  text-align: center;
`;

export const InfoDigital = styled.View`
  padding: 0 12px;
  margin-top: 32px;
`;

export const TitleInfoMonth = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Medium';
`;

export const TitleInfo = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

export const TitleDate = styled.Text`
  font-size: 20px;
  font-family: 'Roboto-Medium';
  margin-top: 10px;
`;
export const TitleDateInfo = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Regular';
`;
export const Flag = styled.View`
  flex-direction: row;
  margin-top: 12px;
  font-family: 'Roboto-Regular';
`;

export const TextFlag = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  font-family: 'Roboto-Thin';
`;

export const ViewTabBar = styled.View`
  padding: 12px 12px;
  width: 100%;
  flex-direction: row;
  align-self: center;
  background-color: white;
`;

export const TouchableOpacityTabBar = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextTabBar = styled.Text`
  text-align: center;
`;
