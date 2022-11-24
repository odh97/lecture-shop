import {useState, useEffect} from "react";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import { useParams } from "react-router-dom";

const Detail = (props)=>{

  let {id} = useParams();
  
  // 숫자 필터
  let idData = id;
  let filterNm1 = /[^0-9]/g;
  let filterNm2 = idData.replace(filterNm1, "");
  let filterId = Number(filterNm2)+1; 
  
  return(
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes"+(filterId)+".jpg"} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{props.shoes[filterId].title}</h4>
            <p>{props.shoes[filterId].content}</p>
            <p>{props.shoes[filterId].price}</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      </div>
    </> 
    )
}
export default Detail;