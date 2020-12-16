import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Scrollbar from 'react-smooth-scrollbar';


const testt = () => {

  const [header, setHeader] = useState(false);

  const listenScrollEvent = event => {
    if (window.scrollY < 140) {
      return setHeader(false);
    } else if (window.scrollY > 140) {
      return setHeader(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  console.log(header);

  return (
    <WrappAll>
      <MenuWrapper header={header}>
        <p>메뉴 높이 확인하기</p>
      </MenuWrapper>
      <div style={{width : "200px", margin : "0 auto", padding : "82px 0 0 0"}}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
      <div style={{width : "200px", margin : "0 auto"}}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
      <div style={{width : "200px", margin : "0 auto"}}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
    </WrappAll>
  );
}

const WrappAll = styled.div`
  width : 100%;
  border : 1px solid blue;
`

const MenuWrapper = styled.div`
  background-color : black;
  height : 82px;
  width : 100%;
  position: fixed;
  overflow: hidden;
  top : 0;
  left : 0;
  z-index : 99;
  transition: 1s ease all;
  -moz-transition: 1s ease all;
  -webkit-transition: 1s ease all;

  & > p {
    color : white;
    margin : 0;
  }

  ${props =>
    props.header === true &&
    css`
        height : 40px;
    `}
`

export default testt;