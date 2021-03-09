import React, { Component } from 'react';
import SideMenu from './SideMenu';
import ImageContentsWrapper from './ImageContentsWrapper';
import TextContentsWrapper from './TextContentsWrapper';
import YoutubeContentsWrapper from './YoutubeContentsWrapper';
import MapBoxWrapper from './MapBoxWrapper';
/**
 * Component that alerts if you click outside of it
 */
export default class EditPostingForm extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.contentsWrappers = [];
    }
    //컨텐츠 추가 영역
    addImage = () => {
        this.contentsWrappers.push(<ImageContentsWrapper />);
        this.forceUpdate();
    };

    addText = () => {
        this.contentsWrappers.push(<TextContentsWrapper />);
        this.forceUpdate();
    };

    addVideo = () => {
        this.contentsWrappers.push(<YoutubeContentsWrapper />);
        this.forceUpdate();
    };

    addMap = () => {
        this.contentsWrappers.push(<MapBoxWrapper />);
        this.forceUpdate();
    };

    addAnchor = () => {
        console.log("click me");
    };

    editMenu = [  {
                    name: 'addImage',
                    onClick: this.addImage
                },
                {
                    name: 'addText',
                    onClick: this.addText
                },
                {
                    name: 'addVideo',
                    onClick: this.addVideo
                },
                {
                    name: 'addMap',
                    onClick: this.addMap
                },
                {
                    name: 'addAnchor',
                    onClick: this.addAnchor
                }];
    render() {
        return (
            <> 
                <SideMenu menus={this.editMenu} />
                {
                
                this.contentsWrappers.map((c) => 
                   c
                )   
                }
            </>
        );
    }
}