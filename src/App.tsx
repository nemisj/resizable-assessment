import React from 'react';
import styled from 'styled-components';

import { MinWidthType, Container } from './resizable';

type Color = { color: string | undefined };
const Panel = styled.div<MinWidthType<Color>>`
  background-color: ${(props: Color) => (props.color ? props.color : 'white')};
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const ContainerMain = styled(Container)`
  width: 100vw;
  height: 100vh;
`;

const GutterComponent = styled.div`
  height: 100%;
  width: 100%;
  background-color: #c6c6c6;
`;

function App() {
  return (
    <ContainerMain>
      <Panel minSize={100} color="#f6d186" />
      <Container direction="column">
        <Panel color="#fcf7bb">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Panel>
        <Container id="something" GutterComponent={GutterComponent}>
          <Panel color="#4baea0"></Panel>
          <Panel color="#b6e6bd"></Panel>
          <Panel color="#f1f0cf"></Panel>
        </Container>
      </Container>
      <Panel color="#f19292" />
    </ContainerMain>
  );
}

export default App;
