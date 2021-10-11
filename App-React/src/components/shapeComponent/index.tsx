import React from 'react';
import {ShapeImage} from './style';

import shape from '../../assets/shape.png';

const ShapeComponent: React.FC = () => {
  return <ShapeImage source={shape} />;
};

export default ShapeComponent;
