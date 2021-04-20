import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import AppLayout from '../components/archive/ArchiveLayout';


const testt = () => {

  return (
    <AppLayout>
      <TestWrapper>
        <Cursor></Cursor>
        <CursorFollower></CursorFollower>
      </TestWrapper>
    </AppLayout>
  );
}

const TestWrapper = styled.div`
  height : 3000px;
  background-color : black;
  cursor: none;
`

const Cursor = styled.div`
  position: absolute;
  background: white;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  z-index: 1;
  transition: 0.5s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
      0.2s cubic-bezier(0.75, -1.27, 0.3, 2.33) opacity;
  user-select: none;
  pointer-events: none;
  transform: scale(0.8);

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    background-image: url("http://mirkozeppieri.emanuelepapale.com/wp-content/uploads/2018/07/project-hover-cursor.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 100%;
    opacity: 0;
  }
`

const CursorFollower = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 100%;
  z-index: 1;
  transition: 0.6s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
      0.4s cubic-bezier(0.75, -1.27, 0.3, 2.33) opacity;
  user-select: none;
  pointer-events: none;
  transform: translate(4px, 4px);
`


export default testt;