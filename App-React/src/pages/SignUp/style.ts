import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 0 24px;
`;

export const TextWelComer = styled.Text`
  font-size: 26px;
  margin-bottom: 12px;
  font-family: 'Roboto-Regular';
`;

export const TextSubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 12px;
  font-family: 'Roboto-Light';
  text-align: center;
  margin-left: 24px;
  margin-right: 24px;
`;
export const ImageInfo = styled.Image`
  width: 250px;
  height: 250px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 60px;
  border-color: #c4c4c4;
  border-bottom-width: 1px;
`;

export const ButtonLogin = styled(RectButton)`
  padding: 12px;
  width: 100%;
  background: #39a5c7;
  border-radius: 8px;
  margin-top: 36px;
`;

export const ButtonSigUp = styled(RectButton)``;

export const TextButtonLogin = styled.Text`
  text-align: center;
  font-size: 18px;
  font-family: 'Roboto-Regular';
`;
export const TextInfoSignUp = styled.View`
  flex-direction: row;
  text-align: center;
  margin-top: 24px;
`;

export const TextInf = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Light';
`;
export const TextSignUp = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Medium';
  color: #39a5c7;
`;
