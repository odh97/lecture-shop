import React, {useState, useEffect} from "react";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import { useParams } from "react-router-dom";

const Detail = (props)=>{

  useEffect(()=>{
    //mount, update시 코드 실행해주는 useEffect
    //동작원리 : HTML이 렌더링 후에 동작
    //어디다 쓰면 좋은가
    //1) 어려운 연산
    //2) 서버에서 데이터 가져오는 작업
    //3) 시간이 오래걸리는 작업(유튜브 동영상 5천개 or 만개 가져오기 등등)

    return ()=>{
      //사용 방식 : 일단 return이 실행이되고 다음으로 useEffect가 실행된다.
      //코드 ~~~~~~~~~
      //기존 코드를 삭제할때 많이 사용 
      //dependancy(두번째 인자로 넘기는 배열)가 바뀌어서 effect가 달라져야할 때 (이전 effect 청소)

    }
  });

  useEffect(()=>{})                         // 1.재렌더링마다 코드 실행하고 싶으면
  useEffect(()=>{}, [])                     // 2.mount시 1회 코드 실행하고 싶으면
  useEffect(()=>{}, [/*변수*/])             // 2-1.특정 state가 변했을때(재렌더링) 마다 실행하고 싶으면
  useEffect(()=>{    return()=>{   }}, [])  // 3.unmount 1회 코드실행하고 싶으면

  let {id} = useParams();
  
  // 숫자 필터
  let idData = id;
  let filterNm = /[^0-9]/g;
  let filterId = idData.replace(filterNm, "");

  let ImgNm = Number(filterId)+1;

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
  let resetTime =  setTimeout(()=>{setSale(false);}, 2000);
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


  return(
    <>
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
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
        <input id="purchInput" placeholder= {"금액을 적어주세요"} type={"text"} onChange={(e)=>{setInputVal(e.target.value);}} />
      </div>
    </>
    )
}


export default Detail;