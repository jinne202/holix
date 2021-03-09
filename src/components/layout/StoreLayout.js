import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import StoreTopMenu from '../store/StoreTopMenu';
import StoreFooter from '../store/StoreFooter';

const StoreLayout = ({ children }) => {
    return (
        <>
            <StoreTopMenu/>
            <ContentWrapper>
                {children}
            </ContentWrapper>
            <StoreFooter/>
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
    width : 80%;
    margin-left:10%;
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

export default StoreLayout;