import React, {useState, useEffect, useContext} from "react";
import { Nav } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import {Routes, Route, Link, useNavigate, Outlet, json} from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Context1 } from "../App";
import { addPrdc } from "../store/store";

const Detail = (props)=>{

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let {id} = useParams();
  
  // 숫자 필터
  let idData = id;
  let filterNm = /[^0-9]/g;
  let filterId = idData.replace(filterNm, "");

  let ImgNm = Number(filterId)+1;

  // 장바구니 로컬 데이터 저장
  useEffect(()=>{
    let storegArr = JSON.parse(localStorage.getItem('prdcId'));
  
    if( storegArr.findIndex((e)=>{return e === Number(filterId)}) === -1 ){
      storegArr.unshift(Number(filterId));
      localStorage.setItem('prdcId', JSON.stringify(storegArr));
    }
  
    if(storegArr.length >= 4){
  
      for(let i=0; i < storegArr.length; i++){
        if(storegArr.length >= 4){
          console.log(storegArr);
          storegArr.pop();
          localStorage.setItem('prdcId', JSON.stringify(storegArr));
        }
      }

    }
  }, [])

  //필터를 이용한 추출
  // let shoesFilter = props.shoes.filter(value => (value.id===Number(filterId)));

  //내가 만든 데이터 필터
  let PropsData = [];
  for(let i=0; i < props.shoes.length; i++){
    if(Number(filterId) === props.shoes[i].id){
      PropsData = props.shoes[i];
    }
  }

  //내가 만든 타임 이벤트 박스
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     let timeBtn = document.getElementById('saleBtn');
  //     timeBtn.style.display = 'none';
  //   }, 2000);
  // }, [count]);

  let [sale, setSale] = useState(true);

  //삼항 연산자를 이용한 타임 이벤트 박스
  useEffect(()=>{
  let resetTime = setTimeout(()=>{setSale(false);}, 2000);
  return()=>{
    clearTimeout(resetTime);
  }
  });

  //인풋 값 필터
  let [inputVal, setInputVal] = useState(null);
  const regexr = /^\d+$/;

  useEffect(()=>{

    //내가 만든 인풋 값 필터
    // if(regexr.test(inputVal) != true && !inputVal == ""){
    //   let copy = inputVal;
    //   let filtCopy = copy.replace(filterNm, "");

    //   document.getElementById("purchInput").value = filtCopy;
    //   setInputVal(filtCopy);
    //   alert("숫자만 입력해주세요.");
    // }

    if(isNaN(inputVal) == true){
      let copy = inputVal;
      let filtCopy = copy.replace(filterNm, "");

      document.getElementById("purchInput").value = filtCopy;
      setInputVal(filtCopy);
      alert("숫자만 입력해주세요.");
    }

  }, [inputVal]);

  let [tabSw, setTabSw] = useState(0);
  let [scrnOn, setScrnOn] = useState("");

  useEffect(()=>{
    setScrnOn("end");
  }, [])

  return(
    <div className={`start ${scrnOn}`}>
      {sale === true ? <div id="saleBtn">2초 안에 누르면 할인!!!</div> : null}
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes"+(ImgNm)+".jpg"} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{PropsData.title}</h4>
            <p>{PropsData.content}</p>
            <p>{PropsData.price}</p>
            <div>
              <input id="purchInput" placeholder= {"금액을 적어주세요"} type={"text"} onChange={(e)=>{setInputVal(e.target.value);}} />
            </div>
            <button className="btn btn-danger" onClick={()=>{ dispatch(addPrdc( {id : PropsData.id, name : PropsData.title, count : 1} ))}}>주문하기</button>
          </div>
        </div>      
      </div>
      <div>
        <Nav variant="tabs"  defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={()=>{navigate('/detail/'+id+'/dscrp')}}>상세 페이지</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={()=>{navigate('/detail/'+id+'/reviewTab')}}>리뷰</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={()=>{navigate('/detail/'+id+'/Q&ATab')}}>Q&A</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link3" onClick={()=>{navigate('/detail/'+id+'/cart')}}>장바구니</Nav.Link>
          </Nav.Item>
        </Nav>
        <Outlet></Outlet>
      </div>
      <div style={{marginTop : "150px"}}>
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={()=>{setTabSw(0);}}>내용0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={()=>{setTabSw(1);}}>내용1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={()=>{setTabSw(2);}}>내용2</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tabSw={tabSw} />
      </div>
    </div>
    )
  }

function TabContent({tabSw, props2}){

  // context API
  // 잘 사용은 안한다.
  // 1) 성능 이슈
  // 2) 컴포넌트 재사용 어려움

  let {stock, shoes} = useContext(Context1);
  let contextData = useContext(Context1);

  let [clsStick, setClsStick]=useState("");

  useEffect(()=>{
    setTimeout(()=>{
      setClsStick("end");
    })
    
    return ()=>{
      setClsStick("")
    }
  }, [tabSw])

  if(tabSw == 0){
    return <div className={"start "+clsStick}>{shoes[0].title}</div>
  }else if(tabSw == 1){
    return <div className={`start ${clsStick}`}>내용1</div>
  }else if(tabSw == 2){
    return <div className={"start "+clsStick}>내용2</div>
  }
  // return [<div>내용00</div>, <div>내용11</div>, <div>내용22</div>][tabSw]
}



export default Detail;