import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import StoreTopMenu from "components/store/StoreTopMenu";

const PreviewLayout = ({ children }) => {

    const changeResolution = (e) => {
        window.resizeTo(parseInt(e.target.value), window.outerHeight);
        console.log(window.outerHeight)
    }

    return (
        <> 
            <StoreTopMenu />
            <PreviewTopWrapper>
                <Guide>
                    이 화면은 미리보기 화면입니다.
                </Guide>
                <ResolutionMenu onClick={changeResolution} >
                    <li value="1920">1920</li>
                    <li value="1024">1024</li>
                    <li value="640">640</li>
                </ResolutionMenu>
            </PreviewTopWrapper>
            <ContentsWrapper>
                {children}
            </ContentsWrapper>
        </>

    )
}


const ContentsWrapper = styled.div`
    margin: 0px;
    padding: 0px;
    border-width: 0px;
    border-style: solid;
    border-color: rgb(4, 4, 5);
    display: flex;
    flex: 1 0 auto;
    min-height: 0px;
    min-width: 0px;
    max-width: 100%;
    -webkit-box-flex: 1;
    flex-direction: row;
    -webkit-box-align: stretch;
    align-items: stretch;
    position: absolute; 
    inset: 0px; 
    overflow:hidden;
`
const PreviewTopWrapper = styled.div`
    position : fixed;
    width:100%;
    background : #00000099;
    height : 100px;
    top: 0;
    text-align:center;
    z-index: 99;
`

const Guide = styled.div`
    color : white;
    font-size : 30px;
    display: table;
    margin: 0 auto;
`

const ResolutionMenu = styled.ul`
    position : relative;
    display: table;
    font-size: 25px;
    font-weight:400;
    margin: 0 auto;
    color:#f2d5d5;
    & > li {
        float:left;
        padding-right: 30px;
    }

`

export default PreviewLayout;