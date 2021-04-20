import React, { Component, useCallback, useRef } from 'react';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import ContentBox from './ContentBox';
import ContentsWrapper from './ContentsWrapper';
import ColorPicker from './ColorPicker';
import ImageButton from './ImageButton';

export default class TextContentsWrapper extends ContentsWrapper {
    state = {
        background : "#dedede",
        isRemove: false
    }
    
    constructor(props) {
        super(props);
        this.list = props.list;
        this.index = props.contentIndex;
        this.viewMode = props.viewMode;
        if (props.contentsList) {
            this.createContents(props.contentsList)
        } else {
            this.removeHandler = props.removeHandler;
            this.onClick = props.addOnClick;
            this.refList = [React.createRef()];
            this.contentList = [<ContentBox isImage={false} ref={this.refList[0]} index={0} perWidth={100} />];
            this.colorPickerRef = React.createRef();       
        }
    }

    createContents(contentsList) {
        this.refList = [];
        this.contentList = [];
        for (var i = 0; i < contentsList.length; i++) {
            let content = contentsList[i]
            this.refList.push(React.createRef());
            this.contentList.push(<ContentBox viewMode={this.viewMode} isImage={content.isImage} isFull ={content.isFull} val={content.val} align={content.align} vertical={content.vertical} ref={this.refList[i]} index={i} groupIndex={this.index} />);
        }
        this.contentsIndex = contentsList.length;
        this.state = {
            background : this.props.background
        }
    }

    transferForUpload(isPreview) {
        var contentList = [];
        this.refList.map(c => {
            contentList.push(c.current.transferForUpload())
        })
        const json = {
            type : "TextContentsWrapper",
            contentsSize : this.contentList.length,
            contentsList : contentList,
            mode : this.mode,
            background : this.state.background
        }
        return json;
    }

    componentDidUpdate() {
        this.reSizingContentsBox();
    }

    findEmptyTextIndex() {
        for (var i = 0; i < this.refList.length; i++) {
            if (this.refList[i].current.imgSrc == "") 
                return i;
        }
        return -1;
    }

    reSizeContentsBox(boxSize) {
        if (this.contentList.length > boxSize) { //기존 상자가 더 많을 때(줄었을 때)
            //텍스트 있는 것들 정리
            for (var i = 0; i < this.refList.length; i++) {
                if (this.refList[i].current.txtBoxVal != "") {
                    let emptyIndex = this.findEmptyTextIndex();
                    if (emptyIndex != -1) {
                        this.refList[temptyIndex].current.txtBoxVal = his.refList[i].current.txtBoxVal;
                    }
                    this.refList[i].current.forceUpdate();
                }
            }
            for (var i = boxSize; i <= this.refList.length; i++) {
                this.refList.splice(boxSize, 1);
                this.contentList.splice(boxSize, 1);
            }       
        } else {
            for (var i = this.contentList.length; i < boxSize; i++) {
                this.addContentsBox();
            }
        }
        this.forceUpdate();
    }
    
    addContentsBox() {
        var ref = React.createRef();
        this.refList.push(ref);

        this.contentList.push(<ContentBox isImage={false} ref={ref} index={this.refList.length - 1}/>);
    }
   
    reSizingContentsBox() {
        if (this.mode == "full") {
            const isClient = typeof window === 'object';
            this.refList[0].current.setState({marginLeft : window.innerWidth})
            this.refList[0].current.setState({perWidth : -window.innerWidth * (0.04)})
        } else {
            const contentsPadding = super.getContentsPadding(this.refList.length);
            const contentsWidth = ((100 - (contentsPadding * (this.refList.length - 1))) / this.refList.length);
            const contentBodyWidth = (window.innerWidth * 0.75) * 0.92
            for (var i = 0; i < this.refList.length; i++) {
                if (this.refList[i] != null && this.refList[i].current != null) {
                    this.refList[i].current.setState({perWidth : contentsWidth + "%"});
                    this.refList[i].current.setState({marginLeft : 0});
                    if (i != this.refList.length - 1) {
                        this.refList[i].current.setState({marginRight : contentsPadding  + "%"});
                    } else {
                        this.refList[i].current.setState({marginRight : "0"});
                    }
                }
            }
        }
    }

    handleChangeComplete = (color) => {
        this.setState({background : color.hex});
        this.colorPickerRef.current.background = color.hex;
    };

    showColorPicker = () => {
        this.colorPickerRef.current.visible = true;
        this.colorPickerRef.current.forceUpdate();
    };

    render() {
        if (this.state.isRemove ) {
            return (<></>)
        } else {
            const showContentsList = this.contentList.map((c) => c);
            return (
            <TextWrapper ref={this.wrapperRef} style={{backgroundColor:this.hover && !this.viewMode ? '#d1dccf' : this.state.background, border:!this.viewMode && this.focused ? '2px solid rgb(255, 115, 14)' : '0', overflow: this.focused ? 'visible' : ''}}>
                { this.viewMode ? <></>
                :
                this.focused ?<>
                <ColorPicker ref={this.colorPickerRef} onChangeComplete={this.handleChangeComplete} background={this.background}/>
                <TextWrapperMenu>
                <TextWrapperMeneItem onClick={() => this.reSizeContentsBox(1)}><ImageButton name="container1"/></TextWrapperMeneItem>
                    <TextWrapperMeneItem onClick={() => this.reSizeContentsBox(2)}><ImageButton name="container2"/></TextWrapperMeneItem>
                    <TextWrapperMeneItem onClick={() => this.reSizeContentsBox(3)}><ImageButton name="container3"/></TextWrapperMeneItem>
                    <TextWrapperMeneItem onClick={() => this.reSizeContentsBox(4)}><ImageButton name="container4"/></TextWrapperMeneItem>
                    <TextWrapperMeneItem onClick={() => this.showColorPicker()}><ImageButton name="colorChange"/></TextWrapperMeneItem>
                    <TextWrapperMeneItem onClick={this.removeHandler}><ImageButton name="delete"/></TextWrapperMeneItem>
                </TextWrapperMenu></>
                :<></>
                }
                <TextWrapperContents>
                    {showContentsList}
                </TextWrapperContents>
            </TextWrapper>
            )
        }
    }
}
const TextWrapper = styled.div`
    width:100%;
    background:#dedede;
    overflow: hidden;
    height: auto;
`
const TextWrapperContents = styled.div`
    margin : 50px auto;
    width:92%;
    display:flex;
`

const TextWrapperMenu = styled.ul`
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top: -35px;
    background: white;
    padding-left: 13px;
    border: 1px solid #ACACAC;
`

const TextWrapperMeneItem = styled.li`
    float:left;
    margin-right:5px;
    width:25px;
    height:25px;
    margin: 11px 20px 11px 0;
    background: white;
`