import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';

import { showCategoryRequest, hideCategoryRequest } from '../../reducers/layoutReducer';

const SortMainCategoryList = ({ list, selected, onSelectedChange }) => {

    const arrowIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9.5" fill="white" stroke="#000000"/><path d="M6.25 8.3335L10.2083 12.9168L14.1667 8.3335" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/></svg>

    const SearchIcon = <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M23.7252 22.9945C24.2755 22.454 25.1506 22.4715 25.6798 23.0334L32.6933 30.4815C33.2225 31.0435 33.2054 31.9372 32.6552 32.4777C32.1049 33.0182 31.2298 33.0007 30.7006 32.4387L23.687 24.9906C23.1578 24.4286 23.1749 23.5349 23.7252 22.9945Z" fill="black"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.91538 6.19009C2.59664 10.6007 2.59664 17.7518 6.91538 22.1624C11.2341 26.573 18.2362 26.573 22.5549 22.1624C26.8737 17.7518 26.8737 10.6007 22.5549 6.19009C18.2362 1.77947 11.2341 1.77947 6.91538 6.19009ZM24.5099 4.19356C19.1114 -1.31973 10.3589 -1.31973 4.96044 4.19356C-0.437985 9.70684 -0.437985 18.6456 4.96044 24.1589C10.3589 29.6722 19.1114 29.6722 24.5099 24.1589C29.9083 18.6456 29.9083 9.70684 24.5099 4.19356Z" fill="black"/>
    </svg>

    const dispatch = useDispatch();
    const { showCategory } = useSelector((state) => state.layoutReducer);
    
    const hanldeClickCategory = () => {
        dispatch(showCategoryRequest());
    }

    const handleClickCategoryClose = () => {
        dispatch(hideCategoryRequest());
    }

    const CategoryListOptions = list.map(option => {
        return (
            <DetailListCategory
                key={option.value}
                onClick={() => onSelectedChange(option)}
            >
                {option.label}
            </DetailListCategory>
        )
    })

    return (
        <SortCategoryWrapper open={showCategory}>
            <SortCategoryMiddle onClick={hanldeClickCategory}>
                <CategoryTitle>
                    {selected.label}
                    <IconWrapper>{arrowIcon}</IconWrapper>
                </CategoryTitle>
                <SearchInput>
                    <InputWrapper>
                        <SearchIconWrapper>
                            {SearchIcon}
                        </SearchIconWrapper>
                    </InputWrapper>
                </SearchInput>
            </SortCategoryMiddle>
            {/* <LineTwo></LineTwo> */}
            <SortCategoryBottom open={showCategory}>
                <CategoryDetail  onClick={handleClickCategoryClose}>
                    {CategoryListOptions}
                </CategoryDetail>
                {/* <CloseButtonWrapper open={showCategory}>
                    <ButtonWrapper>
                    <SortButton type="submit">
                        <SortBtnText>OK</SortBtnText>
                        <svg width="100" height="97" viewBox="0 0 100 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ButtonPath d="M65.1669 8.16083L65.2188 8.18683L65.2752 8.20026L81.7799 12.1262L88.5122 27.6984L88.5352 27.7517L88.5698 27.7983L98.6896 41.4147L93.8372 57.6712L93.8206 57.7268L93.8172 57.7847L92.8169 74.7204L78.6504 84.0545L78.6019 84.0864L78.562 84.1286L66.9097 96.4591L50.0576 94.5033L50 94.4966L49.9424 94.5033L33.0903 96.4591L21.438 84.1286L21.3981 84.0864L21.3497 84.0545L7.18308 74.7204L6.18278 57.7847L6.17936 57.7268L6.16276 57.6712L1.3104 41.4147L11.4302 27.7983L11.4648 27.7517L11.4878 27.6984L18.2201 12.1262L34.7248 8.20026L34.7812 8.18683L34.8331 8.16083L50 0.559284L65.1669 8.16083Z"/>
                        </svg>
                    </SortButton>
                    </ButtonWrapper>
                </CloseButtonWrapper> */}
            </SortCategoryBottom>
        </SortCategoryWrapper>
    )
}

const SortCategoryWrapper = styled.div`
    width : 100%;
    position : relative;
    height : 143px;
    transition: 0.5s ease all;
    -moz-transition: 0.5s ease all;
    -webkit-transition: 0.5s ease all;

    ${props =>
    props.open === true &&
    css`
        height : 950px;
    `}
`

// const Line = styled.div`
//     border-bottom : 1px solid black;
//     width : 100%;
//     margin : 16px 0 0 0;
//     background-color : white;
// `

// const LineTwo = styled(Line)`
//     z-index : 20;
//     margin : 0;
// `

const SortCategoryMiddle = styled.div`
    width : 100%;
    display : flex;
    height : 143px;
    position : relative;
`

const CategoryTitle = styled.a`
    width : 100%;
    font-size : 48px;
    line-height : 70%;
    font-weight : 700;
    border-bottom : 1px solid black;
    padding : 69px 0 0 0;
    cursor : pointer;
    position : relative;
    z-index : 12;
    background-color : white;
    text-align : center;
`

const IconWrapper = styled.span`
    display : inline-block;
    width : 20px;
    height : 20px;
    position : absolute;
    margin : 22px 0 0 15px;

    & > svg {
        position : absolute;
        top : 0;
        left : 0;
        width : 100%;
    }
`

const SearchInput = styled.div`
    width : 25%;
    height : 143px;
    display : block;
    position : absolute;
    right : 0;
    z-index : 14;
`

const InputWrapper = styled.div`
    width : 100%;
    height : 143px;
    display : flex;
    justify-content : flex-end;
    z-index : 12;
    position : relative;
`

const SearchIconWrapper = styled.div`
    margin : 73px 79px 0 0;
`

const SortCategoryBottom = styled.div`
    width : 100%;
    display : flex;
    transform: translateY(-120%);
    background-color : white;
    z-index : 11;
    transition: 0.5s ease all;
    -moz-transition: 0.5s ease all;
    -webkit-transition: 0.5s ease all;

    ${props =>
    props.open === true &&
    css`
        transform: translateY(0);
    `}
`

const CategoryDetail = styled.ul`
    width : 100%;
    padding : 0;
    margin : 19px 0 40px;
`

const DetailListCategory = styled.li`
    margin : 0 0 10px 0;
    font-size : 40px;
    font-weight : 500;
    line-height : auto;
    cursor: pointer;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    &:hover {
        color : #ff0000
    }
`

const CloseButtonWrapper = styled.div`
    width : 100%;
    display : flex;
    justify-content : flex-end;
    z-index : 11;
    transition: 0.5s ease all;
    -moz-transition: 0.5s ease all;
    -webkit-transition: 0.5s ease all;
    transform: translateY(-120%);
    background-color : white;
    padding-bottom : 310px;

    ${props =>
    props.open === true &&
    css`
        transform: translateY(0);
    `}
`

const ButtonWrapper = styled.div`
    display : inline-block;
    margin : 368px 79px 0 0;
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
    position : relative;
    border : 0;
    padding : 0;
    background : none;
    outline : none;
`

export default SortMainCategoryList;