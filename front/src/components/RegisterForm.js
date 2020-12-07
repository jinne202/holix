import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import useInput from '../hooks/useInput';
import Checkbox from './Checkbox';

export const emailCheckRgx = (email) => {
    const emailCheckRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return emailCheckRegex.test(email);
}

// 8~16자 영문 대 소문자, 숫자, 특수문자, 영어랑 숫자 필수
export const passwordCheckRgx = (password) => {
    const passwordCheckRegex = /^(?=.*[a-z])(?=.*[0-9])[0-9A-Za-z$&+,:;=?@#|'<>.^*()%!-]{8,16}$/;
    return passwordCheckRegex.test(password);
}

export const userNameCheckRgx = (userName) => {
    const userNameCheckRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
    return userNameCheckRegex.test(userName);
}

const RegisterForm = () => {
    const [userName, onChangeUserName] = useInput('');
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [focusUserName, setFocusUserName] = useState(false);
    const [focusEmail, setFocusEmail] = useState(false);
    const [focusPassword, setFocusPassword] = useState(false);
    const [focusPasswordCheck, setFocusPasswordCheck] = useState(false);
    const [check, setCheck] = useState(false);

    const onFocusInputUserName = () => {
        setFocusUserName(true);
    }

    const onBlurInputUserName = () => {
        setFocusUserName(false);
    }

    const onFocusInputEmail = () => {
        setFocusEmail(true);
    }

    const onBlurInputEmail = () => {
        setFocusEmail(false);
    }

    const onFocusInputPassword = () => {
        setFocusPassword(true);
    }

    const onBlurInputPassword = () => {
        setFocusPassword(false);
    }

    const onFocusInputPasswordCheck = () => {
        setFocusPasswordCheck(true);
    }

    const onBlurInputPasswordCheck = () => {
        setFocusPasswordCheck(false);
    }

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if (!isEveryValid()) {
            return;
        }
        console.log({
            email, password, userName
        });
    }, [email, password, userName]);
    
    const onChange = (e) => {
        setCheck(e.target.checked);
    };

    const isEveryValid = () => {
        return emailCheckRgx(email) && passwordCheckRgx(password) && (passwordError === false) && userNameCheckRgx(userName) && (check === true)
    }

    const buttonValid = isEveryValid();

    return (
        <RegisterWrapper>
        <form onSubmit={onSubmitForm}>
            <UserNameWrapper>
                <SubTitle>UserName</SubTitle>
                <LoginInput type="text" onFocus={onFocusInputUserName} onBlur={onBlurInputUserName} name="user-name" value={userName} onChange={onChangeUserName} required/>
                <LoginBar focus={focusUserName}/>
                <SubLink>HMMMMMMMM</SubLink>
            </UserNameWrapper>
            <EmailWrapper>
                <SubTitle>Email</SubTitle>
                <LoginInput type="text" onFocus={onFocusInputEmail} onBlur={onBlurInputEmail} name="user-email" value={email} onChange={onChangeEmail} required/>
                <LoginBar focus={focusEmail}/>
                <SubLink>HMMMMMMMM</SubLink>
            </EmailWrapper>
            <PasswordWrapper>
                <SubTitle>Password</SubTitle>
                <LoginInput type="password" onFocus={onFocusInputPassword} onBlur={onBlurInputPassword} name="user-password" value={password} onChange={onChangePassword} required/>
                <LoginBar focus={focusPassword}/>
                <SubLink>HMMMMMMMM</SubLink>
            </PasswordWrapper>
            <PasswordCheckWrapper>
                <SubTitle>Password Check</SubTitle>
                <LoginInput type="password" onFocus={onFocusInputPasswordCheck} onBlur={onBlurInputPasswordCheck} name="user-password-check" value={passwordCheck} onChange={onChangePasswordCheck} required/>
                <LoginBar focus={focusPasswordCheck}/>
            <SubLink>{passwordError ? "비밀번호가 일치하지 않습니다" : "HMMMMMMMM"}</SubLink>
            </PasswordCheckWrapper>

            {/* 체크박스 일단! 넣어놓기 여기 손보기*/}
            <CheckboxWrapper>
                <Checkbox onChange={onChange} checked={check}/>
            </CheckboxWrapper>
            {/* 체크박스 일단! 넣어놓기 여기 손보기 */}

            <LoginButton type="submit" check={buttonValid}>
                <LoginBtnText check={buttonValid}>OK</LoginBtnText>
                <svg width="100" height="97" viewBox="0 0 100 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ButtonPath d="M65.1669 8.16083L65.2188 8.18683L65.2752 8.20026L81.7799 12.1262L88.5122 27.6984L88.5352 27.7517L88.5698 27.7983L98.6896 41.4147L93.8372 57.6712L93.8206 57.7268L93.8172 57.7847L92.8169 74.7204L78.6504 84.0545L78.6019 84.0864L78.562 84.1286L66.9097 96.4591L50.0576 94.5033L50 94.4966L49.9424 94.5033L33.0903 96.4591L21.438 84.1286L21.3981 84.0864L21.3497 84.0545L7.18308 74.7204L6.18278 57.7847L6.17936 57.7268L6.16276 57.6712L1.3104 41.4147L11.4302 27.7983L11.4648 27.7517L11.4878 27.6984L18.2201 12.1262L34.7248 8.20026L34.7812 8.18683L34.8331 8.16083L50 0.559284L65.1669 8.16083Z" check={buttonValid}/>
                </svg>
            </LoginButton>
        </form>
        </RegisterWrapper>
    )
}

const RegisterWrapper = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
`

const SubTitle = styled.p`
    margin : 0;
    font-size : 18px;
    font-weight : 700;
    line-height : 258%;
`


const LoginInput = styled.input`
    font-size : 36px;
    line-height : 258%;
    display:block;
    width : 100%;
    border:none;
    border-bottom : 1px solid #ddd;

    &:focus {
        outline : none;
    }
`

const LoginBar = styled.span`
    position: relative;
    display: block;
    width: 100%;

    &:after, &:before {
        content: "";
        height : 2px;
        background-color : black;
        width: 0;
        position: absolute;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
    }

    &:before {
        left : 50%;
    }

    &:after {
        right : 50%;
    }

    ${props =>
    props.focus === true &&
    css`
        &:after {
            width : 50%;
        }
        &:before {
            width : 50%;
        }
    `}

    ${props =>
    props.focus === false &&
    css`
        &:after {
            width : 0;
        }
        &:before {
            width : 0;
        }
    `}
`

const UserNameWrapper = styled.div`
`

const EmailWrapper = styled.div`
    margin : 50px 0 0 0;
`

const PasswordWrapper = styled.div`
    margin : 50px 0 0 0;
`

const PasswordCheckWrapper = styled.div`
    margin : 50px 0 0 0;
`

const CheckboxWrapper = styled.div`
    margin : 80px 0 0 0;
`

const SubLink = styled.a`
    color : black;
    line-height : 258%;
    font-size : 18px;
    font-weight : 700;

    &:hover {
        color : black;
    }
`

const ButtonPath = styled.path`
    fill : white;
    stroke : black;
    transition: 0.4s ease all;
    -moz-transition: 0.4s ease all;
    -webkit-transition: 0.4s ease all;

    ${props =>
    props.check === true &&
    css`
        fill : black;
    `}
`

const LoginBtnText = styled.p`
    position : absolute;
    line-height : 258%;
    top : -3px;
    left : 32px;
    font-size : 24px;
    font-weight : 700;

    ${props =>
    props.check === true &&
    css`
        color : white;
    `}
`

const LoginButton = styled.button`
    cursor : pointer;
    display : inline-block;
    margin : 181px 0 300px 0;
    position : relative;
    border : 0;
    padding : 0;
    background : none;

    &:focus {
        outline : none;
    }
`

export default RegisterForm;