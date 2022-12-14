import React, { lazy } from "react";

// lazy() 와 <Suspense>
// 필요할때만 import해서 그때그때 사용하게 된다.
// 장점 : 초기 렌더링 성능을 개선을 할 수 있다.
// 단점 : 파일이 분리가 되어서 lazy한 컴포넌트들은 로딩시간이 있을 수 있다.
//         ㄴ 단점을 해결하기 위해 <Suspense>를 이용해 로딩화면 등을 노출해줄 수 있다.

// import Detail from './routes/Detail.js';
// import CartCp from './routes/CartCp';

const Detail = lazy(()=>import('./routes/Detail.js'));
const CartCp = lazy(()=>import('./routes/CartCp'));

// <Suspense> 는 App.js <Routes> 부분을 참조.

export function LazyAndSuspenseCP() {
  return (
    <div>Lazy & Suspense</div>
  );
}

export default LazyAndSuspenseCP;