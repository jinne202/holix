import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { showCategoryRequest } from '../../reducers/layoutReducer';

const SortMainCategoryList = ({ list, selected, onSelectedChange }) => {

    const arrowIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9.5" fill="white" stroke="#000000"/><path d="M6.25 8.3335L10.2083 12.9168L14.1667 8.3335" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/></svg>

    const dispatch = useDispatch();
    const { showCategory } = useSelector((state) => state.layoutReducer);
    
    const hanldeClickCategory = () => {
        dispatch(showCategoryRequest());
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
        <SortCategoryWrapper>
            <SortCategoryMiddle onClick={hanldeClickCategory}>
                <CategoryTitle>{selected.label} <IconWrapper>{arrowIcon}</IconWrapper></CategoryTitle>
            </SortCategoryMiddle>
            {/* <LineTwo></LineTwo> */}
            <SortCategoryBottom open={showCategory}>
                <CategoryDetail>
                    {CategoryListOptions}
                </CategoryDetail>
            </SortCategoryBottom>
        </SortCategoryWrapper>
    )
}

const SortCategoryWrapper = styled.div`
    width : 100%;
    border : 1px solid blue;
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
`

const CategoryTitle = styled.div`
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

    ${props =>
    props.open === true &&
    css`
        height : 710px;
    `}
`

export default SortMainCategoryList;