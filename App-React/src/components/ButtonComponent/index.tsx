import React from 'react';
import {Button, TextInfo} from './style';
import {RectButtonProperties} from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
  text: string;
  onPress: (pointerInside: boolean) => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({text, onPress}) => {
  return (
    <Button onPress={onPress}>
      <TextInfo>{text}</TextInfo>
    </Button>
  );
};

export default ButtonComponent;
