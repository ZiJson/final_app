import logo from './logo.svg';
import './App.css';
import SignIn from './containers/SignIn';
import Home from './containers/Home';
import styled from 'styled-components';
import { useHome } from './containers/hooks/useHome';


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
  const { signedIn } = useHome();
  return (
  signedIn ? <Home/>:<Wrapper><SignIn /></Wrapper>
  );
}

export default App;
