import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import {hideCategoryRequest } from '../../reducers/layoutReducer';

import SortMainCategoryList from './SortMainCategoryList';
import SortSortbyList from './SortSortbyList';
import SortDayList from './SortDayList';

const categoryList = [
    {
        label : "모든 프로젝트",
        value : "Project All"
    },
    {
        label : "예술과 전시",
        value : "Art & Exhibition"
    },
    {
        label : "프로덕트와 공예",
        value : "Product & Craft"
    },
    {
        label : "브랜드경험과 브랜딩",
        value : "BX Branding"
    },
    {
        label : "사용자경험과 디자인",
        value : "UX UI Design "
    },
    {
        label : "정보시각화와 데이터",
        value : "Data"
    },
    {
        label : "일러스트와 툰",
        value : "Illustration & toon"
    },
    {
        label : "편집과 출판",
        value : "Publishing"
    },
    {
        label : "모션과 애니메이션",
        value : "Motion & Animation"
    },
    {
        label : "3D모델링과 게임",
        value : "Games"
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

const dayList = [
    {
        label : "한 주 이내의",
        value : "week"
    },
    {
        label : "한 달 이내의",
        value : "month"
    },
    {
        label : "일 년 이내의",
        value : "year"
    }
]

const SortWrapper = () => {

    const dispatch = useDispatch();
    const { showCategory, showDayCategory } = useSelector((state) => state.layoutReducer);

    const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);
    const [selectedSortby, setSelectedSortby] = useState(sortbyList[0]);
    const [selectedDay, setSelectedDay] = useState(dayList[0]);

    return (
        <SortWrapperAll show={showDayCategory}>
            <SortLeftWrapper>
                <SortByListWrapper>
                    <SortSortbyList
                        list={sortbyList}
                        selected={selectedSortby}
                        onSelectedChange={setSelectedSortby}
                    />
                </SortByListWrapper>
                <SortDayList
                    list={dayList}
                    selected={selectedDay}
                    onSelectedChange={setSelectedDay}
                />
            </SortLeftWrapper>
            <SortCategoryWrapper open={showCategory}>
                <SortMainCategoryList
                    list={categoryList}
                    selected={selectedCategory}
                    onSelectedChange={setSelectedCategory}
                />
            </SortCategoryWrapper>
        </SortWrapperAll>
    )
}

const SortWrapperAll = styled.div`
    position : relative;
    border : 1px solid blue;
`

const SortCategoryWrapper = styled.div`
    width : 100%;
    position : relative;
`

const SortByListWrapper = styled.div`
    margin : 0 70px 0 0;
`

const SortLeftWrapper = styled.div`
    position : absolute;
    top : 0;
    left : 0;
    display : flex;
    z-index : 50;
    border : 1px solid green;
    height : 500px;
`




export default SortWrapper;