import { useState } from 'react';
import { Button,Navbar,Container,Nav } from 'react-bootstrap';
import './App.css';
import bannerBg from './img/bgimg.png';
import Detail from './routes/Detail.js';
// export 사용
import {a, b} from './data/test.js';
import 작명2 from './data/test2';
import data from './data/data';
//라우터 사용법
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';


function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  
  function SortFn(){
    let shoesCopy = [...shoes];
    shoesCopy.sort(function(a, b){
      return a.title > b.title ? 1: -1;
    });
    setShoes(shoesCopy);
  }
  
  
  return (
    <div className="App">

      <nav>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Shop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/event')}}>Event</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </nav>

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>

      <Routes>
        <Route path='/' element={
          <>
            <main>
              <div className='mainBg' style={{backgroundImage:'url('+bannerBg+')'}}></div>
              <section className='product-list'>
                {shoes.map(function(value, index){
                  return(
                    <Product key={index} shoes={shoes[index]} index={index+1} />
                  )
                })}
              </section>
            </main>
            <Button variant="primary" className='SortBtn' onClick={SortFn}>버튼 디자인 가져오기</Button>{' '}
          </>
        } />
        <Route path='/detail/:id' element={<Detail shoes={shoes} />}/>
        <Route path='/about' element={<About />}>
          <Route path='member' element={<div>멤버임</div>}/>
        </Route>
        <Route path='/event' element={<Event />}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path='*' element={<><h1>404</h1><div>없는페이지에요~</div></>}/>
      </Routes>

    </div>
  );
}

function Event(){
  return(
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </>
  )
}

function About(){
  return(
    <>
      <h4>회사정보입니다.</h4>
      <Outlet></Outlet>
    </>
  )
}

function Product(props){
return(
      <div className='product-item'>
        <img src={"https://codingapple1.github.io/shop/shoes"+(props.index)+".jpg"}></img>
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
      </div>
);
}

export default App;
