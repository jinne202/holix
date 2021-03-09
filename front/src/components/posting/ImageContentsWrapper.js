import React, { Component, useCallback, useRef } from 'react';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import ContentBox from './ContentBox';
import ContentsWrapper from './ContentsWrapper';
import ColorPicker from './ColorPicker';

export default class ImageContentsWrapper extends ContentsWrapper {
    constructor(props) {
        super(props);
        this.list = props.list;
        this.onClick = props.addOnClick;
        this.refList = [React.createRef(), React.createRef()];
        this.contentList = [<ContentBox isImage={true} ref={this.refList[0]} idd={0} perWidth={50} />, <ContentBox isImage={true} ref={this.refList[1]}  idd={1} perWidth={50}/>];
        this.mode = "none";
        this.colorPickerRef = React.createRef();
        this.background = "gray";
    }
    
    findEmptyImgIndex() {
        for (var i = 0; i < this.refList.length; i++) {
            if (this.refList[i].current.imgSrc == "") 
                return i;
        }
        return -1;
    }

    reSizeContentsBox(boxSize, changeMode) {
        console.log("this.mode   " + this.mode );
        console.log("changeMode  " + changeMode);
        if (this.mode == "none" || this.mode == "full") { //기존 모드가 이미지 모드일때
            if (this.contentList.length > boxSize) { //기존 상자가 더 많을 때(줄었을 때)
                //일단 이미지 없는 거 정리
                for (var i = 0; i < this.refList.length; i++) {
                    if (this.refList[i].current.imgSrc != "") {
                        this.refList[this.findEmptyImgIndex()].current.imgSrc = this.refList[i].current.imgSrc;
                        this.refList[i].current.imgSrc = "";
                        this.refList[i].current.forceUpdate();
                    }
                }
                for (var i = boxSize; i <= this.refList.length; i++) {
                    this.refList.splice(boxSize, 1);
                    this.contentList.splice(boxSize, 1);
                }
                if (changeMode == "left" || changeMode == "right") {//텍스트모드로
                    if (this.refList.length == 1) {
                        this.addContentsBox(false);
                    } else {
                        this.refList[changeMode == "right" ? 0 : 1].current.imgSrc = this.refList[0].current.imgSrc;
                        this.refList[changeMode == "right" ? 0 : 1].current.forceUpdate();
                        this.refList[changeMode == "right" ? 1 : 0].current.imgSrc = "";
                        this.refList[changeMode == "right" ? 1 : 0].current.isImage = false;
                        this.refList[changeMode == "right" ? 1 : 0].current.forceUpdate();
                    }
                }              
            } else {
                if (changeMode == "left" || changeMode == "right") {//텍스트모드로
                    if (this.refList.length == 1) {
                        this.addContentsBox(false);
                    } else {
                        this.refList[changeMode == "right" ? 0 : 1].current.imgSrc = this.refList[0].current.imgSrc;
                        this.refList[changeMode == "right" ? 0 : 1].current.forceUpdate();
                        this.refList[changeMode == "right" ? 1 : 0].current.imgSrc = "";
                        this.refList[changeMode == "right" ? 1 : 0].current.isImage = false;
                        this.refList[changeMode == "right" ? 1 : 0].current.forceUpdate();
                    }
                    
                } else {
                    for (var i = this.contentList.length; i < boxSize; i++) {
                        this.addContentsBox(true);
                    }
                }
            }
        } else { //텍스트모드
            if (changeMode == "left" || changeMode == "right") { //텍스트모드에서 텍스트모드로
                console.log("1여기옴")
                if (this.mode != changeMode) {
                    console.log("2여기옴")
                    const rightBoxIsImg = this.refList[1].current.isImage;
                    const rightBoxtxtVal = this.refList[1].current.txtBoxVal;
                    const rightBoxImgSrc = this.refList[1].current.imgSrc;

                    this.refList[1].current.isImage = this.refList[0].current.isImage;
                    this.refList[1].current.txtBoxVal = this.refList[0].current.txtBoxVal;
                    this.refList[1].current.imgSrc = this.refList[0].current.imgSrc;

                    this.refList[0].current.imgSrc = rightBoxImgSrc;
                    this.refList[0].current.txtBoxVal = rightBoxtxtVal;
                    this.refList[0].current.isImage = rightBoxIsImg;

                    this.refList[0].current.forceUpdate();
                    this.refList[1].current.forceUpdate();
                    //더 좋은 방법 있나 나중에 생각해보기 TODO
                }
            } else { //텍스트모드에서 이미지 모드로
                this.refList[0].current.imgSrc = this.refList[this.mode == "right" ? 0 : 1].current.imgSrc;
                this.refList[0].current.isImage = true;
                this.refList[1].current.isImage = true;
                console.log("here")
                if (this.refList.length > 1) {
                    this.refList.splice(1);
                    this.contentList.splice(1);
                    for (var i = 1; i < boxSize; i++) {
                        this.addContentsBox(true);
                    }
                }
            }
        }
        this.mode = changeMode;
        this.reSizingContentsBox();
        this.forceUpdate();
    }
    
    addContentsBox(isImage) {
        var ref = React.createRef();
        this.refList.push(ref);
        this.contentList.push(<ContentBox isImage={isImage} ref={ref} idd={this.refList.length - 1}/>);
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
        console.log("realod");
        return (
        <ImageWrapper className="imageContentsWrapper" style={{backgroundColor:this.background}}>
            <ColorPicker ref={this.colorPickerRef} onChangeComplete={this.handleChangeComplete} background={this.background}/>
            <ImageWrapperMenu>
                <ImageWrapperMeneItem onClick={() => this.reSizeContentsBox(1, "full")}>full</ImageWrapperMeneItem>
                <ImageWrapperMeneItem onClick={() => this.reSizeContentsBox(2, "left")}>left</ImageWrapperMeneItem>
                <ImageWrapperMeneItem onClick={() => this.reSizeContentsBox(2, "right")}>right</ImageWrapperMeneItem>
                <ImageWrapperMeneItem onClick={() => this.reSizeContentsBox(2, "none")}>2</ImageWrapperMeneItem>
                <ImageWrapperMeneItem onClick={() => this.reSizeContentsBox(3, "none")}>3</ImageWrapperMeneItem>
                <ImageWrapperMeneItem onClick={() => this.reSizeContentsBox(4, "none")}>4</ImageWrapperMeneItem>
                <ImageWrapperMeneItem onClick={() => this.showColorPicker()}>color</ImageWrapperMeneItem>
                <ImageWrapperMeneItem>del</ImageWrapperMeneItem>
            </ImageWrapperMenu>
            <ImageWrapperContents>
                {showContentsList}
            </ImageWrapperContents>
        </ImageWrapper>
        )
    }
}
const ImageWrapper = styled.div`
    width:100%;
    background:gray;
    overflow: hidden;
    height: auto;
`
const ImageWrapperContents = styled.div`
    margin : 50px auto;
    width:92%;
    background : green;
`

const ImageWrapperMenu = styled.ul`
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top: -35px;
    background: white;
`

const ImageWrapperMeneItem = styled.li`
    float:left;
    margin-right:5px;
`