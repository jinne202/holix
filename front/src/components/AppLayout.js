import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const AppLayout = ({ children }) => {
    return (
        <>
            <MenuWrapper>
                <LeftMenu>
                    <ul>
                        <Link href="/story">
                        <MenuList>Project<MenuHoverCircle></MenuHoverCircle></MenuList>
                        </Link>
                        <MenuList>Creator&Team<MenuHoverCircle></MenuHoverCircle></MenuList>
                        <MenuList>Workshop<MenuHoverCircle></MenuHoverCircle></MenuList>
                        <MenuList>Jobs<MenuHoverCircle></MenuHoverCircle></MenuList>
                        <MenuList>Store<MenuHoverCircle></MenuHoverCircle></MenuList>
                    </ul>
                </LeftMenu>
                <Logo>
                    Holix
                </Logo>
                <RightMenu>
                    <LoginText>Are you a holixer?</LoginText>
                    <LoginWrapper>
                        <ul>
                        <Link href="/register"><LoginMenuList>Register</LoginMenuList></Link>
                            <Link href="/login"><LoginMenuList>Login</LoginMenuList></Link>
                        </ul>
                    </LoginWrapper>
                    <ProjectBtn>
                        Project Submit
                    </ProjectBtn>
                </RightMenu>
            </MenuWrapper>
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </>

    )
}

const MenuWrapper = styled.div`
    height : 82px;
    border-bottom : 1px solid rgba(0,0,0,0.1);
    display : flex;
    font-family: 'Noto Sans KR', sans-serif;
    padding : 0 79px;
`

const ContentWrapper = styled.div`
    padding : 0 79px;
    width : 100%;
`

const LeftMenu = styled.div`
    margin : 0;
    width : 45%;

    & > ul {
        padding : 32px 0 0 0;
        margin : 0;
    }
`

const MenuHoverCircle = styled.span`
    width : 14px;
    height : 14px;
    border-radius : 14px;
    background-color : white;
    position : absolute;
    right : -25px;
    top : 3px;
    transition: 0.3s ease all;
    -moz-transition: 0.3s ease all;
    -webkit-transition: 0.3s ease all;
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

    &:hover ${MenuHoverCircle}{
        background-color : #959595;
    }
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
    margin : 31px 22px 0 0;

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

const ProjectBtn = styled.div`
    margin : 21px 0 0;
    width : 158px;
    height : 40px;
    border-radius : 40px;
    background-color : black;
    color : white;
    line-height : 40px;
    text-align : center;
    font-weight : 700;
    cursor : pointer;
`

export default AppLayout;