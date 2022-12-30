import logo from './logo.svg';
import './App.css';
import SignIn from './containers/SignIn';
import styled from 'styled-components';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
width: 500px;
margin: auto;
`;

function App() {
  return (
    <Wrapper> { <SignIn />} </Wrapper>
  );
}

export default App;
