import React, { Component, Fragment } from 'react';
import styled, { css, keyframes } from 'styled-components';
import SideMenu from './SideMenu';
import ImageContentsWrapper from './ImageContentsWrapper';
import TextContentsWrapper from './TextContentsWrapper';
import YoutubeContentsWrapper from './YoutubeContentsWrapper';
import MapBoxWrapper from './MapBoxWrapper';
import Anchor from './Anchor';

/**
 * Component that alerts if you click outside of it
 */
export default class ViewPostingForm extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.contentsIndex = 0;
        this.contentsWrappers = [];
        this.anchorList = [];
        this.preview = false;
    }

    componentDidUpdate() {
    }

    transferForViewer = (contentsList) => {
        contentsList.map(c => {
            if (c.type == "ImageContentsWrapper") {
                this.addImage(c);
            } else if (c.type == "TextContentsWrapper") {
                this.addText(c);
            } else if (c.type == "YoutubeContentsWrapper") {
                this.addVideo(c);
            } else if (c.type == "MapBoxWrapper") {
                this.addMap(c);
            }
            console.log(c);
        });
    }
    //컨텐츠 추가 영역
    addImage = (info) => {
        var ref = React.createRef();
        this.contentsWrappers.push([<ImageContentsWrapper ref={ref} contentIndex={this.contentsIndex} viewMode={true} background={info.background} contentsList={info.contentsList} mode={info.mode} animation={info.animation} animationTime={info.animationTime}/>, ref]);
        this.contentsIndex++;
        this.forceUpdate();
    };

    addText = (info) => {
        var ref = React.createRef();
        this.contentsWrappers.push([<TextContentsWrapper ref={ref} contentIndex={this.contentsIndex} viewMode={true} background={info.background} contentsList={info.contentsList} animation={info.animation} animationTime={info.animationTime}/>, ref]);
        this.contentsIndex++;
        this.forceUpdate();
    };

    addVideo = (info) => {
        var ref = React.createRef();
        this.contentsWrappers.push([<YoutubeContentsWrapper ref={ref} contentIndex={this.contentsIndex} viewMode={true} isFull={info.isFull} background={info.background} youtubeAdress={info.youtubeAdress} animation={info.animation} animationTime={info.animationTime}/>, ref]);
        this.contentsIndex++;
        this.forceUpdate();
    };

    addMap = (info) => {
        var ref = React.createRef();
        this.contentsWrappers.push([<MapBoxWrapper ref={ref} contentIndex={this.contentsIndex} viewMode={true} isFull={info.isFull} background={info.background} place={info.place} animation={info.animation} animationTime={info.animationTime}/>, ref]);
        this.contentsIndex++;
        this.forceUpdate();
    };

    resizeContents() {
        this.contentsWrappers.map((c) => {
            if (c[1].current)
                c[1].current.reSizingContentsBox();
        })
    }


    render() {
        const showContentsList = this.contentsWrappers.map((c, index) => <Fragment key={index}>{c[0]}</Fragment> );
        const showAnchorist = this.anchorList.map((anchor, index) =>  <Fragment key={index}>{anchor[0]}</Fragment>);
        return (
            <ContentsWrapper onClick={this.addAnchor} ref={this.myRef}>
               
                {
                    showContentsList
                }
                {
                    showAnchorist
                }
            </ContentsWrapper>
        );
    }
}

const ContentsWrapper = styled.div`
    position:relative;
`
