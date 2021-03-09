import React, { useState } from 'react';
import styled from 'styled-components';

import SortCategoryList from '../components/SortCategoryList';
import SortSortbyList from '../components/SortSortbyList';
import SortFilterLst from '../components/SortFilterList';

const categoryList = [
    {
        label : "모든 프로젝트",
        value : "Project All"
    },
    {
        label : "예술과 전시",
        value : "Illustration & toon"
    },
    {
        label : "프로덕트와 공예",
        value : "UX UI Design"
    },
    {
        label : "브랜드경험과 브랜딩",
        value : "BX Branding"
    },
    {
        label : "사용자경험과 디자인",
        value : "Motion & Animation"
    },
    {
        label : "정보시각화와 데이터",
        value : "Product & Craft"
    },
    {
        label : "일러스트와 툰",
        value : "Games"
    },
    {
        label : "편집과 출판",
        value : "Publishing"
    },
    {
        label : "모션과 애니메이션",
        value : "Art & Exhibition"
    },
    {
        label : "3D모델링과 게임",
        value : "modeling"
    }
]

const sortbyList = [
    {
        korLabel : "현재 평가중인",
        engLabel : "Now order",
        value : "현재 평가중인"
    },
    {
        korLabel : "최근에 등록한",
        engLabel : "Latest",
        value : "최근에 등록한"
    },
    {
        korLabel : "요즘 뜨고있는",
        engLabel : "Hot",
        value : "요즘 뜨고있는"
    },
    {
        korLabel : "모두 인정하는",
        engLabel : "Best",
        value : "모두 인정하는"
    },
    {
        korLabel : "자주 둘러보는",
        engLabel : "View order",
        value : "자주 둘러보는"
    },
    {
        korLabel : "많이 스크랩된",
        engLabel : "Selected",
        value : "많이 스크랩된"
    }
]

const SortCategory = () => {

    const arrowIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9.5" fill="white" stroke="#FF0000"/><path d="M6.25 8.3335L10.2083 12.9168L14.1667 8.3335" stroke="#FF0000" strokeLinecap="round" strokeLinejoin="round"/></svg>

    const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);
    const [selectedSortby, setSelectedSortby] = useState(sortbyList[0]);

    return (
        <SortCategoryWrapper>
            <SortCategoryTop>
                <CategoryUnit><div>Categories</div><ArrowIconUnit>{arrowIcon}</ArrowIconUnit></CategoryUnit>
                <SortbyUnit><div>Sort by</div><ArrowIconUnit>{arrowIcon}</ArrowIconUnit></SortbyUnit>
                <FilterUnit><div>Filter</div><ArrowIconUnit>{arrowIcon}</ArrowIconUnit></FilterUnit>
            </SortCategoryTop>
            <Line></Line>
            <ListsWrapper>
                <SortCategoryList
                    list={categoryList}
                    selected={selectedCategory}
                    onSelectedChange={setSelectedCategory}
                />
                <MiddleWrapper>
                    <SortSortbyList
                        list={sortbyList}
                        selected={selectedSortby}
                        onSelectedChange={setSelectedSortby}
                    />
                    
                </MiddleWrapper>
                <SortFilterLst/>
            </ListsWrapper>
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

const ListsWrapper = styled.div`
    display : flex;
`

const MiddleWrapper = styled.div`
    width : 22.5%;
`

export default SortCategory;