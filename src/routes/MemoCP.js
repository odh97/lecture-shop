import React, { memo, useMemo } from 'react';

// 성능 향상
// 컴포넌트 재랜더링 관리
// meomo 사용법
// meomo는 props가 변할 때만 재렌더링을 한다. (기존 props 와 신규 props를 비교를 한다)
// 재렌더링이 오래걸리는 컴포넌트에 적용하면 좋을거 같다.
// props가 길고 복잡한 곳에 사용하면 오히려 단점으러 작용할 수 있다.

function MemoCP() {

  // useMemo 사용법
  // useEffect 처럼 사용이 가능하다.
  // useEffect 와 useMemo의 차이
  // useMemo   : 컴포넌트 렌더링 시작 전에 실행
  // useEffect : 컴포넌트 렌더링이 끝난 후 실행
  let result = useMemo(()=>{return Child2}, []);
  
return (
  <>
    <div>Child</div>
    <Child/>
    <Child2/>
  </>
)}

let Child = memo(function(){
  return (
    <div>
      <div>memo 함수</div>
    </div>
  );
});


function Child2(){
return(
  <div>
    <div>useMemo 함수</div>
  </div>
)}

export default MemoCP;