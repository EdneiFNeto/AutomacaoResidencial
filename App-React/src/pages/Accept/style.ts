import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 12px;
`;

export const ImageStarted = styled.Image`
  width: 190px;
  align-self: center;
  height: 190px;
  border-radius: 100px;
`;

export const Title = styled.Text`
  text-align: center;
  margin: 8px 12px;
  font-size: 17px;
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
  margin-left: 4px;
`;
