import styled from 'styled-components/native';
import {RadioButton} from 'react-native-paper';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ImageStarted = styled.Image`
  width: 190px;
  height: 190px;
  border-radius: 100px;
`;

export const Title = styled.Text`
  text-align: center;
  padding: 0 12px 0 12px;
  margin: 8px 12px;
  font-size: 18px;
  font-family: 'Roboto-Medium';
`;

export const TitleInfo = styled.Text`
  text-align: justify;
  margin: 4px 12px;
  font-size: 16px;
  font-family: 'Roboto-Light';
`;

export const ContainerCheckBox = styled.View`
  flex-direction: row;
`;

export const ContainerInputTariff = styled.View``;

export const InputTariff = styled.TextInput`
  margin-left: 12px;
  padding: 0;
  font-size: 18px;
  margin-bottom: 8px;
`;

export const LineInput = styled.View`
  width: 92%;
  margin-left: 12px;
  margin-right: 12px;
  height: 1px;
  background-color: #cacacaca;
`;

export const LabelInput = styled.Text`
  font-size: 18px;
  margin-top: 12px;
  font-family: 'Roboto-Regular';
  margin-left: 12px;
  color: #000;
`;

export const ContainerRadioButtton = styled.View`
  flex-direction: row;
  margin-right: 12px;
`;

export const ContainerRadioButtonYellowCard = styled(RadioButton)`
  margin-top: 32px;
  flex-direction: row;
`;
export const RadioButtonYellow = styled(RadioButton)``;

export const ImageFlag = styled.Image`
  width: 30px;
  height: 30px;
`;

export const ContainerAllRadio = styled.View`
  flex-direction: row;
  margin-left: 8px;
`;

export const TitleFlag = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
  margin: 12px;
  color: #000;
`;

export const ButtonSavePreferences = styled(RectButton)`
  padding: 12px;
  width: 300px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -150px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #39a5c7;
  border-radius: 8px;
  margin-top: 8px;
  margin-right: 10px;
`;

export const TextButtonPreferences = styled.Text`
  text-align: center;
  font-size: 18px;
  color: #000;
  padding-left: 8px;
  font-family: 'Roboto-Regular';
`;
