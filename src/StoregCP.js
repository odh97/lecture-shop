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

  //작업 하면서 arr/obj push를 쉽게 하는법
  //obj
  let storegData = JSON.parse(localStorage.getItem('data'));
  storegData.Phone = '1234-5678';
  console.log(storegData);

  //arr
  let arr = [1,2,3,4];
  localStorage.setItem('arrEx', JSON.stringify(arr));

  let arrGet = JSON.parse(localStorage.getItem('arrEx'));
  arrGet.push(5,6,7);
  console.log(arrGet);

  return (
    <>
    <h4>storeg 사용하기</h4>
    </>
  );
}
export default StoregCP;
