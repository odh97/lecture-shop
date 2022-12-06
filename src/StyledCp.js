//스타일드 사용법
import React from 'react';
import styled from 'styled-components';

let YellowBtn = styled.button`
  background: ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`;
let NewBtn = styled.button(YellowBtn);

function StyledCp() {
  return (
    <>
      {/* 스타일드 적용 */}
      <div className='styledBox'>
        <YellowBtn bg="blue">스타일드 사용 해보기 A</YellowBtn>
        <YellowBtn bg="yellow">스타일드 사용해보기 B</YellowBtn>
      </div>
    </>
  );
}

export default StyledCp;
