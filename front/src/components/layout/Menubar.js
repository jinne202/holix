import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import Link from 'next/link';
import { useRouter } from "next/router";
import Fade from 'react-reveal/Fade';

import { hideSidebarRequest } from '../../reducers/layoutReducer';

const Menubar = () => {

    const router = useRouter();

    const svgIconBig = <svg width="70" height="70" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.0795 0.652445C7.27639 0.346828 7.72327 0.346828 7.92015 0.652445L9.03852 2.38842C9.16006 2.57707 9.39241 2.66164 9.60678 2.59525L11.5794 1.98429C11.9266 1.87673 12.269 2.16398 12.2233 2.52465L11.9642 4.57336C11.936 4.796 12.0597 5.01013 12.2666 5.09706L14.1704 5.89699C14.5055 6.03782 14.5831 6.47791 14.3163 6.72487L12.8009 8.1277C12.6363 8.28016 12.5933 8.52366 12.6959 8.72324L13.6401 10.5598C13.8064 10.8831 13.5829 11.2701 13.2198 11.2878L11.1572 11.3883C10.9331 11.3993 10.7437 11.5582 10.694 11.7771L10.2368 13.7908C10.1563 14.1454 9.73639 14.2982 9.44685 14.0784L7.80219 12.8296C7.62346 12.6939 7.3762 12.6939 7.19747 12.8296L5.5528 14.0784C5.26326 14.2982 4.84334 14.1454 4.76285 13.7908L4.30566 11.7771C4.25598 11.5582 4.06657 11.3993 3.84242 11.3883L1.77983 11.2878C1.41672 11.2701 1.19328 10.8831 1.35951 10.5598L2.30372 8.72324C2.40633 8.52366 2.3634 8.28016 2.19871 8.1277L0.683313 6.72487C0.416529 6.47791 0.494128 6.03782 0.829291 5.89699L2.73309 5.09706C2.93999 5.01013 3.06362 4.796 3.03546 4.57336L2.77632 2.52465C2.73069 2.16398 3.07302 1.87673 3.42029 1.98429L5.39288 2.59525C5.60725 2.66164 5.83959 2.57707 5.96113 2.38842L7.0795 0.652445Z" fill="#FF0000"/>
    </svg>

    const dispatch = useDispatch();
    const { showSidebar } = useSelector((state) => state.layoutReducer);

    const handleClickSidebarClose = () => {
        dispatch(hideSidebarRequest());
    };

    return (
        <MenubarWrapper>
            <Fade>
                <FadeWrapper>
                <LeftMenu>
                    <ul>
                        <Link href="/story">
                        <MenuList active={router.pathname == "/story" ? true : false}onClick={handleClickSidebarClose}>Project<MenuHoverCircle>{svgIconBig}</MenuHoverCircle></MenuList>
                        </Link>
                        <Link href="/creatorPage">
                        <MenuList active={router.pathname == "/creatorPage" ? true : false} onClick={handleClickSidebarClose}>Creator&Team<MenuHoverCircle>{svgIconBig}</MenuHoverCircle></MenuList>
                        </Link>
                        {/* 테스트하려고 테스트페이지로 연결시킨 것 */}
                        <Link href="/test">
                        <MenuList active={router.pathname == "/test" ? true : false}onClick={handleClickSidebarClose}>Workshop<MenuHoverCircle>{svgIconBig}</MenuHoverCircle></MenuList>
                        </Link>
                        {/* 테스트하려고 테스트페이지로 연결시킨 것 */}
                        <MenuList>Jobs<MenuHoverCircle>{svgIconBig}</MenuHoverCircle></MenuList>
                        <MenuList>Store<MenuHoverCircle>{svgIconBig}</MenuHoverCircle></MenuList>
                    </ul>
                </LeftMenu>
                <CloseWrapper>
                    <CloseButton onClick={handleClickSidebarClose}></CloseButton>
                </CloseWrapper>
                </FadeWrapper>
                </Fade>
        </MenubarWrapper>
    )
}

const MenubarWrapper = styled.div`
    width : 100%;
    height : 100vh;
    position : fixed;
    z-index : 10;
    overflow : hidden;
    top : 0;
    left : 0;
`

const FadeWrapper = styled.div`
    background-color : black;
    color : white;
    width : 100%;
    height : 100vh;
    display : flex;
    position : fixed;
    top : 0;
    left : 0;
`

const LeftMenu = styled.div`
    margin : 18vh 0 18vh 10%;
    width : 50%;

    & > ul {
        padding : 32px 0 0 0;
        margin : 0;
    }
`

const bounce = keyframes`
  0% {
    transform: scale(1)
  }
  50% {
    transform: scale(1.5)
  }
  100% {
    transform: scale(1)
  }
`;

const rotation = keyframes`
    100% {
    	transform: rotate(360deg);
        transform-origin : 50% 50%;
    }
`

const MenuHoverCircle = styled.span`
    background-color : transparent;
    position : absolute;
    right : 0px;
    top : 8px;
    opacity : 0;
    transition: 0.3s ease all;
    -moz-transition: 0.3s ease all;
    -webkit-transition: 0.3s ease all;
`

const MenuList = styled.li`
    font-size : 80px;
    font-weight : 700;
    display : inline-block;
    margin : 0 100% 30px 0;
    padding : 0 85px 0 0;
    line-height : 100%;
    color : white;
    cursor : pointer;
    position : relative;
    transition: 0.3s ease all;
    -moz-transition: 0.3s ease all;
    -webkit-transition: 0.3s ease all;

    &:hover {
        color : #ff0000;
    }

    &:hover ${MenuHoverCircle}{
        opacity : 1;
    }

    ${props =>
    props.active === true &&
    css`
        color : #ff0000;

        & > ${MenuHoverCircle}{
        opacity : 1;
        animation: ${bounce} 0.3s ease-in,${rotation} 5s linear infinite;
    }
    `
    }
`

const CloseWrapper = styled.div`
    width : 30%;
    margin : 43vh 10% 43vh 0;

`
const CloseButton = styled.div`
    width: 100px;
    height: 100px;
    position: relative;
    float : right;
    cursor: pointer;

    &:after {
        content: '';
        height: 100px;
        border-left: 2px solid #fff;
        position: absolute;
        transform: rotate(45deg);
        left: 48px;
    }

    &:before {
        content: '';
        height: 100px;
        border-left: 2px solid #fff;
        position: absolute;
        transform: rotate(-45deg);
        left: 48px;
    }
`

export default Menubar;