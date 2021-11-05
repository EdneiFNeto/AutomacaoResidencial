import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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
`;
