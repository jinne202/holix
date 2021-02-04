import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const CustomCursor = () => {

  const mainCursor = useRef(null);
  const secondaryCursor = useRef(null);

  const positionRef = useRef({
    mouseX : 0,
    mouseY : 0,
    destinationX : 0,
    destinationY : 0,
    distanceX : 0,
    distanceY : 0,
    key : -1,
  });

  useEffect(() => {
      addEventListeners();
      return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
  };

  const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    const mouseX = clientX;
    const mouseY = clientY;

    positionRef.current.mouseX = mouseX - secondaryCursor.current.clientWidth/2;
    positionRef.current.mouseY = mouseY - secondaryCursor.current.clientHeight/2;

    mainCursor.current.style.transform = `translate3d(${mouseX -
      mainCursor.current.clientWidth / 2}px, ${ mouseY -
      mainCursor.current.clientHeight /2}px, 0)`;
  }

  useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);
      const { mouseX, mouseY, destinationX, destinationY, distanceX, distanceY} = positionRef.current;
      if (!destinationX | !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1;

        if(Math.abs(positionRef.current.distanceX) + Math.abs(positionRef.current.distanceY) < 0.1) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }
        if(secondaryCursor.current.style){
          secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
        }
    };

    followMouse();
  }, []);

  return (
        <div>
            <Cursor ref={mainCursor}></Cursor>
            <CursorFollower ref={secondaryCursor}></CursorFollower>
        </div>
  );
}

const Cursor = styled.div`
  z-index : 1000;
  border-radius : 50%;
  width : 8px;
  height : 8px;
  background-color : black;
  pointer-events : none;
  overflow: hidden;
  transform : translate3d(0, 0, 0);
  position : fixed;
`

const CursorFollower = styled.div`
  z-index : 1000;
  border-radius : 50%;
  width : 40px;
  height : 40px;
  border : 1px solid black;
  pointer-events : none;
  overflow: hidden;
  transform : translate3d(0, 0, 0);
  position : fixed;
`


export default CustomCursor;