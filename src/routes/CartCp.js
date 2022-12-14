import React, { memo, useMemo } from 'react'
import {Table} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux"
import {changeName, changeAge} from '../store/user'
import {changePrdc} from '../store/store.js'


// 성능 향상
// 컴포넌트 재랜더링 관리
// meomo 사용법
// meomo는 props가 변할 때만 재렌더링을 한다. (기존 props 와 신규 props를 비교를 한다)
// 재렌더링이 오래걸리는 컴포넌트에 적용하면 좋을거 같다.
// props가 길고 복잡한 곳에 사용하면 오히려 단점으러 작용할 수 있다.
let Child = memo(function(){
return(
  <div>
    <div>memo 함수</div>
  </div>
)
})

//useMemo 사용법
function Child2(){
return(
  <div>
    <div>useMemo 함수</div>
  </div>
)
}

function CartCp() {
  
let dispatch = useDispatch();

let stateRd =  useSelector((state)=>{ return state });
let productRd =  useSelector( (data)=> data.product );

//useMemo 사용법
//useEffect 처럼 사용이 가능하다.
//useEffect 와 useMemo의 차이
  // useMemo   : render 시작하기 전에 실행
  // useEffect : 컴포넌트 렌더링이 끝난 후 실행
let result = useMemo(()=>{return Child2}, []);

return (
  <>
  <h6>이름 : {stateRd.user.name}</h6>
  <h6>나이 : {stateRd.user.age}</h6>
  <button onClick={()=>{dispatch(changeAge(123))}}>나이 버튼</button>
  <Table>
  <thead>
      <tr>
      <th>#</th>
      <th>상품명</th>
      <th>수량</th>
      <th>추가</th>
      </tr>
  </thead>
  <tbody>
      {productRd.map((value, index)=>{
        return(
          <tr key={index}>
            <td>{value.id}</td>
            <td>{value.name}</td>
            <td>{value.count}</td>
            <td><button onClick={()=>{ dispatch(changePrdc(value.id)) }}>+</button></td>
          </tr>
        )
      })}
  </tbody>
  </Table>
  <Child/>
  </>
)
}





export default CartCp;