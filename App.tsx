import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import Theme from './src/theme/Theme';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;
const MainText = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 10px;
  color: red;
`;

interface Props {}
const App = ({}: Props) => {
  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <MainText>Hello world</MainText>
      </Container>
    </ThemeProvider>
  );
};

export default App;
