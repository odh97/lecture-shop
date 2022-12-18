import React, { useEffect } from 'react'
import axios from 'axios'

function AxiosCp() {
  /*
//post : 서버에 데이터를 보낼 수 있다.
axios.post('/url', {name : 'value'})
.then(()=>{

})
.catch(()=>{
  // console.log( "1) 아마 안 될겁니다." )
})

//동시에 ajax 요청을 여러개 할때 사용
Promise.all([ axios.get('/url1'), axios.get('/url1') ])
.then(()=>{

})
.catch(()=>{
  // console.log( "2) 아마 안 될겁니다." )
})

//기본적인 javascript문법
fetch('https://codingapple1.github.io/shop/data2.json')
.then(resopons => resopons.json())
.then(data=>{
  // console.log( "fetch ajax 요청" );
  // console.log(data);
})
.catch(()=>{
  // console.log( "error" )
})



 */






useEffect(()=>{


  let axiosData = async () =>{
    const DataGET = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log("async / await data check");
    console.log(DataGET);
    console.log(DataGET.data);
  }
  
  async function axiosData2 (){
    console.log("start");
    await axiosData();
    console.log("end");
  }
  axiosData2();




}, []);




return (
  <>
    <h3>Axios</h3>
    <div></div>
  </>
)
}

export default AxiosCp