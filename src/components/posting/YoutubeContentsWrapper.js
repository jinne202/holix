import React, { Component, useCallback, useRef } from 'react';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import YoutubeContents from './YoutubeContents';
import ContentsWrapper from './ContentsWrapper';
import ColorPicker from './ColorPicker';

export default class YoutubeContentsWrapper extends ContentsWrapper {
    state = {
        youtubeAdress : null
    }

    constructor(props) {
        super(props);
        this.onClick = props.addOnClick;
        this.youtubeRef = React.createRef();
        
        this.colorPickerRef = React.createRef();
        this.background = "gray";
    }
    

    reSizeContentsBox(isFull) {
        const youtubeRef = this.youtubeRef.current;
        if (isFull) {
            youtubeRef.perWidth = window.innerWidth;
            youtubeRef.marginLeft = -window.innerWidth * (0.04);
        } else {
            youtubeRef.perWidth = "100%";
            youtubeRef.marginLeft = 0;
        }
        youtubeRef.forceUpdate();
    }

    handleChangeComplete = (color) => {
        this.background = color.hex;
        this.colorPickerRef.current.background = this.background;
        console.log(this.background);
        this.forceUpdate();
    };

    showColorPicker = () => {
        this.colorPickerRef.current.visible = true;
        this.colorPickerRef.current.forceUpdate();
    };

    handleYoutubeAddressInput = (e) => {
        this.setState({
            youtubeAdress:e.target.value
        })
    }

    handleYoutube = () => {
        this.youtubeRef.current.state.youtubeAdress = this.state.youtubeAdress;
        this.youtubeRef.current.forceUpdate();
        console.log(this.youtubeRef.current.state.youtubeAdress);
    }

    render() {
        return (
                    <YoutubeWrapper className="youtubeContentsWrapper" style={{backgroundColor:this.background}}>
                        <ColorPicker ref={this.colorPickerRef} onChangeComplete={this.handleChangeComplete} background={this.background}/>
                        <YoutubeWrapperMenu>
                        <YoutubeWrapperMeneItem onClick={() => this.reSizeContentsBox(true)}>full</YoutubeWrapperMeneItem>
                            <YoutubeWrapperMeneItem onClick={() => this.reSizeContentsBox(false)}>contents</YoutubeWrapperMeneItem>
                            <YoutubeWrapperMeneItem><div>유튜브 주소 <input type="text" value={this.state.youtubeAdress} onChange={this.handleYoutubeAddressInput}/> <button onClick={this.handleYoutube}>확인</button></div></YoutubeWrapperMeneItem>
                            <YoutubeWrapperMeneItem onClick={() => this.showColorPicker()}>color</YoutubeWrapperMeneItem>
                            <YoutubeWrapperMeneItem>del</YoutubeWrapperMeneItem>
                        </YoutubeWrapperMenu>
                        <YoutubeWrapperContents>
                            <YoutubeContents ref={this.youtubeRef}/>
                        </YoutubeWrapperContents>
                    </YoutubeWrapper>
                
        )
    }
}
const YoutubeWrapper = styled.div`
    width:100%;
    background:gray;
    overflow: hidden;
    height: auto;
`
const YoutubeWrapperContents = styled.div`
    margin : 50px auto;
    width:92%;
    background : green;
`

const YoutubeWrapperMenu = styled.ul`
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top: -35px;
    background: white;
`

const YoutubeWrapperMeneItem = styled.li`
    float:left;
    margin-right:5px;
`