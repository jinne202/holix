import React, { Component, Fragment } from 'react';
import styled, { css, keyframes } from 'styled-components';
import SideMenu from './SideMenu';
import ImageContentsWrapper from './ImageContentsWrapper';
import TextContentsWrapper from './TextContentsWrapper';
import YoutubeContentsWrapper from './YoutubeContentsWrapper';
import MapBoxWrapper from './MapBoxWrapper';
import Anchor from './Anchor';

import ContentsWrapper2 from './ContentsWrapper2';

import ContainersWrapper from './ContainersWrapper'
/**
 * Component that alerts if you click outside of it
 */
export default class EditPostingForm extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.sideMenuRef = React.createRef();
        this.containerRef = React.createRef();
        this.contentsIndex = 0;
        this.contentsWrappers = [];
        this.anchorList = [];
        this.isAnchorRemoving = false;
        this.dragIndex = -1;
        this.contentsCount = 0;
    }

    state = {
       isAddAnchorMode : false
    }

    componentDidMount() {
        if (this.myRef.current && this.sideMenuRef.current)
            document.getElementById("productContentsrapper").addEventListener('scroll', this.scrollMove);
    }

    componentWillUnmount() {
        document.getElementById("productContentsrapper").removeEventListener('scroll', this.scrollMove);
    }
    
    componentDidUpdate() {
        this.calcAnchorIndex()
        console.log("1 document.getElementById(productContentsrapper).scrollHeight" + document.getElementById("productContentsrapper").scrollHeight)
        if (this.contentsCount != this.contentsWrappers.length) {
            document.getElementById("productContentsrapper").scrollTo({ top: document.getElementById("productContentsrapper").scrollHeight, behavior: 'smooth' })
            this.contentsCount = this.contentsWrappers.length;
        }
    }

    scrollMove = (e) => {
        console.log("2 document.getElementById(productContentsrapper).scrollHeight" + document.getElementById("productContentsrapper").scrollHeight)
        if (this.myRef.current && this.myRef.current.offsetTop < document.getElementById("productContentsrapper").scrollTop) {
            this.sideMenuRef.current.setState({
                top : document.getElementById("productContentsrapper").scrollTop - this.myRef.current.offsetTop + 30
            })
        }
    }

    removeHandler = (index) => (e) => {
        this.contentsWrappers.map(c => console.log( c[1].current.index))
        this.contentsWrappers.find(c => c[1].current && c[1].current.index === index)[1].current.setState({
            isRemove : true });
       this.forceUpdate();
    }

    getFocuedIndex = () => {
        var index = -1;
        this.contentsWrappers.forEach(c =>{
            if (c[1].current.focused) {
                console.log("this.contentsWrappers.indexOf(c)" + this.contentsWrappers.indexOf(c));
                index = this.contentsWrappers.indexOf(c) + 1;
            }
        })
        return index;
    }

    //컨텐츠 추가 영역
    addImage = (info) => {
        var ref = React.createRef();
       // let focusIndex = this.getFocuedIndex();
       // if (focusIndex == -1) {
       //     this.contentsWrappers.push([<ImageContentsWrapper ref={ref} className={"ImageContentsWrapper_" + this.contentsIndex} contentIndex={this.contentsIndex} removeHandler={this.removeHandler(this.contentsIndex)}/>, ref]);
      //  } else {
       //     this.contentsWrappers.splice(focusIndex, 0, [<ImageContentsWrapper ref={ref} className={"ImageContentsWrapper_" + this.contentsIndex} contentIndex={this.contentsIndex} removeHandler={this.removeHandler(this.contentsIndex)}/>, ref]);
      //  }
        console.log(this.allowDrop)
      this.contentsWrappers.push([<ImageContentsWrapper ref={ref} onDragStart={this.onDragStart} onDrop={this.onDrop} onDragOver={this.allowDrop} contentIndex={this.contentsIndex} removeHandler={this.removeHandler(this.contentsIndex)} viewMode={false} background={info.background} contentsList={info.contentsList} mode={info.mode} animation={info.animation} animationTime={info.animationTime}/>, ref]);
      this.contentsIndex++;
     
    //    this.containerRef.current.forceUpdate()
        this.forceUpdate();
        
    };

    addText = (info) => {
        var ref = React.createRef();
        this.contentsWrappers.push([<TextContentsWrapper ref={ref} onDragStart={this.onDragStart} onDrop={this.onDrop} onDragOver={this.allowDrop} contentIndex={this.contentsIndex} removeHandler={this.removeHandler(this.contentsIndex)} viewMode={false} background={info.background} contentsList={info.contentsList} animation={info.animation} animationTime={info.animationTime}/>, ref]);
        this.contentsIndex++;
        this.forceUpdate();
    };

    addVideo = (info) => {
        var ref = React.createRef();
        this.contentsWrappers.push([<YoutubeContentsWrapper ref={ref} onDragStart={this.onDragStart} onDrop={this.onDrop} onDragOver={this.allowDrop} contentIndex={this.contentsIndex} removeHandler={this.removeHandler(this.contentsIndex)} viewMode={false} isFull={info.isFull} background={info.background} youtubeAdress={info.youtubeAdress} animation={info.animation} animationTime={info.animationTime}/>, ref]);
        this.contentsIndex++;
        this.forceUpdate();
    };

    addMap = (info) => {
        var ref = React.createRef();
        this.contentsWrappers.push([<MapBoxWrapper ref={ref} onDrop={this.onDrop} onDragOver={this.allowDrop} contentIndex={this.contentsIndex} removeHandler={this.removeHandler(this.contentsIndex)} viewMode={false} isFull={info.isFull} background={info.background} place={info.place} animation={info.animation} animationTime={info.animationTime}/>, ref]);
        this.contentsIndex++;
        this.forceUpdate();
    };

    changeAddAnchorMode = () => {
        if (this.contentsWrappers.length == 0) {
            alert("컨텐츠를 먼저 추가해주세요.")
            return;
        }
        this.setState(prevState => ({
            isAddAnchorMode : !prevState.isAddAnchorMode
        }))
    };

    removeAnchor = (ref) => {
        this.isAnchorRemoving  = true;
        this.anchorList.find(a => !a[1].current.state.isRemove && a[1].current.top === ref.current.top)[1].current.setState({isRemove: true});
        this.forceUpdate();
    }

    addAnchor = (e) => {
        if (this.state.isAddAnchorMode && !this.isAnchorRemoving && e.pageX < 200) {
            var y = (e.pageY - this.myRef.current.offsetTop) + document.getElementById("productContentsrapper").scrollTop - 80/*헤더값*/;
            var ref = React.createRef();
            this.anchorList.push([<Anchor ref={ref} aTop={y} onClickHandler={() => this.removeAnchor(ref)} anchorIndex = {this.anchorList.length + 1}/>, ref]);
            this.forceUpdate();
        }
        this.isAnchorRemoving  = false;
    };

    calcAnchorIndex() {
        this.anchorList.filter(a => !a[1].current.state.isRemove).sort((a, b) => a[1].current.top > b[1].current.top ? 1 : -1)
        .map((anchor, i) => {
            anchor[1].current.setState({anchorIndex : i + 1});
        });
    }
    resizeContents() {
        this.contentsWrappers.map((c) => {
            c[1].current.reSizingContentsBox();
        })
    }

    loadData = (contentsList) => {
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


    transferForUpload(isPreview) {
        var contentList = [];
        var files = [];
        this.contentsWrappers.filter(c => !c[1].current.state.isRemove).map(c => {
            contentList.push(c[1].current.transferForUpload(isPreview))
            if (c[1].current.constructor.name == "ImageContentsWrapper") {
                files.push(...c[1].current.getFiles());
            }
        })
        const json = {
            contentsSize : this.contentsWrappers.length,
            contentsList : contentList
        }
        return {
            json : json,
            files : files }
    }
    
    editMenu = [  {
                    name: 'gimage',
                    onClick: this.addImage
                },
                {
                    name: 'gtext',
                    onClick: this.addText
                },
                {
                    name: 'video',
                    onClick: this.addVideo
                },
                {
                    name: 'map',
                    onClick: this.addMap
                },
                {
                    name: 'anchor',
                    onClick: this.changeAddAnchorMode
                }];
    allowDrop = (i, e) => {
        e.preventDefault();
    }

    array_move = (arr, old_index, new_index) => {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        console.log(arr)
      //  return arr;
    };

    
    onDrop = (i, e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(this.dragIndex)
        console.log(e)
        var targetIndex = -1;
        this.contentsWrappers.map(c => {
            if (c[1].current.wrapperRef.current.contains(e.target))
                targetIndex = this.contentsWrappers.indexOf(c)
        })
        console.log("targetIndex" + targetIndex)
        this.array_move(this.contentsWrappers, this.dragIndex, targetIndex)
     
      //  this.forceUpdate();
    }

    onDragStart = (i) => {
        this.dragIndex = i
        console.log("onDragStart index" + this.dragIndex)
    }

    render() {
        const showContentsList = this.contentsWrappers.map((c, index) => 
        <Fragment key={index}>
            {c[0]}
        </Fragment> );
        const showAnchorist = this.anchorList.map((anchor, i) =>  anchor[0]);
        return (
            <ContentsWrapper onClick={this.addAnchor} ref={this.myRef}>
                <SideMenu ref={this.sideMenuRef} menus={this.editMenu} />
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