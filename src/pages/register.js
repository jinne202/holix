import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import AppLayout from '../components/layout/AppLayout';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
    const [active, setActive] = useState(0);
    
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
            <LayoutWrapper>
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
                    <Fade bottom duration={500} distance={"30%"}>
                    <LoginTitle>Register</LoginTitle>
                    </Fade>
                </LoginLeftWrapper>
                <LoginRightWrapper>
                    {contents()}
                </LoginRightWrapper>
                </LoginWrapper>
            </LayoutWrapper>
        </AppLayout>
    )
}

const LayoutWrapper = styled.div`
    padding : 0 79px;
    margin : 96px 0 0 0;
`

const Line = styled.div`
    border-bottom : 1px solid black;
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
    color : #959595;
    margin : 0;
    font-size : 18px;
    font-weight : 700;
    line-height : 258%;
    display : inline-block;
    cursor : pointer;
`

const SubTitleFirst = styled(SubTitle)`
    margin-right : 32px;
    color : black;
`

const LoginTitle = styled.h2`
    font-size : 180px;
    font-weight : 500;
    margin : 16px 0 0 0;
    line-height : 90%;
    font-family: 'Roboto', sans-serif;
    width : 100%;

    @media (max-width: 1500px) {
        font-size : 100px;
    }
`

export default Register;