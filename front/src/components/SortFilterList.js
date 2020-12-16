import React from 'react';
import styled from 'styled-components';

const SortFilterLst = () => {
    return (
        <SortCategoryWrapper>
            <SortCategoryMiddle>
                <FilterTitle></FilterTitle>
            </SortCategoryMiddle>
            <LineTwo></LineTwo>
        </SortCategoryWrapper>
    )
}

const SortCategoryWrapper = styled.div`
    width : 30.9%;
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
    height : 106px;
`


const FilterTitle = styled.div`
    font-size : 36px;
    font-weight : 700;
    line-height : 52px;
    margin : 14px 0 40px 0;
`

export default SortFilterLst