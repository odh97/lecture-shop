// rfce 함수형
import { createContext, useState } from 'react';
import { Button,Navbar,Container,Nav } from 'react-bootstrap';
import './App.css';
import bannerBg from './img/bgimg.png';
import Detail from './routes/Detail.js';
import AxiosCp from './routes/AxiosCp';
import StyledCp from './StyledCp';
import CartCp from './routes/CartCp';
import Effect from './Effect.js'
import {DscrpTab, QandATab, ReviewTab} from './routes/DetailTabList';
// export 사용
import {a, b} from './data/test.js';
import 작명2 from './data/test2';
import data from './data/data';
// 라우터 사용법
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
// axios 사용법
import axios from 'axios';

//state보관함
export let Context1 = createContext();

function App() {

  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10,11,12]);
  let [loadingSw, setLoadingSw] = useState(false);
  let navigate = useNavigate();
  
  function sortFn(){
    let shoesCopy = [...shoes];
    shoesCopy.sort(function(a, b){
      return a.title > b.title ? 1: -1;
    });
    setShoes(shoesCopy);
  }

  let [dataNm, setDataNm] = useState(2);
  let jsonData = [];

  let ajaxFn = ()=>{
    setLoadingSw(true);

    axios.get('https://codingapple1.github.io/shop/data'+dataNm+'.json')
    .then((result)=>{

      // 내가 만든 방식
      // let shoesCopy = [...shoes];
      // for(let item in result.data){
      // shoesCopy.push(result.data[item]);
      // }
      // setShoes(shoesCopy);

      setTimeout(() => {
        let shoesCopy = [...shoes, ...result.data];
        setShoes(shoesCopy);
        setDataNm(dataNm+1);

        setLoadingSw(null);
      }, "1000")
    })
    .catch(()=>{
      setTimeout(() => {
        setLoadingSw(null);
        if(dataNm == 4){
          alert("조회 가능한 상품이 없습니다.");
        }else{
          alert("데이터 요청에 실패하였습니다.");
        }
      }, "1000")
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
              <Nav.Link onClick={()=>{navigate('/axios')}}>Axios</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/useEffect')}}>useEffect</Nav.Link>
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
            {loadingSw === true ? <LoadingCp /> : null}
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
            <button className='cmnBtn' onClick={ajaxFn}>상품 더보기</button>
          </>
        } />
          <Route path='/detail/:id' element={<Context1.Provider value={{stock, shoes}}> <Detail shoes={shoes} /> </Context1.Provider>}>
            <Route path='cart' element={<CartCp/>} />

            <Route path='dscrp' element={<DscrpTab/>}/>
            <Route path='Q&ATab' element={<QandATab/>}/>
            <Route path='reviewTab' element={<ReviewTab/>}/>
          </Route>
        <Route path='/about' element={<About />}>
          <Route path='member' element={<div>멤버임</div>}/>
        </Route>
        <Route path='/event' element={<Event />}>   
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일 기념 쿠폰받기</div>} />
        </Route>
        <Route path='/styled' element={<StyledCp />}/>
        <Route path='/axios' element={<AxiosCp />}/>
        <Route path='/useEffect' element={<Effect />}/>
        <Route path='*' element={<><h1>404</h1><div>없는페이지에요~</div></>}/>
      </Routes>
    </div>
  );
}

function LoadingCp(){
return(
  <>
  <div className='Loadingbar'>
    <span>로딩중...</span>
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
