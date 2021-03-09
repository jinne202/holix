import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { showCategoryRequest, hideCategoryRequest } from '../reducers/layoutReducer';

const SortSortbyList = ({ list, selected, onSelectedChange }) => {

    const dispatch = useDispatch();
    const { showCategory } = useSelector((state) => state.layoutReducer);
    
    const hanldeClickCategory = () => {
        dispatch(showCategoryRequest());
    }

    const handleClickCategoryClose = () => {
        dispatch(hideCategoryRequest());
    }

    const SortbyListOptions = list.map(option => {
        return (
            <DetailListSort
                key={option.value}
                onClick={() => onSelectedChange(option)}
            >
                {option.korLabel}
                <span>{option.engLabel}</span>
            </DetailListSort>
        )
    })

    return (
        <SortCategoryWrapper>
            <SortCategoryMiddle onClick={hanldeClickCategory}>
                <SortbyTitle>{selected.engLabel}</SortbyTitle>
            </SortCategoryMiddle>
            <LineTwo></LineTwo>
            <SlideWrapper open={showCategory}>
            <SortCategoryBottom>
                <SortbyDetail>
                    {SortbyListOptions}
                </SortbyDetail>
            </SortCategoryBottom>
            <SortButton type="submit" onClick={handleClickCategoryClose}>
                <SortBtnText>OK</SortBtnText>
                <svg width="100" height="97" viewBox="0 0 100 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ButtonPath d="M65.1669 8.16083L65.2188 8.18683L65.2752 8.20026L81.7799 12.1262L88.5122 27.6984L88.5352 27.7517L88.5698 27.7983L98.6896 41.4147L93.8372 57.6712L93.8206 57.7268L93.8172 57.7847L92.8169 74.7204L78.6504 84.0545L78.6019 84.0864L78.562 84.1286L66.9097 96.4591L50.0576 94.5033L50 94.4966L49.9424 94.5033L33.0903 96.4591L21.438 84.1286L21.3981 84.0864L21.3497 84.0545L7.18308 74.7204L6.18278 57.7847L6.17936 57.7268L6.16276 57.6712L1.3104 41.4147L11.4302 27.7983L11.4648 27.7517L11.4878 27.6984L18.2201 12.1262L34.7248 8.20026L34.7812 8.18683L34.8331 8.16083L50 0.559284L65.1669 8.16083Z"/>
                </svg>
            </SortButton>
            </SlideWrapper>
        </SortCategoryWrapper>
    )
}

const SortCategoryWrapper = styled.div`
    width : 100%;
    height : 410px;
`

const Line = styled.div`
    border-bottom : 1px solid black;
    width : 100%;
    margin : 16px 0 0 0;
`

const LineTwo = styled(Line)`
    margin : 0;
`

const SortCategoryMiddle = styled.div`
    width : 100%;
    display : flex;
`


const SortbyTitle = styled.div`
    font-size : 36px;
    font-weight : 700;
    line-height : 52px;
    margin : 14px 0 40px 0;
    cursor : pointer;
`

const SlideWrapper = styled.div`
    max-height: 0;
	overflow: hidden;
    transition: 0.5s ease all;
    -moz-transition: 0.5s ease all;
    -webkit-transition: 0.5s ease all;

    ${props =>
    props.open === true &&
    css`
        max-height: 710px;
    `}
`

const SortCategoryBottom = styled.div`
    width : 100%;
    display : flex;
`

const SortbyDetail = styled.ul`
    width : 100%;
    padding : 0;
    margin : 25px 0 0;
`

const DetailListSort = styled.li`
    font-size : 24px;
    font-weight : 700;
    line-height : 100%;
    margin : 0 0 23px 0;
    cursor: pointer;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    & > span {
        font-size : 18px;
        margin-left : 29px;
    }

    &:hover {
        color : #ff0000
    }
`

const ButtonPath = styled.path`
    fill : white;
    stroke : black;
    transition: 0.4s ease all;
    -moz-transition: 0.4s ease all;
    -webkit-transition: 0.4s ease all;
`

const SortBtnText = styled.p`
    position : absolute;
    line-height : 258%;
    top : -3px;
    left : 32px;
    font-size : 24px;
    font-weight : 700;
`

const SortButton = styled.button`
    cursor : pointer;
    display : inline-block;
    margin : 226px 0 0 0;
    position : relative;
    border : 0;
    padding : 0;
    background : none;
`

export default SortSortbyList;