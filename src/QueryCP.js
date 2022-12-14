import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

function QueryCP() {

  // react-query 라이브러리 사용
  // 지속적으로 데이터 갱신이 필요할 경우 사용한다. (메신저, 거래소 등등) (사용하는 곳은 많지는 않지만 인기있는 라이브러리)
  // 장점 1) 성공/실패/로딩중 쉽게 파악가능
  // 장점 2) 자동으로 refetch(데이터 갱신)를 해준다.
  // 장점 3) 데이터 요청 실패시 retry를 알아서 해준다.
  // 장점 4) state 공유 안해도 된다. (react-query에서 자동으로 하나만 사용한다.)
  // 장점 5) 캐싱기능 : 먼저 요청한 결과를 우선 보여주고 다음에 get 요청을한다.

  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((obj)=>{
      return obj.data
    }),
    // 타이머 같은 기능도 있다.
    {staleTime : 2000}
  );
  // console.log("데이터 로딩 요청 : " + result.isLoading);
  // console.log("데이터 에러 요청 : " + result.error);

return (
<>
  {/* react-query 라이브러리 사용 */}
  <div>{result.isLoading ? '로딩중' : result.data.name}</div>
  <div>
    {result.isLoading && 'Loading'}
    {result.error && 'error'}
    {result.data && result.data.name}
  </div>
</>
);
}

export default QueryCP;