import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import Link from 'next/link';
import Scrollbar from 'react-smooth-scrollbar';
import { useRouter } from "next/router";

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import useWindowSize from '../../hooks/useWindowSize';

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

    // !-- HEADER 높이
    const [header, setHeader] = useState(false);
    const listenScrollEvent = event => {
        if (window.scrollY < 199) {
        return setHeader(false);
        } else if (window.scrollY > 200) {
        return setHeader(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);

    console.log(header);
    // !-- HEADER 높이

    return (
        <> 
            <NavWrapper>
            {mobile ? <MobileNav/> : <DesktopNav/>}
            </NavWrapper>
            {showSidebar
            ?
            <div></div>
            :
            <ContentWrapper header={header}>
                {children}
            </ContentWrapper>
            }
        </>

    )
}

const NavWrapper = styled.div`
    width : 100%;
    position : fixed;
    z-index : 100;
    top : 0;
    left : 0;
    background-color : white;
`

const ContentWrapper = styled.div`
    width : 100%;
    position : relative;
    top : 0;
    padding : 82px 0 0 0;
`

export default AppLayout;