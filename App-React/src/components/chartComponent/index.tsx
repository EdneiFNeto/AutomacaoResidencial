import React from 'react';
import {Container, TitleChart} from './style';

import {VictoryLine, VictoryChart, VictoryTheme} from 'victory-native';

const ChartComponent: React.FC = () => {
  const data = [
    {x: 1, y: 2},
    {x: 2, y: 3},
    {x: 3, y: 5},
    {x: 4, y: 4},
    {x: 5, y: 6},
  ];

  return (
    <Container>
      {data.length > 0 && (
        <>
          <TitleChart>Chart Consumo de energia </TitleChart>
          <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: {stroke: '#39A5C7'},
                parent: {border: '1px solid #ccc'},
              }}
              animate={{
                duration: 2000,
                onLoad: {duration: 1000},
              }}
              data={data}
              labels={({datum}) => datum.y}
            />
          </VictoryChart>
        </>
      )}

      {data.length === 0 && <TitleChart>Empty data Chart </TitleChart>}
    </Container>
  );
};

export default ChartComponent;
