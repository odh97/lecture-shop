import { getValue } from "@testing-library/user-event/dist/utils";
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
  });


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

  
  
  

  useEffect(()=>{

    setTimeout(()=>{
      let timeBtn = document.getElementById('saleBtn');
      timeBtn.style.display = 'none';

    }, 2000);
  });
 

  return(
    <>
      <div id="saleBtn">2초 안에 누르면 할인!!</div>
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
      </div>
    </> 
    )
    
}


export default Detail;