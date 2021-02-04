import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import AppLayout from '../components/layout/AppLayout';
import dynamic from 'next/dynamic'
import AnimatedCursor from "react-animated-cursor"


const testt = () => {

  // const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  //   ssr: false
  // });

  return (
    <div style={{cursor : "none"}}>
    {/* <AnimatedCursor
      innerSize={8}
      outerSize={8}
      color='0, 0, 0'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
    /> */}
    <AppLayout>
      <TestWrapper>
        아아아아아아아아아아아아아아아아아아아아아ㅏ아아아아아아아ㅏ
        <a>랄라라</a>
      </TestWrapper>
    </AppLayout>
    </div>
  );
}

const TestWrapper = styled.div`
  font-size : 200px;
`

export default testt;