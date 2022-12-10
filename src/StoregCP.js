import React from 'react';

function StoregCP() {

  // 로컬스토리지 / 세션스토리지
  // 입력
  localStorage.setItem('age', '20');
  sessionStorage.setItem('age', '20');
  // 출력
  localStorage.getItem('age');
  sessionStorage.getItem('age');
  // 삭제
  localStorage.removeItem('age');
  sessionStorage.removeItem('age');

  //array / object 저장
  let obj = {name : 'kim'}
  localStorage.setItem('data', JSON.stringify(obj)); //JSON.stringify(데이터) JSON 파일로 변환
  
  let dataGet = localStorage.getItem('data'); // array / object 출력
  JSON.parse(dataGet); // JSON.parse(데이터) JSON 
  console.log(dataGet);

  return (
    <>
    <h4>storeg 사용하기</h4>
    </>
  );
}
export default StoregCP;
