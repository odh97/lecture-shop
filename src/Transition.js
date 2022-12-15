import React, { useDeferredValue, useState, useTransition } from "react";

function Transition() {
  
  // useTransition 와 useDeferredValue
  // 렌더링 성능이 저하되는 컴포넌트에서 쓸 수 있는 기능

  let a = new Array(10000).fill(0);

  let [name, setName] = useState("");
  let [isPending, startTransition] = useTransition();
  let state = useDeferredValue(name);

  return (
    <>
      <h4>useTransition Test</h4>
      <input onChange={(e)=>{
        startTransition(()=>{
          setName(e.target.value)
        }) 
        }} />
      {
      isPending ? '로딩중' :
      a.map(()=>{
        return <div>{state}</div>
      })
      }
    </>
  );
}
export default Transition;