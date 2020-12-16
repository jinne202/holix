import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import Link from 'next/link';
import Scrollbar from 'react-smooth-scrollbar';
import { useRouter } from "next/router";

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import useWindowSize from '../../hooks/useWindowSize';
import Menubar from './Menubar';

const AppLayout = ({ children }) => {

    const windowSize = useWindowSize();

    console.log(windowSize);

    const [mobile, setMobile] = useState(false);
    const { showSidebar } = useSelector((state) => state.layoutReducer);

    useEffect(() => {
        if (windowSize === "lg") {
            setMobile(true)
        } else {
            setMobile(false)
        }
    }, [windowSize]);

    const ScrollWrapper = useRef();

    return (
        <>  
            <NavWrapper>
            {mobile ? <MobileNav/> : <DesktopNav/>}
            </NavWrapper>
            {showSidebar
            ?
            <div></div>
            :
            <Scrollbar style={{height : "100vh"}}
                damping={0.08}
                thumbMinSize={40}
                ref={ScrollWrapper}
            >
            <ContentWrapper>
                {children}
            </ContentWrapper>
            </Scrollbar>
            }
        </>

    )
}

const NavWrapper = styled.div`
    width : 100%;
    position : fixed;
    z-index : 3;
    top : 0;
    left : 0;
    background-color : white;
`

const ContentWrapper = styled.div`
    padding : 82px 79px 0;
    width : 100%;
    position : relative;
    top : 0;
`

export default AppLayout;