import React, { Component, useCallback, useRef } from 'react';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import ContentBox from './ContentBox';
import ContentsWrapper from './ContentsWrapper';
import ColorPicker from './ColorPicker';

export default class TextContentsWrapper extends ContentsWrapper {
    constructor(props) {
        super(props);
        this.list = props.list;
        this.onClick = props.addOnClick;
        this.refList = [React.createRef()];
        this.contentList = [<ContentBox isImage={false} ref={this.refList[0]} idd={0} perWidth={100} />];
        this.colorPickerRef = React.createRef();
        this.background = "gray";
    }
    
    findEmptyTextIndex() {
        for (var i = 0; i < this.refList.length; i++) {
            if (this.refList[i].current.imgSrc == "") 
                return i;
        }
        return -1;
    }

    reSizeContentsBox(boxSize) {
        console.log("this.mode   " + this.mode );
        if (this.contentList.length > boxSize) { //기존 상자가 더 많을 때(줄었을 때)
            //텍스트 있는 것들 정리
            for (var i = 0; i < this.refList.length; i++) {
                if (this.refList[i].current.state.txtBoxVal != "") {
                    this.refList[this.findEmptyTextIndex()].current.state.txtBoxVal = this.refList[i].current.state.txtBoxVal;
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
        this.reSizingContentsBox();
        this.forceUpdate();
    }
    
    addContentsBox() {
        var ref = React.createRef();
        this.refList.push(ref);
        this.contentList.push(<ContentBox isImage={false} ref={ref} idd={this.refList.length - 1}/>);
    }
   
    reSizingContentsBox() {
        if (this.mode == "full") {
            const isClient = typeof window === 'object';
            this.refList[0].current.perWidth = window.innerWidth;
            this.refList[0].current.marginLeft = -window.innerWidth * (0.04);
            this.refList[0].current.forceUpdate();
        } else {
            for (var i = 0; i < this.refList.length; i++) {
                if (this.refList[i] != null && this.refList[i].current != null) {
                    this.refList[i].current.perWidth = (99 / this.refList.length) + "%";
                    this.refList[i].current.marginLeft = 0;
                    this.refList[i].current.forceUpdate();
                }
            }
        }
    }
    handleChangeComplete = (color) => {
        console.log("Zdzdzdzdzdz");
        this.background = color.hex;
        this.colorPickerRef.current.background = this.background;
        console.log(this.background);
        this.forceUpdate();
    };

    showColorPicker = () => {
        this.colorPickerRef.current.visible = true;
        this.colorPickerRef.current.forceUpdate();
    };

    render() {
        const showContentsList = this.contentList.map((c) => c);
        return (
        <TextWrapper className="textContentsWrapper" style={{backgroundColor:this.background}}>
            <ColorPicker ref={this.colorPickerRef} onChangeComplete={this.handleChangeComplete} background={this.background}/>
            <TextWrapperMenu>
            <TextWrapperMeneItem onClick={() => this.reSizeContentsBox(1)}>1</TextWrapperMeneItem>
                <TextWrapperMeneItem onClick={() => this.reSizeContentsBox(2)}>2</TextWrapperMeneItem>
                <TextWrapperMeneItem onClick={() => this.reSizeContentsBox(3)}>3</TextWrapperMeneItem>
                <TextWrapperMeneItem onClick={() => this.reSizeContentsBox(4)}>4</TextWrapperMeneItem>
                <TextWrapperMeneItem onClick={() => this.showColorPicker()}>color</TextWrapperMeneItem>
                <TextWrapperMeneItem>del</TextWrapperMeneItem>
            </TextWrapperMenu>
            <TextWrapperContents>
                {showContentsList}
            </TextWrapperContents>
        </TextWrapper>
        )
    }
}
const TextWrapper = styled.div`
    width:100%;
    background:gray;
    overflow: hidden;
    height: auto;
`
const TextWrapperContents = styled.div`
    margin : 50px auto;
    width:92%;
    background : green;
`

const TextWrapperMenu = styled.ul`
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top: -35px;
    background: white;
`

const TextWrapperMeneItem = styled.li`
    float:left;
    margin-right:5px;
`