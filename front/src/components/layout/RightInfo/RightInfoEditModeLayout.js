import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Router, { useRouter, withRouter  } from "next/router";
import RatingTab from './RatingTab'
import CommentTab from './CommentTab'

export default class RightInfoEditModeLayout extends Component {
    constructor(props) {
        super(props);
        this.onHandleTitleChange = props.onHandleTitleChange;
        console.log(props.isFull)
        this.state = {
            isFull: props.isFull,
            isChanged : false,
            currentTab : 0
        }
    
    }
    
    handleSideInfo = () => {
        this.setState(prevState => ({
            isFull : !prevState.isFull,
            isChanged : true
        }))
    }

    changeTab = (e) => {
        this.setState(prevState => ({
            currentTab : e.target.value
        }))
    }

    render() {
     return (
        <RightInfoWrapper>
            <SideInfoButton onClick = {this.handleSideInfo}>
                {this.state.isFull ? "<" : ">"}
            </SideInfoButton>
            <InfoWrapper isChanged={this.state.isChanged} isFull={this.state.isFull}>
            {this.props.children}
            </InfoWrapper>
        </RightInfoWrapper>
    )
     }
}


const RightInfoWrapper = styled.div`
    margin: 0px;
    padding: 0px;
    -webkit-box-align: stretch;
    align-items: stretch;
    border-width: 0px;
    border-style: solid;
    border-color: rgb(4, 4, 5);
    display: flex;
    flex-basis: auto;
    flex-direction: row;
    flex-shrink: 0;
    min-height: 0px;
    min-width: 0px;
    margin-top:80px;
    background: translate;
`

const SideInfoButton = styled.div`
    position:relative;
    display: inline-block;
    top:50%;
`

const InfoWrapper = styled.div`
    background:#fff;
    display: inline-block;
    position :relative;
    animation-fill-mode:forwards;
    max-width : 0px;
    ${props =>
        !props.isChanged && !props.isFull &&
        css`
           max-width:300px;
    `}
        
    ${props =>
        props.isChanged && !props.isFull &&
        css`
            
            animation-duration:  2s;
            animation-name:  showRightInfo;
        `}
    ${props =>
        props.isChanged && props.isFull &&
        css`
           
            animation-duration:  2s;
            animation-name:  hideRightInfo;
        `}
`


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
