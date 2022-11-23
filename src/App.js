import './App.css';
import { Button,Navbar,Container,Nav } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <nav>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Shop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </nav>
      <Button variant="primary">버튼 디자인 가저오기</Button>{' '}
    </div>
  );
}

export default App;
