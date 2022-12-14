import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecentPrdcCP() {

  let navigate = useNavigate();

  let arrGet = JSON.parse( localStorage.getItem('prdcId') );

  return (
    <div className='recentPrdc'>
      <h4>CART</h4>
      <table>
        <thead>
          <tr>
            <th>최근 본 상품</th>
          </tr>
        </thead>
        <tbody>
          {
          arrGet === null
          ? null
          : arrGet.map((val, i) => {
            return (
              <tr key={i}>
                <td><img onClick={()=>{navigate('/detail/'+(arrGet[0])+'')}} src={"https://codingapple1.github.io/shop/shoes" + (arrGet[i] + 1) + ".jpg"} /></td>
              </tr>
            );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default RecentPrdcCP;
