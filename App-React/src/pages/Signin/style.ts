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
  margin-top: 8px;
`;

export const ButtonLoginFacebook = styled(RectButton)`
  padding: 12px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #1565c0;
  border-radius: 8px;
  margin-top: 8px;
`;

export const TextButtonFacebook = styled.Text`
  text-align: center;
  font-size: 18px;
  color: #fff;
  font-family: 'Roboto-Regular';
`;

export const TextOur = styled.Text`
  width: 100px;
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
`;

export const TextButtonLogin = styled.Text`
  text-align: center;
  font-size: 18px;
  font-family: 'Roboto-Regular';
`;
export const TextInfoSignUp = styled.View`
  flex-direction: row;
  text-align: center;
  margin-top: 14px;
`;

export const TextInf = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Light';
`;

export const ButtonSigUp = styled(RectButton)``;

export const TextSignUp = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Medium';
  color: #39a5c7;
`;
