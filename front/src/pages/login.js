import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
    const [active, setActive] = useState(1);
    
    const handleClick = (e) => {
        const index = parseInt(e.target.id, 0);
        if (index !== active) {
            setActive(index);
        }
    }

    const contents = () => {
        if(active === 0){
            return (
                <RegisterForm/>
            )
        } else if (active === 1){
            return (
                <LoginForm/>
            )
        }
    }

    return (
        <AppLayout>
            <Line></Line>
            <LoginWrapper>
            <LoginLeftWrapper>
                <LoginTab>
                    <Link href="/register">
                    <SubTitleFirst onClick={handleClick} active={active === 0} id={0}>Register</SubTitleFirst>
                    </Link>
                    <Link href="/login">
                    <SubTitle onClick={handleClick} active={active === 1} id={1}>Login</SubTitle>
                    </Link>
                </LoginTab>
                <LoginTitle>Login</LoginTitle>
            </LoginLeftWrapper>
            <LoginRightWrapper>
                {contents()}
            </LoginRightWrapper>
            </LoginWrapper>
        </AppLayout>
    )
}

const Line = styled.div`
    border-bottom : 1px solid black;
    margin : 96px 0 0 0;
`

const LoginWrapper = styled.div`
    display : flex;
    font-family: 'Noto Sans KR', sans-serif;

    @media (max-width: 1000px) {
        width : 100%;
        display : block;
    }
`

const LoginLeftWrapper = styled.div`
    width : 50%;
    padding : 10px 0 0 0;

    @media (max-width: 1000px) {
        width : 100%;
        display : block;
        margin : 0 0 60px;
    }
`

const LoginRightWrapper = styled.div`
    width : 50%;
    padding : 10px 0 0 20px;

    @media (max-width: 1000px) {
        width : 100%;
        display : block;
        padding : 0;
        margin : 0 0 60px;
    }
`

const LoginTab = styled.div`
    z-index : 1;
`

const SubTitle = styled.div`
    color : black;
    margin : 0;
    font-size : 18px;
    font-weight : 700;
    line-height : 258%;
    display : inline-block;
    cursor : pointer;
`

const SubTitleFirst = styled(SubTitle)`
    margin-right : 32px;
    color : #959595;
`

const LoginTitle = styled.h2`
    font-size : 180px;
    font-weight : 500;
    margin : 16px 0 0 0;
    line-height : 90%;
    font-family: 'Roboto', sans-serif;

    @media (max-width: 1500px) {
        font-size : 100px;
    }
`

export default Login;