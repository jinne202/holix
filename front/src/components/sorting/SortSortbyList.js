import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { showSortCategoryRequest, hideSortCategoryRequest } from '../../reducers/layoutReducer';

const SortSortbyList = ({ list, selected, onSelectedChange }) => {

    const arrowIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9.5" fill="white" stroke="#000000"/><path d="M6.25 8.3335L10.2083 12.9168L14.1667 8.3335" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/></svg>

    const dispatch = useDispatch();
    const { showSortCategory } = useSelector((state) => state.layoutReducer);
    
    const hanldeClickSortCategory = () => {
        dispatch(showSortCategoryRequest());
    }

    const handleClickSortCategoryClose = () => {
        dispatch(hideSortCategoryRequest());
    }

    const SortbyListOptions = list.map(option => {
        return (
            <DetailListSort
                key={option.value}
                onClick={() => onSelectedChange(option)}
            >
                {option.korLabel}
                {/* <span>{option.engLabel}</span> */}
            </DetailListSort>
        )
    })

    return (
        <SortCategoryWrapper>
            <SortCategoryMiddle onClick={hanldeClickSortCategory}>
                <SortbyTitle>{selected.korLabel}<IconWrapper>{arrowIcon}</IconWrapper></SortbyTitle>
            </SortCategoryMiddle>
            {/* <LineTwo></LineTwo> */}
            <SlideWrapper>
            <SortCategoryBottom show={showSortCategory}>
                <SortbyDetail onClick={handleClickSortCategoryClose}>
                    {SortbyListOptions}
                </SortbyDetail>
            </SortCategoryBottom>
            </SlideWrapper>
        </SortCategoryWrapper>
    )
}

const SortCategoryWrapper = styled.div`
    display : inline-block;
    width : 250px;
`

// const Line = styled.div`
//     border-bottom : 1px solid black;
//     width : 100%;
//     margin : 16px 0 0 0;
// `

// const LineTwo = styled(Line)`
//     margin : 0;
// `

const SortCategoryMiddle = styled.div`
    width : 100%;
    display : flex;
    height : 143px;
`


const SortbyTitle = styled.div`
    width : 100%;
    font-size : 18px;
    font-weight : 700;
    line-height : 100%;
    cursor : pointer;
    padding : 90px 0 0 79px;
    position : relative;
    z-index : 12;
`

const IconWrapper = styled.span`
    display : inline-block;
    width : 20px;
    height : 20px;
    position : absolute;
    margin : 0 0 0 15px;

    & > svg {
        position : absolute;
        top : 0;
        left : 0;
        width : 100%;
    }
`

const SlideWrapper = styled.div`
`

const SortCategoryBottom = styled.div`
    width : 100%;
    display : flex;
    max-height : 0;
    overflow : hidden;
    transition: 0.5s ease all;
    -moz-transition: 0.5s ease all;
    -webkit-transition: 0.5s ease all;

    ${props =>
    props.show === true &&
    css`
        max-height : 300px;
    `}
`

const SortbyDetail = styled.ul`
    width : 100%;
    padding : 0;
    /* margin : 25px 0 0; */
    background-color : white;
`

const DetailListSort = styled.li`
    font-size : 18px;
    font-weight : 500;
    line-height : 100%;
    margin : 25px 0 0 0;
    cursor: pointer;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
    padding : 0 0 0 79px;

    & > span {
        font-size : 18px;
        margin-left : 29px;
    }

    &:hover {
        color : #ff0000
    }
`

export default SortSortbyList;