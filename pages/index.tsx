import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <Container>
      <NavBar></NavBar>
      <p>Hello World!!</p>
      <p>Now using TypeScript!!</p>
    </Container>
  );
}
