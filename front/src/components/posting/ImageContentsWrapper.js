import React, { Fragment, Component, useCallback, useRef } from 'react';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import ContentBox from './ContentBox';
import ContentsWrapper from './ContentsWrapper';
import ColorPicker from './ColorPicker';
import { supported } from 'mapbox-gl/dist/mapbox-gl-csp';
import ImageButton from './ImageButton';
import AnimationMenu from './AnimationMenu';

export default class ImageContentsWrapper extends ContentsWrapper {
    state = {
        width:'92%',
        background : "#dedede",
        isRemove: false,
        animation: this.props.animation,
        animationTime : this.props.animationTime,
        inView : true
    }

    constructor(props) {
        super(props);
        console.log("props.contentIndex" + this.props.contentIndex);
        this.index = props.contentIndex;
        this.viewMode = props.viewMode;
        if (props.contentsList) {
            this.createContents(props.contentsList)
        } else {
            this.refList = [React.createRef(), React.createRef()];
            this.contentList = [<ContentBox isImage={true} ref={this.refList[0]} index={0} perWidth={50} groupIndex={this.index} />, <ContentBox isImage={true} ref={this.refList[1]}  index={1} perWidth={50} groupIndex={this.index}/>];
            this.contentsIndex = 2;
            this.removeHandler = props.removeHandler;
            this.mode = 'none';
            this.colorPickerRef = React.createRef();
            this.animationRef = React.createRef();
            this.onClick = props.addOnClick;
        }
        
        console.log(props.onDragOver)
    }

    createContents(contentsList) {
        this.refList = [];
        this.contentList = [];
        for (var i = 0; i < contentsList.length; i++) {
            let content = contentsList[i]
            this.refList.push(React.createRef());
            console.log(content)
            this.contentList.push(<ContentBox viewMode={this.viewMode} isImage={content.isImage} isFull ={content.isFull} val={content.val} align={content.align} vertical={content.vertical} ref={this.refList[i]} index={i} groupIndex={this.index} file={content.file}/>);
        }
        this.contentsIndex = contentsList.length;
        this.mode = this.props.mode;
        console.log(this.props)
        this.state = {
            background : this.props.background,
            width : this.mode == 'full' ? '100%' : '92%',
            animation: this.props.animation,
            animationTime :this.props.animationTime
        }
    }

    transferForUpload(isPreview) {
        var contentList = [];
        this.refList.map(c => {
            contentList.push(c.current.transferForUpload(isPreview))
        })
        const json = {
            type : "ImageContentsWrapper",
            contentsSize : this.contentList.length,
            contentsList : contentList,
            mode : this.mode,
            background : this.state.background,
            animation : this.state.animation,
            animationTime : this.state.animationTime
        }
        return json;
    }

    getFiles() {
        var files = [];
        this.refList.map(r => {
            if (r.current.file != null)
                files.push(r.current.file);
        })

        return files;
    }

    componentDidMount() {
        super.componentDidMount();
        this.reSizingContentsBox();
    }

    componentDidUpdate() {
        this.reSizingContentsBox();
    }

    findEmptyImgIndex() {
        for (var i = 0; i < this.refList.length; i++) {
            if (this.refList[i].current.state.imgSrc == "") 
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
                console.log("//일단 이미지 없는 거 정리");
                for (var i = 0; i < this.refList.length; i++) {
                    if (this.findEmptyImgIndex() != -1 && this.findEmptyImgIndex() <= i && this.refList[i].current.state.imgSrc != "") {
                        this.refList[this.findEmptyImgIndex()].current.setState({imgSrc : this.refList[i].current.state.imgSrc});
                        this.refList[i].current.setState({imgSrc : ""});
                    }
                }

                this.refList.splice(boxSize, this.refList.length - (boxSize - 1));
                this.contentList.splice(boxSize, this.contentList.length - (boxSize - 1));

                if (changeMode == "left" || changeMode == "right") {//텍스트모드로
                    if (this.refList.length == 1) {
                        this.addContentsBox(false);
                    } else {
                        this.refList[changeMode == "right" ? 0 : 1].current.setState({imgSrc : this.refList[0].current.state.imgSrc});
                        this.refList[changeMode == "right" ? 1 : 0].current.setState({imgSrc : ""});
                        this.refList[changeMode == "right" ? 1 : 0].current.setState({isImage : false});
                    }
                }              
            } else {
                if (changeMode == "left" || changeMode == "right") {//텍스트모드로
                    if (this.refList.length == 1) {
                        this.addContentsBox(false);
                    } else {
                        this.refList[changeMode == "right" ? 0 : 1].current.setState({imgSrc : this.refList[0].current.state.imgSrc});
                        this.refList[changeMode == "right" ? 0 : 1].current.setState({isImage : true});
                        this.refList[changeMode == "right" ? 1 : 0].current.setState({imgSrc : ""});
                        this.refList[changeMode == "right" ? 1 : 0].current.setState({isImage : false});
                    }
                    
                } else {
                    for (var i = this.contentList.length; i < boxSize; i++) {
                        this.addContentsBox(true);
                    }
                }
            }
        } else { //텍스트모드
            if (changeMode == "left" || changeMode == "right") { //텍스트모드에서 텍스트모드로
                if (this.mode != changeMode) {
                    const rightBoxIsImg = this.refList[1].current.state.isImage;
                    const rightBoxtxtVal = this.refList[1].current.txtBoxVal;
                    const rightBoxImgSrc = this.refList[1].current.state.imgSrc;
                    this.refList[1].current.setState({isImage : this.refList[0].current.state.isImage})
                    this.refList[1].current.txtBoxVal = this.refList[0].current.txtBoxVal;
                    this.refList[1].current.setState({imgSrc : this.refList[0].current.state.imgSrc})

                    this.refList[0].current.setState({isImage : rightBoxIsImg})
                    this.refList[0].current.txtBoxVal = rightBoxtxtVal;
                    this.refList[0].current.setState({imgSrc : rightBoxImgSrc})
                    //더 좋은 방법 있나 나중에 생각해보기 TODO
                }
            } else { //텍스트모드에서 이미지 모드로
                this.refList[0].current.setState({imgSrc : this.refList[this.mode == "right" ? 0 : 1].current.state.imgSrc})
                this.refList[0].current.setState({isImage : true})
                this.refList[1].current.setState({isImage : true})

                if (changeMode == "full") {
                    this.refList.splice(1);
                    this.contentList.splice(1);
                } else {
                    this.refList.splice(2);
                    this.contentList.splice(2);
                    for (var i = 2; i < boxSize; i++) {
                        this.addContentsBox(true);
                    }
                }
            }
        }
        if (changeMode == "full") {
            this.setState({
                width:'100%'
            })
        } else {
            this.setState({
                width:'92%'
            })
        }
        this.mode = changeMode;
        this.forceUpdate();
    }
    
    addContentsBox(isImage) {
        var ref = React.createRef();
        this.refList.push(ref);        
        this.contentList.push(<ContentBox isImage={isImage} ref={ref} index={this.contentsIndex++} groupIndex={this.index}/>);
        this.forceUpdate()
    }
    //컨텐츠 사이즈 관련
    reSizingContentsBox() {
        if (this.mode == "full") {
            const isClient = typeof window === 'object';
                if (this.refList[0].current) {
                this.refList[0].current.setState({perWidth : '100%'});
                this.refList[0].current.setState({marginLeft : '0'});
                this.refList[0].current.setState({marginRight : '0'});
                this.refList[0].current.setState({height : '100%'});
                this.refList[0].current.setState({isFull : true});
            }
        } else {
            const contentsPadding = super.getContentsPadding(this.refList.length);
            const contentsWidth = ((100 - (contentsPadding * (this.refList.length - 1))) / this.refList.length);
            const contentBodyWidth = (window.innerWidth * 0.75) * 0.92
            for (var i = 0; i < this.refList.length; i++) {
                if (this.refList[i] != null && this.refList[i].current != null) {
                    this.refList[i].current.setState({perWidth : contentsWidth + "%"});
                    this.refList[i].current.setState({height : (contentBodyWidth * (contentsWidth / 100)) + 'px'});
                    this.refList[i].current.setState({marginLeft : 0});
                    this.refList[i].current.setState({isFull : false});
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

    showAnimationMenu = () => {
        console.log("showAnimationMenu")
        this.animationRef.current.setState(prevState => ({
            isVisible : !prevState.isVisible
        }))
    }

    changeAnimation = (type, time) => {
        console.log(type)
        this.setState({
            animation : type,
            animationTime : time
        })
    }

    render() {
        
        if (this.state.isRemove ) {
            return (<></>)
        } else {
            const showContentsList = this.contentList.map((c, index) => <Fragment key={index}>{c}</Fragment>);
            return (
                <>
                { this.viewMode? <></>
                :
                    this.focused ?
                    <>
                        <ColorPicker ref={this.colorPickerRef} onChangeComplete={this.handleChangeComplete} background={this.state.background}/>
                        <ImageWrapperMenu className="menu">
                            <ImageWrapperMenuItem onClick={() => this.reSizeContentsBox(1, "full")}><ImageButton name="image_full"/></ImageWrapperMenuItem>
                            <ImageWrapperMenuItem onClick={() => this.reSizeContentsBox(1, "none")}><ImageButton name="container1"/></ImageWrapperMenuItem>
                            <ImageWrapperMenuItem onClick={() => this.reSizeContentsBox(2, "right")}><ImageButton name="image_left"/></ImageWrapperMenuItem>
                            <ImageWrapperMenuItem onClick={() => this.reSizeContentsBox(2, "left")}><ImageButton name="image_right"/></ImageWrapperMenuItem>
                            <ImageWrapperMenuItem onClick={() => this.reSizeContentsBox(2, "none")}><ImageButton name="container2"/></ImageWrapperMenuItem>
                            <ImageWrapperMenuItem onClick={() => this.reSizeContentsBox(3, "none")}><ImageButton name="container3"/></ImageWrapperMenuItem>
                            <ImageWrapperMenuItem onClick={() => this.reSizeContentsBox(4, "none")}><ImageButton name="container4"/></ImageWrapperMenuItem>
                            <ImageWrapperMenuItem onClick={() => this.showColorPicker()}><ImageButton name="colorChange"/></ImageWrapperMenuItem>
                            <ImageWrapperMenuItem >
                                <ImageButton name="changeAnimation" onClick={() => this.showAnimationMenu()}/>
                                <AnimationMenu ref={this.animationRef} changeAnimation={this.changeAnimation}/>
                            </ImageWrapperMenuItem>
                            <ImageWrapperMenuItem onClick={this.removeHandler} ><ImageButton name="delete"/></ImageWrapperMenuItem>
                        </ImageWrapperMenu>
                        
                        </>
                        : <></>
                    
                }
                <ImageWrapper ref={this.wrapperRef} inView={this.viewMode ? this.state.inView : true} animation={this.state.animation} animationTime={this.state.animationTime}  style={{backgroundColor:this.hover && !this.viewMode ? '#d1dccf' : this.state.background, border:!this.viewMode && this.focused ? '2px solid rgb(255, 115, 14)' : '0'}}>
                    
                    <ImageWrapperContents style={{width : this.state.width, margin : this.mode == "full" ? '0' : '50px auto'}}>
                        {showContentsList}
                    </ImageWrapperContents>
                </ImageWrapper>
                </>
            )
        }
    }
}
const ImageWrapper = styled.div`
    width:100%;
    background:#dedede;
    overflow: hidden;
    height: auto;
    display: flex;
    
    ${props =>
        props.inView &&
        css`
            animation-duration:  ${props => props.animationTime};
            animation-name:  ${props => props.animation};
        `}
    
`
const ImageWrapperContents = styled.div`
    margin : 50px auto;
    width:92%;
    display: flex;
`

const ImageWrapperMenu = styled.ul`
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top: -35px;
    background: white;
    padding-left: 13px;
    border: 1px solid #ACACAC;
    z-index: 99;
`

const ImageWrapperMenuItem = styled.li`
    float:left;
    margin-right:5px;
    width:25px;
    height:25px;
    margin: 11px 20px 11px 0;
    background: white;
`