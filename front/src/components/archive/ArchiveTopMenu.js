import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import Link from 'next/link';
import { useRouter } from "next/router";
import { LOG_OUT_REQUEST } from 'reducers/userReducer';


const ArchiveTopMenu = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const svgIcon = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.0795 0.652445C7.27639 0.346828 7.72327 0.346828 7.92015 0.652445L9.03852 2.38842C9.16006 2.57707 9.39241 2.66164 9.60678 2.59525L11.5794 1.98429C11.9266 1.87673 12.269 2.16398 12.2233 2.52465L11.9642 4.57336C11.936 4.796 12.0597 5.01013 12.2666 5.09706L14.1704 5.89699C14.5055 6.03782 14.5831 6.47791 14.3163 6.72487L12.8009 8.1277C12.6363 8.28016 12.5933 8.52366 12.6959 8.72324L13.6401 10.5598C13.8064 10.8831 13.5829 11.2701 13.2198 11.2878L11.1572 11.3883C10.9331 11.3993 10.7437 11.5582 10.694 11.7771L10.2368 13.7908C10.1563 14.1454 9.73639 14.2982 9.44685 14.0784L7.80219 12.8296C7.62346 12.6939 7.3762 12.6939 7.19747 12.8296L5.5528 14.0784C5.26326 14.2982 4.84334 14.1454 4.76285 13.7908L4.30566 11.7771C4.25598 11.5582 4.06657 11.3993 3.84242 11.3883L1.77983 11.2878C1.41672 11.2701 1.19328 10.8831 1.35951 10.5598L2.30372 8.72324C2.40633 8.52366 2.3634 8.28016 2.19871 8.1277L0.683313 6.72487C0.416529 6.47791 0.494128 6.03782 0.829291 5.89699L2.73309 5.09706C2.93999 5.01013 3.06362 4.796 3.03546 4.57336L2.77632 2.52465C2.73069 2.16398 3.07302 1.87673 3.42029 1.98429L5.39288 2.59525C5.60725 2.66164 5.83959 2.57707 5.96113 2.38842L7.0795 0.652445Z" fill="#FF0000"/>
    </svg>

    const { myAccountInfo } = useSelector((state) => state.userReducer);

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
    
    const handleLogout = () => {
        dispatch({
            type: LOG_OUT_REQUEST
        });
    }

    // !-- HEADER 높이

    return (
        <>
            <MenuWrapper header={header}>
                <LeftMenu>
                    <LeftMenuUl header={header}>
                        <Link href="/story">
                        <MenuList active={router.pathname == "/story" ? true : false}>Project<MenuHoverCircle>{svgIcon}</MenuHoverCircle></MenuList>
                        </Link>
                        <Link href="/creatorPage">
                        <MenuList active={router.pathname == "/creatorPage" ? true : false}>Creator&Team<MenuHoverCircle>{svgIcon}</MenuHoverCircle></MenuList>
                        </Link>
                        <MenuList>Workshop<MenuHoverCircle>{svgIcon}</MenuHoverCircle></MenuList>
                        <MenuList>Jobs<MenuHoverCircle>{svgIcon}</MenuHoverCircle></MenuList>
                        <Link href="/store">
                            <MenuList>Store<MenuHoverCircle>{svgIcon}</MenuHoverCircle></MenuList>
                            </Link>
                    </LeftMenuUl>
                </LeftMenu>
                <LogoWrapper>
                    <Logo header={header}>
                        Holix
                        <LogoIcon header={header}>
                            {svgIcon}
                        </LogoIcon>
                    </Logo>
                </LogoWrapper>
                <RightMenu>
                    {myAccountInfo ?
                        <AfterLoginWrapper header={header}>
                            <LoginUserName>{myAccountInfo.nickname}</LoginUserName>
                            <LoginUserPhoto>
                                {/*<img src={} alt="유저이미지"/>*/}
                            </LoginUserPhoto>
                            <LoginWrapper header={header}>
                                <ul>
                                    <LoginMenuList onClick={handleLogout}>Logout</LoginMenuList>
                                    <Link href="archive/edit"><LoginMenuList>
                                        <ProjectBtn header={header}>
                                            Project Submit
                                        </ProjectBtn></LoginMenuList></Link>
                                </ul>
                            </LoginWrapper>
                        </AfterLoginWrapper>
                    :
                        <BeforeLoginWrapper>
                            <LoginText header={header}>Are you a holixer?</LoginText>
                            <LoginWrapper header={header}>
                                <ul>
                                    <Link href="/register"><LoginMenuList>Register</LoginMenuList></Link>
                                    <Link href="/login"><LoginMenuList>Login</LoginMenuList></Link>
                                </ul>
                            </LoginWrapper>
                        </BeforeLoginWrapper>
                    }
                </RightMenu>
            </MenuWrapper>
        </>

    )
}

const MenuWrapper = styled.div`
    height : 82px;
    display : flex;
    font-family: 'Noto Sans KR', sans-serif;
    padding : 0 79px;

    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    ${props =>
    props.header === true &&
    css`
        height : 56px;
    `}
`

const LeftMenu = styled.div`
    margin : 0;
    width : 45%;
`

const LeftMenuUl = styled.ul`
    padding : 32px 0 0 0;
    margin : 0;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    ${props =>
    props.header === true &&
    css`
        padding : 19px 0 0 0;
    `}
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
    }
`

const MenuHoverCircle = styled.span`
    width : 16px;
    height : 16px;
    background-color : white;
    position : absolute;
    right : -25px;
    top : 1px;
    opacity : 0;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
`

const MenuList = styled.li`
    font-size : 18px;
    font-weight : 700;
    display : inline-block;
    margin : 0 48px 0 0;
    line-height : 100%;
    color : black;
    cursor : pointer;
    position : relative;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

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

const LogoWrapper = styled.div`
    width : 10%;
    position : relative;
`

const Logo = styled.h1`
    font-size : 36px;
    line-height : 100%;
    font-weight : 900;
    width : 100px;
    margin : 22px 0 0;
    display : block;
    text-align : center;
    position : relative;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    ${props =>
    props.header === true &&
    css`
        font-size : 20px;
        margin : 18px 0 0;
    `}
`

const LogoIcon = styled.span`
    position : absolute;
    right : -18px;
    top : 12px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
    width : 16px;
    height : 16px;

    & > svg {
            width : 100%;
            position : absolute;
            top : 0;
            left : 0;
        }

    ${props =>
    props.header === true &&
    css`
        width : 16px;
        height : 16px;
        right : 3px;
        top : 3px;
        position : absolute;

        & > svg {
            width : 100%;
        }
    `}
`

const RightMenu = styled.div`
    width : 45%;
    display : flex;
    justify-content : flex-end;
`

const BeforeLoginWrapper = styled.div`
`

const AfterLoginWrapper = styled.div`
    display : flex;
    margin : 21px 35px 0 0;

    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    ${props =>
    props.header === true &&
    css`
        margin : 8px 35px 0 0;
    `}
`

const LoginUserName = styled.p`
    margin : 10px 9px 0 0;
    font-size : 16px;
    line-height : 16px;
    height : 40px;
`

const LoginUserPhoto = styled.div`
    width : 40px;
    height : 40px;
    border : 2px solid black;
    border-radius : 40px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
        width : 100%;
        height : 100%;
        object-fit: cover;
    }
`

const LoginText = styled.p`
    font-size : 16px;
    line-height : 100%;
    margin : 31px 13px 0 0;
    display : inline-block;

    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    ${props =>
    props.header === true &&
    css`
        margin : 20px 13px 0 0;
    `}
`

const LoginWrapper = styled.div`
    padding : 0;
    display : inline-block;
    

    & > ul {
        display : flex;
        padding : 0;
    }

    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    ${props =>
    props.header === true &&
    css`
        margin : 20px 22px 0 0;
    `}
`

const LoginMenuList = styled.li`
    font-size : 16px;
    color : black;
    font-weight : 700;
    margin : 0 13px 0 0;
    padding : 0;
    cursor : pointer;
    line-height : 100%;
`

const ProjectBtn = styled.div`
    width : 158px;
    height : 40px;
    border-radius : 40px;
    background-color : black;
    color : white;
    line-height : 40px;
    text-align : center;
    font-weight : 700;
    cursor : pointer;

    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    ${props =>
    props.header === true &&
    css`
        margin : 8px 0 0;
    `}
`

export default ArchiveTopMenu;