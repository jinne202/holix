import React, { useState, useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Router, { useRouter, withRouter  } from "next/router";
import RightInfoLayout from './RightInfoLayout'
import RatingTab from './RatingTab'
import CommentTab from './CommentTab'

const ArchiveRightInfo = ({archive}) => {
    if (!archive) return <></>;
    const [tabList, setTabList] = useState([
        {name : '평가', component : <RatingTab ratingList={archive.archiveInfo.ratingList}/>},
        {name : '댓글', component : <CommentTab list={archive.archiveInfo.commentList} id={archive.archiveInfo.id}/>}
    ])
    const [currentTab, setCurrentTab] = useState(0);

    

    const showTab = tabList.map((t, index) => 
        <TabItem key={index} value={index} active={index == currentTab}>{t.name}</TabItem>
    )

    const changeTab = (e) => {
        setCurrentTab(e.target.value)
    }

     return (
        <RightInfoLayout title={"s"} tabList={tabList} isFull={true}>
            
        </RightInfoLayout>
    )
}

const ContentsWrapper = styled.div`
    width:90%;
    margin: 0 auto;
    height : calc(100% - 84px);
    overflow-y:scroll;
`

const TitleWrapper = styled.div`
    position: relative;
    margin: 0;
    border: 0;
    text-align: left;
    border-bottom: 1px solid #e9e9e9;
`
const Title = styled.h2`
    font-size: 24px;
    color: #222;
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    line-height: 36px;
    width:100%;
    min-width:300px;
`

const TabMenu = styled.ul`
    padding:0;
    margin-top:30px;
    & > li {
        float:left;
        margin-right:10px;
        font-size:15px;
        font-weight:bold;
        transition: all 0.12s ease-in-out 0s;
    }
    & > li:hover{
        color: rgb(4, 4, 5);
    }
`

const TabItem = styled.li`
color:rgba(4, 4, 5, 0.4);
    ${props =>
    props.active &&
    css`
    color: rgb(4, 4, 5);
    `}
`



export default ArchiveRightInfo;