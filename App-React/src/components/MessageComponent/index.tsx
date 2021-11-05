import React from 'react';
import {Container, TextLoader, DialogComponent, ButtonClose} from './style';
import Icon from 'react-native-vector-icons/Feather';
import ButtonComponent from '../ButtonComponent';
import {GestureResponderEvent} from 'react-native';

interface MessageProps {
  message: string;
  name: string;
  size?: number;
  color: string;
  textButton: string;
  onPressButton: (pointerInside: boolean) => void;
  onPressIcon?: ((event: GestureResponderEvent) => void) | undefined;
}

const MessageComponent: React.FC<MessageProps> = ({
  message,
  name,
  size,
  color,
  onPressButton,
  onPressIcon,
  textButton,
}) => {
  return (
    <Container>
      <DialogComponent>
        <ButtonClose onPress={onPressIcon}>
          <Icon name="x-circle" size={32} color="red" />
        </ButtonClose>
        <Icon name={name} size={size} color={color} />
        <TextLoader>{message}</TextLoader>
        <ButtonComponent text={textButton} onPress={onPressButton} />
      </DialogComponent>
    </Container>
  );
};

export default MessageComponent;
