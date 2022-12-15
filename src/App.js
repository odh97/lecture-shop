// rfce 함수형
import { createContext, lazy, Suspense, useEffect, useState, useTransition } from 'react';
import { Button,Navbar,Container,Nav,Dropdown } from 'react-bootstrap';
import './App.css';
import bannerBg from './img/bgimg.png';
import AxiosCp from './routes/AxiosCp';
import StyledCp from './StyledCp';
import Effect from './Effect.js'
import QuarterCP from './QuarterCP';
import StoregCP from './StoregCP';
import RecentPrdcCP from './RecentPrdcCP';
import QueryCP from './QueryCP';
import {DscrpTab, QandATab, ReviewTab} from './routes/DetailTabList';

// export 사용
import {a, b} from './data/test.js';
import 작명2 from './data/test2';
import data from './data/data';

// 라우터 사용법
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';

// axios 사용법
import axios from 'axios';
import { useQuery } from 'react-query';
import { LazyAndSuspenseCP } from './LazyAndSuspenseCP';

//state보관함
export let Context1 = createContext();

// lazy() 와 <Suspense>
const Detail = lazy(()=>import('./routes/Detail.js'));
const CartCp = lazy(()=>import('./routes/CartCp'));
const Transition = lazy(()=>import('./Transition'));

//컴포넌트
function App() {
  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10,11,12]);
  let [loadingSw, setLoadingSw] = useState(false);
  let navigate = useNavigate();

  //react-query 라이브러리 사용 (메신저, 거래소 등등에서 갱신이 자주 필요한 곳에서 사용)
  let result = useQuery('resultQuery', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((obj)=>{
      return obj.data
    })
  );

  // 로컬 데이터 저장 공간 관리
  useEffect(()=>{
    let arrCheck = localStorage.getItem('prdcId');

    if(arrCheck === null){
      localStorage.setItem('prdcId', JSON.stringify( [] ));
      console.log("로컬 데이터 저장 공간 확보");
    }else{
      console.log("기존 로컬 데이터 자료를 사용합니다.");
    }
  }, [])
  
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
            <Navbar.Brand href="/">Shop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/event')}}>Event</Nav.Link>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">Learn List</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>{navigate('/styled')}}>Styled</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate('/axios')}}>Axios</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate('/useEffect')}}>useEffect</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate('/quarter')}}>if문</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate('/storeg')}}>storeg</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate('/query')}}>react-query</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate('/las')}}>Lazy & SuspenseCP</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate('/transition')}}>Transition</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            {/* react-query 라이브러리 사용 */}
            <Nav className='ms-auto'>{result.isLoading ? '로딩중' : result.data.name}</Nav>
          </Container>
        </Navbar>
      </nav>
      <div className='linkNav'>
        <span>Link Nav</span>
        <Link to="/">Home</Link>
        <Link to="/detail/0">상세페이지</Link>
      </div>
      <Suspense fallback={<div>로딩중</div>}>
      <Routes>
        <Route path='/' element={
          <>
            {loadingSw === true ? <LoadingCp /> : null}
            <RecentPrdcCP />
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
        <Route path='/quarter' element={<QuarterCP />}/>
        <Route path='/storeg' element={<StoregCP />}/>
        <Route path='/query' element={<QueryCP />}/>
        <Route path='/las' element={<LazyAndSuspenseCP />}/>
        <Route path='/transition' element={<Transition />}/>
        <Route path='*' element={<><h1>404</h1><div>없는페이지에요~</div></>}/>
      </Routes>
      </Suspense>
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