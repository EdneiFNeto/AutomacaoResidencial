import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  width: 100%;
  height: 1024px;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  z-index: 99999;
`;

export const TextLoader = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 15px;
  text-align: center;
  color: #999;
  margin-top: 12px;
`;

export const DialogComponent = styled.View`
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 32px;
  border-radius: 12px;
  background-color: white;
`;

export const ButtonClose = styled.TouchableOpacity`
  position: absolute;
  z-index: 9999;
  margin: 5px;
  right: 5px;
`;
