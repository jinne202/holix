import React from 'react';
import styled from 'styled-components';

const SortCategory = () => {

    const arrowIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9.5" fill="white" stroke="#FF0000"/><path d="M6.25 8.3335L10.2083 12.9168L14.1667 8.3335" stroke="#FF0000" stroke-linecap="round" stroke-linejoin="round"/></svg>

    return (
        <SortCategoryWrapper>
            <SortCategoryTop>
                <CategoryUnit><div>Categories</div><ArrowIconUnit>{arrowIcon}</ArrowIconUnit></CategoryUnit>
                <SortbyUnit><div>Sort by</div><ArrowIconUnit>{arrowIcon}</ArrowIconUnit></SortbyUnit>
                <FilterUnit><div>Filter</div><ArrowIconUnit>{arrowIcon}</ArrowIconUnit></FilterUnit>
            </SortCategoryTop>
            <Line></Line>
            <SortCategoryMiddle>
                <CategoryTitle>Project All</CategoryTitle>
                <SortbyTitle>Newest</SortbyTitle>
                <FilterTitle></FilterTitle>
            </SortCategoryMiddle>
            <LineTwo></LineTwo>
            <SortCategoryBottom>
                <CategoryDetail>
                    <DetailListCategory>Project All</DetailListCategory>
                    <DetailListCategory>Illustration & toon</DetailListCategory>
                    <DetailListCategory>UX UI Design</DetailListCategory>
                    <DetailListCategory>BX Branding</DetailListCategory>
                    <DetailListCategory>Motion & Animation</DetailListCategory>
                    <DetailListCategory>Product & Craft</DetailListCategory>
                    <DetailListCategory>Games</DetailListCategory>
                    <DetailListCategory>Publishing</DetailListCategory>
                    <DetailListCategory>Art & Exhibition</DetailListCategory>
                </CategoryDetail>
                <GridHeight>
                    <SortbyDetail>
                        <DetailListSort>현재 평가중인<span>Now order</span></DetailListSort>
                        <DetailListSort>최근에 등록한<span>Latest</span></DetailListSort>
                        <DetailListSort>요즘 뜨고있는<span>Hot</span></DetailListSort>
                        <DetailListSort>모두 인정하는<span>Best</span></DetailListSort>
                        <DetailListSort>자주 둘러보는<span>View order</span></DetailListSort>
                        <DetailListSort>많이 스크랩된<span>Selected</span></DetailListSort>
                    </SortbyDetail>
                    <SortButton type="submit">
                        <SortBtnText>OK</SortBtnText>
                        <svg width="100" height="97" viewBox="0 0 100 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ButtonPath d="M65.1669 8.16083L65.2188 8.18683L65.2752 8.20026L81.7799 12.1262L88.5122 27.6984L88.5352 27.7517L88.5698 27.7983L98.6896 41.4147L93.8372 57.6712L93.8206 57.7268L93.8172 57.7847L92.8169 74.7204L78.6504 84.0545L78.6019 84.0864L78.562 84.1286L66.9097 96.4591L50.0576 94.5033L50 94.4966L49.9424 94.5033L33.0903 96.4591L21.438 84.1286L21.3981 84.0864L21.3497 84.0545L7.18308 74.7204L6.18278 57.7847L6.17936 57.7268L6.16276 57.6712L1.3104 41.4147L11.4302 27.7983L11.4648 27.7517L11.4878 27.6984L18.2201 12.1262L34.7248 8.20026L34.7812 8.18683L34.8331 8.16083L50 0.559284L65.1669 8.16083Z"/>
                        </svg>
                    </SortButton>
                </GridHeight>
            </SortCategoryBottom>
        </SortCategoryWrapper>
    )
}

const SortCategoryWrapper = styled.div`
    width : 100%;
`

const SortCategoryTop = styled.div`
    display : flex;
    margin : 54px 0 0 0;
    font-size : 18px;
    font-weight : 700;
    color :#ff0000;
`

const ArrowIconUnit = styled.div`
    padding-top : 3px;
    margin : 0 0 0 18px;
`

const CategoryUnit = styled.div`
    width : 46.6%;
    display : flex;
    cursor: pointer;
`

const SortbyUnit = styled.div`
    width : 22.5%;
    display : flex;
    cursor: pointer;
`

const FilterUnit = styled.div`
    width : 30.9%;
    display : flex;
    cursor: pointer;
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
    width : 46.6%;
    font-size : 48px;
    line-height : 70px;
    font-weight : 700;
    margin : 14px 0 22px 0;
`

const SortbyTitle = styled.div`
    font-size : 36px;
    font-weight : 700;
    line-height : 52px;
    margin : 14px 0 40px 0;
`

const FilterTitle = styled.div`
`

const SortCategoryBottom = styled.div`
    width : 100%;
    display : flex;
`

const CategoryDetail = styled.ul`
    width : 46.6%;
    padding : 0;
    margin : 19px 0 0;
`

const DetailListCategory = styled.li`
    margin : 0 0 10px 0;
    font-size : 48px;
    font-weight : 700;
    line-height : 70px;
    cursor: pointer;
`

const GridHeight = styled.div`
    width : 22.5%;
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

    & > span {
        font-size : 18px;
        margin-left : 29px;
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
    margin : 322px 0 0 0;
    position : relative;
    border : 0;
    padding : 0;
    background : none;
`

export default SortCategory;