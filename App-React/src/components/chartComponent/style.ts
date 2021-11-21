import styled from 'styled-components/native';
import {WebView} from 'react-native-webview';

export const Container = styled.View`
  position: absolute;
  height: 650px;
  padding-bottom: 12%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  align-items: center;
  z-index: 9999;
`;

export const TitleChart = styled.Text`
  font-family: 'Arial';
  font-size: 18px;
  color: #000;
  text-transform: uppercase;
`;

export const ContainerWebView = styled(WebView)`
  width: 350px;
  height: 400px;
  padding-top: 100px;
`;
