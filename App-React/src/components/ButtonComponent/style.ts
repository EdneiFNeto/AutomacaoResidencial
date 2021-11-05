import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View``;
export const Button = styled(RectButton)`
  padding: 8px;
  width: 90%;
  align-self: center;
  background: #39a5c7;
  border-radius: 8px;
  margin-top: 36px;
`;
export const TextInfo = styled.Text`
  text-align: center;
  font-size: 18px;
  font-family: 'Roboto-Regular';
  color: white;
`;
