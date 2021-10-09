import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const StatusBarStyle = styled.StatusBar``;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 0 24px;
`;

export const ImageStarted = styled.Image`
  width: 100%;
  height: 50%;
`;

export const TextInfo = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Light';
  text-align: center;
  margin-top: 8px;
`;

export const TextTitleInfo = styled.Text`
  font-size: 24px;
  font-family: 'Roboto-Regular';
`;

export const ButtonStarted = styled(RectButton)`
  padding: 12px;
  width: 100%;
  background: #39a5c7;
  border-radius: 8px;
  margin-top: 36px;
`;

export const TextButton = styled.Text`
  text-align: center;
  font-size: 18px;
  font-family: 'Roboto-Regular';
`;
