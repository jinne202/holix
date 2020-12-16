import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { showCategoryRequest } from '../reducers/layoutReducer';

const SortCategoryList = ({ list, selected, onSelectedChange }) => {

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
                <CategoryTitle>{selected.label}</CategoryTitle>
            </SortCategoryMiddle>
            <LineTwo></LineTwo>
            <SortCategoryBottom open={showCategory}>
                <CategoryDetail>
                    {CategoryListOptions}
                </CategoryDetail>
            </SortCategoryBottom>
        </SortCategoryWrapper>
    )
}

const SortCategoryWrapper = styled.div`
    width : 46.6%;
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

const CategoryTitle = styled.div`
    width : 100%;
    font-size : 40px;
    line-height : 70px;
    font-weight : 700;
    margin : 14px 0 22px 0;
    cursor : pointer;
`

const SortCategoryBottom = styled.div`
    width : 100%;
    display : flex;
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

const CategoryDetail = styled.ul`
    width : 100%;
    padding : 0;
    margin : 19px 0 0;
`

const DetailListCategory = styled.li`
    margin : 0 0 10px 0;
    font-size : 28px;
    font-weight : 700;
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

export default SortCategoryList;