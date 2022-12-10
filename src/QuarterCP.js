import React from "react";

function QuarterCP() {
  return (
    <>
      <h4>많이 사용하는 if문에 대해 정리</h4>
    </>
  );
}

// 컴포넌트 안에서 if/else
// return안에 쓰는건 불가능
// 보통 return + JSX 전체를 노출시키는 if문을 작성해서 사용
function if문1() {
  if(true){
    return <p>참이면 보여줄 HTML</p>
  }else{
    return null;
  }
};

// JSX안에서 쓰는 삼항연산자와 중첩 사용
function 삼항연산자() {
  return(
    <div>
      {
      1===1
      ?<div>참이면 보여줄 HTML</div>
      :null
      }
    </div>
  )
};
function 삼항연산자2() {
  return(
    <div>
      {
      1===1
      ? <div>참이면 보여줄 HTML</div>
      : (2===2
        ? <p>안녕하세요</p>
        : <p>반갑습니다</p>
        )
      }
    </div>
  )
};

// &&연산자 if 역할 대신하기
// false가 나오면 HTML로 렌더링하지 않는다 (삼항연산자를 대체 가능)
function 논리연산자() {
  return(
    <div>
      { 1 === 1 && <p>참이면 보여줄 HTML</p> }
    </div>
  )
};

// switch / case 조건문
// if문이 중첩해서 여러개 있을 경우 사용하면 좋다
function 기본if문사용() {
  let user = 'seller';
  if (user === 'seller'){
    return <h4>판매자 로그인</h4>
  } else if (user === 'customer'){
    return <h4>구매자 로그인</h4>
  } else {
    return <h4>그냥 로그인</h4>
  }
};

function switch문사용(){
  var user = 'seller';
  switch (user){
    case 'seller' :
      return <h4>판매자 로그인</h4>
    case 'customer' :
      return <h4>구매자 로그인</h4>
    default : 
      return <h4>그냥 로그인</h4>
  }
}

// object/array 자료형 응용
// 경우에 따라서 다른 html 태그들을 보여주고 싶은 경우 사용 가능하다
function object응용1() {
  var 현재상태 = 'info';
  return (
    <div>
      {
        { 
           info : <p>상품정보</p>,
           shipping : <p>배송관련</p>,
           refund : <p>환불약관</p>
        }[현재상태]
      }
    </div>
  )
};

function object응용2() {
  var 현재상태 = 'info';
  return (
    <div>
      {
        { 
           info : <p>상품정보</p>,
           shipping : <p>배송관련</p>,
           refund : <p>환불약관</p>
        }[현재상태]
      }
    </div>
  )
};

export default QuarterCP;