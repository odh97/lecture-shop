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
//스타일드 사용법
import styled from 'styled-components';
// axios 사용법
import axios from 'axios';

let YellowBtn = styled.button`
  background: ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`
let NewBtn = styled.button(YellowBtn);

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  
  function sortFn(){
    let shoesCopy = [...shoes];
    shoesCopy.sort(function(a, b){
      return a.title > b.title ? 1: -1;
    });
    setShoes(shoesCopy);
  }
  let ajaxfn = ()=>{
    axios.get('https://codingapple1.github.io/shop/data2.json')
    .then((result)=>{
      console.log(result.data);
    })
    .catch(()=>{
      alert("데이터 요청에 실패하였습니다.");
    });
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
              <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/event')}}>Event</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/styled')}}>Styled</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </nav>
      <div className='linkNav'>
        <span>Link Nav</span>
        <Link to="/">Home</Link>
        <Link to="/detail/0">상세페이지</Link>
      </div>
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
            <Button variant="primary" onClick={sortFn}>이름순으로 정렬</Button>
            <button className='cmnBtn' onClick={ajaxfn}>상품 더보기</button>
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
        <Route path='/styled' element={<StyledCp />}/>
        <Route path='*' element={<><h1>404</h1><div>없는페이지에요~</div></>}/>
      </Routes>
    </div>
  );
}

function StyledCp(){
return(
  <>
  {/* 스타일드 적용 */}
  <div className='styledBox'>
    <YellowBtn bg="blue">스타일드 사용 해보기 A</YellowBtn>
    <YellowBtn bg="yellow">스타일드 사용해보기 B</YellowBtn>
  </div>
  </>
)
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
