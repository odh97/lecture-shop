import React from 'react'
import {Table} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux"
import {changeName, changeAge} from '../store/user'
import {changePrdc} from '../store/store.js'

function CartCp() {
  
  let dispatch = useDispatch();

  let stateRd =  useSelector((state)=>{ return state });
  let productRd =  useSelector((data)=> data.product );
  


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
    </>
  )
}

export default CartCp;