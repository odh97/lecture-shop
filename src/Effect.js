import React, {useState, useEffect, useContext} from "react";
import { Outlet } from 'react-router-dom';

function Effect() {

  useEffect(() => {
    //mount, update시 코드 실행해주는 useEffect
    //동작원리 : HTML이 렌더링 후에 동작
    //어디다 쓰면 좋은가
    //1) 어려운 연산
    //2) 서버에서 데이터 가져오는 작업
    //3) 시간이 오래걸리는 작업(유튜브 동영상 5천개 or 만개 가져오기 등등)
    return () => {
      //사용 방식 : 일단 return이 실행이되고 다음으로 useEffect가 실행된다.
      //코드 ~~~~~~~~~
      //기존 코드를 삭제할때 많이 사용 
      //dependancy(두번째 인자로 넘기는 배열)가 바뀌어서 effect가 달라져야할 때 (이전 effect 청소)
    };
  });

  useEffect(() => { }); // 1.재렌더링마다 코드 실행하고 싶으면
  useEffect(() => { }, []); // 2.mount시 1회 코드 실행하고 싶으면
  useEffect(() => { }, [ /*변수*/]); // 2-1.특정 state가 변했을때(재렌더링) 마다 실행하고 싶으면
  useEffect(() => { return () => { }; }, []); // 3.unmount 1회 코드실행하고 싶으면

  return (
    <>
      <h4>useEffect</h4>
      <Outlet></Outlet>
    </>
  );
}

export default Effect;