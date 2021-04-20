import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';   
import { LOG_OUT_REQUEST } from 'reducers/userReducer';

const StoreTopMenu = () => {
    const dispatch = useDispatch();
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const sticky = ref.current ? ref.current.offsetTop + ref.current.clientHeight : 0;
    const { myAccountInfo } = useSelector((state) => state.userReducer);
    const handleScroll = () => {
        if (ref.current) {
            setSticky(window.pageYOffset > sticky);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', () => handleScroll);
        };
      }, []);

      const handleLogout = () => {
        dispatch({
            type: LOG_OUT_REQUEST
        });
    }

    return (
        <>
            <MenuWrapper  style={isSticky ? {position:'fixed', top:'0px'} : {position:'relative', top:''}}  ref={ref}>
                <Link href="/">
                <Logo>
                    Holix
                </Logo>
                </Link>
                <LeftMenu>
                    <ul>
                        <Link href="/store">
                            <MenuList>New</MenuList>
                        </Link>
                        <Link href="/store">
                            <MenuList>Best</MenuList>
                        </Link>
                        <Link href="/store">
                            <MenuList>Product</MenuList>
                        </Link>
                        <Link href="/store/my/registerSeller">
                            <MenuList>Seller</MenuList>
                        </Link>
                    </ul>
                </LeftMenu>
                <RightMenu>
                    {myAccountInfo ?
                        <AfterLoginWrapper>
                            <LoginUserName>{myAccountInfo.nickname}</LoginUserName>
                            <LoginUserPhoto>
                                {/*<img src={} alt="유저이미지"/>*/}
                            </LoginUserPhoto>
                            <LoginWrapper >
                                <ul>
                                    <LoginMenuList onClick={handleLogout}>Logout</LoginMenuList>
                                    <Link href="/store/edit"><LoginMenuList>
                                        <ProjectBtn >
                                            Product Submit
                                        </ProjectBtn></LoginMenuList></Link>
                                </ul>
                            </LoginWrapper>
                        </AfterLoginWrapper>
                    :
                        <BeforeLoginWrapper>
                            <LoginText>Are you a holixer?</LoginText>
                            <LoginWrapper>
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
    width:100%;
    height : 82px;
    border-bottom : 1px solid rgba(0,0,0,0.1);
    display : flex;
    font-family: 'Noto Sans KR', sans-serif;
    padding : 0 79px;
    background:white;
    z-index:99;
`

const LeftMenu = styled.div`
    margin : 0;
    width : 45%;

    & > ul {
        padding : 32px 0 0 0;
        margin : 0;
    }
`

const MenuList = styled.li`
    font-size : 18px;
    font-weight : 500;
    display : inline-block;
    margin : 0 50px 0 0;
    line-height : 100%;
    color : #959595;
    cursor : pointer;
    position : relative;
`

const Logo = styled.h1`
    font-size : 36px;
    line-height : 100%;
    font-weight : 900;
    width : 10%;
    margin : 22px 0 0;
    display : block;
    text-align : center;
`

const RightMenu = styled.div`
    width : 45%;
    display : flex;
    justify-content : flex-end;
`

const LoginText = styled.p`
    font-size : 16px;
    line-height : 100%;
    margin : 31px 13px 0 0;
    display : inline-block;
`

const LoginWrapper = styled.div`
    padding : 0;
    display : inline-block;

    & > ul {
        display : flex;
        padding : 0;
    }
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
export default StoreTopMenu;