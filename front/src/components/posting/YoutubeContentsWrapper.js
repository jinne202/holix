import React, { Component, useCallback, useRef } from 'react';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import YoutubeContents from './YoutubeContents';
import ContentsWrapper from './ContentsWrapper';
import ColorPicker from './ColorPicker';
import ImageButton from './ImageButton';

export default class YoutubeContentsWrapper extends ContentsWrapper {
    state = {
        youtubeAdress : this.props.youtubeAdress,
        background : this.props.background ? this.props.background : '#dedede',
        isFull: this.props.isFull,
        isRemove: false
    }

    
    constructor(props) {
        super(props);
        console.log(this.props.youtubeAdress);
        this.onClick = props.addOnClick;
        this.viewMode = props.viewMode;
        this.youtubeRef = React.createRef();
        this.index = props.contentIndex;
        this.removeHandler = props.removeHandler;
        this.colorPickerRef = React.createRef();
    }
    
    transferForUpload(isPreview) {
        const json = {
            type : "YoutubeContentsWrapper",
            youtubeAdress : this.state.youtubeAdress,
            background : this.state.background,
            isFull: this.state.isFull
        }
        return json;
    }

    reSizeContentsBox(isFull) {
        this.setState({isFull:isFull});
        const youtubeRef = this.youtubeRef.current;
        if (isFull) {
            youtubeRef.setState({perWidth : '100%'})
        } else {
            youtubeRef.setState({perWidth : '100%'})
            youtubeRef.setState({marginLeft : 0})
        }
    }

    reSizingContentsBox() {
        
    }

    handleChangeComplete = (color) => {
        this.setState({background : color.hex})
        this.colorPickerRef.current.background = color.hex;
    };

    showColorPicker = () => {
        this.colorPickerRef.current.visible = true;
        this.colorPickerRef.current.forceUpdate();
    };

    handleYoutubeAddressInput = (e) => {
        this.setState({
            youtubeAdress: e.target.value
        })
    }

    handleYoutube = () => {
        var address = this.state.youtubeAdress
        if (address == "" || !address.includes('youtube')) {
            alert('유튜브 주소를 입력해주세요.');
            return;
        } else if (!address.includes('?v=')) {
            alert('유튜브 주소를 예시대로 입력해주세요.');
            return;
        }
        address = address.split('?v=')[1];
        address = address.split('&')[0];
        console.log(address);
        address = "https://www.youtube.com/embed/" + address + "?controls=0"
        this.setState({
            youtubeAdress: address
        })
        
        this.youtubeRef.current.setState({
            youtubeAdress : address});
    }

    render() {
        if (this.state.isRemove ) {
            return (<></>)
        } else {
            return (
                    <YoutubeWrapper ref={this.wrapperRef} style={{backgroundColor:this.hover && !this.viewMode ? '#d1dccf' : this.state.background, border:!this.viewMode && this.focused ? '2px solid rgb(255, 115, 14)' : '0'}}>
                        { this.viewMode ? <></>
                        :
                        this.focused ?<>
                        <ColorPicker ref={this.colorPickerRef} onChangeComplete={this.handleChangeComplete} background={this.state.background}/>
                        <YoutubeWrapperMenu>
                        <YoutubeWrapperMeneItem onClick={() => this.reSizeContentsBox(true)}><ImageButton name="image_full"/></YoutubeWrapperMeneItem>
                            <YoutubeWrapperMeneItem onClick={() => this.reSizeContentsBox(false)}><ImageButton name="container1"/></YoutubeWrapperMeneItem>
                            <YoutubeWrapperMeneItem style={{width:'auto'}}><div>유튜브 주소 <input type="text" value={this.state.youtubeAdress} onChange={this.handleYoutubeAddressInput}/> <button onClick={this.handleYoutube}>확인</button></div></YoutubeWrapperMeneItem>
                            <YoutubeWrapperMeneItem onClick={() => this.showColorPicker()}><ImageButton name="colorChange"/></YoutubeWrapperMeneItem>
                            <YoutubeWrapperMeneItem onClick={this.removeHandler} ><ImageButton name="delete"/></YoutubeWrapperMeneItem>
                        </YoutubeWrapperMenu></>
                        :<></>
                        }
                        <YoutubeWrapperContents style={{margin : this.state.isFull ? '0' : '50px auto', width: this.state.isFull ? '100%' : '92%'}}>
                            <YoutubeContents ref={this.youtubeRef} youtubeAdress={this.state.youtubeAdress}/>
                        </YoutubeWrapperContents>
                    </YoutubeWrapper>
                
            )
        }
    }
}
const YoutubeWrapper = styled.div`
    width:100%;
    overflow: hidden;
    height: auto;
`
const YoutubeWrapperContents = styled.div`
    margin : 50px auto;
    background : green;
    display: flex;
`

const YoutubeWrapperMenu = styled.ul`
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top: -35px;
    background: white;
    padding-left: 13px;
    border: 1px solid #ACACAC;
    width:470px;

    & > li:last-child {
        margin-right:0;
    }
`

const YoutubeWrapperMeneItem = styled.li`
    float:left;
    margin-right:5px;
    width:25px;
    height:25px;
    margin: 11px 20px 11px 0;
    background: white;
`