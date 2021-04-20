/*global kakao*/ 
import React, { Component, useCallback, useRef } from 'react';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import MabBoxContents from './MabBoxContents';
import ContentsWrapper from './ContentsWrapper';
import ColorPicker from './ColorPicker';
import ImageButton from './ImageButton';

export default class MapBoxWrapper extends ContentsWrapper {
    state = {
        keyWord : null,
        ps :  null,
        background: this.props.background ? this.props.background : "#dedede",
        places : [],
        selectPlace : this.props.place,
        isFull : this.props.isFull,
        isRemove: false,
        isListVisible : false
    }

    constructor(props) {
        super(props);
        this.onClick = props.addOnClick;
        this.mapboxRef = React.createRef();
        this.index = props.contentIndex;
        this.removeHandler = props.removeHandler;
        this.colorPickerRef = React.createRef();
        this.isLoaded = false;
        this.viewMode = props.viewMode;
        console.log(this.props.place)
    }

    transferForUpload(isPreview) {
        console.log(this.state.selectPlace);
        const json = {
            type : "MapBoxWrapper",
            isFull : this.state.isFull,
            place : {
                x: this.state.selectPlace ? this.state.selectPlace.x : 0,
                y: this.state.selectPlace ? this.state.selectPlace.y : 0,
                place_name : this.state.selectPlace ? this.state.selectPlace.place_name : '설정하지않음'
            },
            background : this.state.background
        }
        return json;
    }

    placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
            console.log(this);
            this.setState({
                places : data
            })
            // 페이지 번호를 표출합니다
          //  displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    }

    showSearchedMap = (place) => {
        this.setState({
            selectPlace : place,
            isListVisible : false
        });
        this.mapboxRef.current.flyTo(
            place.x,
            place.y
        )
    }

    componentDidMount() {
        super.componentDidMount()
        if (this.isLoaded) return;
        console.log("zdzdzd");
        const script = document.createElement("script");
        script.async = true;
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=58f6fe68e2765c8dbc7e9a28ddc64b54&libraries=services&autoload=false";
        document.head.appendChild(script);

       script.onload = () => {
        kakao.maps.load(() => {
         console.log(kakao);
          this.setState({ps : new kakao.maps.services.Places()})
          
       
        });
      };
      this.isLoaded = true;
    }

    componentDidUpdate() {
        
    }

    reSizeContentsBox(isFull) {
        const mapboxRef = this.mapboxRef.current;
       /* if (isFull) {
            mapboxRef.perWidth = window.innerWidth;
            mapboxRef.marginLeft = -window.innerWidth * (0.04);
        } else {
            mapboxRef.perWidth = "100%";
            youtubeRef.marginLeft = 0;
        }*/
        this.setState({isFull : isFull});
        mapboxRef.setState({isResizing : true})
        
    }

    reSizingContentsBox() {
        this.mapboxRef.current.state.map.resize();
    }

    handleChangeComplete = (color) => {
        this.setState({background : color.hex})
        this.colorPickerRef.current.background = color.hex;
    };

    showColorPicker = () => {
        this.colorPickerRef.current.visible = true;
        this.colorPickerRef.current.forceUpdate();
    };

    changeKeyword = (e) => {
        this.setState({
            keyWord : e.target.value
        })
    }

    findAddress = () => {
        this.setState({
            isListVisible : true
        })
        this.state.ps.keywordSearch(this.state.keyWord, this.placesSearchCB);
    }


    render() {
        if (this.state.isRemove ) {
            return (<></>)
        } else {
            console.log(this.props.place)
            const searchMapList = this.state.places.map(p => {
                return <li>
                    <MapSearchInfo onClick={() => this.showSearchedMap(p)}>
                        <h5>{p.place_name}</h5>
                        <span>{p.road_address_name}</span>
                        <span>{p.address_name}</span>
                    </MapSearchInfo>
                </li>
            });
            return (
                    <MapContentsWrapper ref={this.wrapperRef} style={{backgroundColor:this.hover && !this.viewMode ? '#d1dccf' : this.state.background, border:this.focused ? '2px solid rgb(255, 115, 14)' : '0'}}>
                        { this.viewMode ? <></>
                        :
                            this.focused ?
                            <>
                            <ColorPicker ref={this.colorPickerRef} onChangeComplete={this.handleChangeComplete} background={this.background}/>
                            <MapBoxWrapperMenu>
                            <MapBoxWrapperMeneItem onClick={() => this.reSizeContentsBox(true)}><ImageButton name="image_full"/></MapBoxWrapperMeneItem>
                                <MapBoxWrapperMeneItem onClick={() => this.reSizeContentsBox(false)}><ImageButton name="container1"/></MapBoxWrapperMeneItem>
                                <MapBoxWrapperMeneItem style={{width:'auto'}}><div>주소 <input type="text" value={this.state.youtubeAdress} onChange={this.changeKeyword}/> <button onClick={this.findAddress}>확인</button></div></MapBoxWrapperMeneItem>
                                <MapBoxWrapperMeneItem onClick={() => this.showColorPicker()}><ImageButton name="colorChange"/></MapBoxWrapperMeneItem>
                                <MapBoxWrapperMeneItem onClick={this.removeHandler} ><ImageButton name="delete"/></MapBoxWrapperMeneItem>
                            </MapBoxWrapperMenu>
                                { this.state.isListVisible ?
                                <MapListWrapper>
                                    <MapList>
                                        {
                                            searchMapList
                                        }
                                    </MapList>
                                </MapListWrapper> : 
                                <></>
                                }
                            </>:<></>
                        }
                        <MapBoxWrapperContents style={{width:this.state.isFull ? '100%' : '92%', margin: this.state.isFull ? '0' : '50px auto'}}>
                            <MabBoxContents ref={this.mapboxRef} place={this.state.selectPlace}/>
                        </MapBoxWrapperContents>
                        { this.state.selectPlace ?
                        <MapInfoWrapper >
                                <MapInfoLabel>Location<br/>on Maps</MapInfoLabel>
                                <MapInfoName> { this.state.selectPlace.place_name} </MapInfoName>
                        </MapInfoWrapper>
                        : <></> }
                    </MapContentsWrapper>
                
            )
        }
    }
}
const MapContentsWrapper = styled.div`
    width:100%;
    background:gray;
    overflow: hidden;
    height: auto;
    position:relative;
`
const MapBoxWrapperContents = styled.div`
    margin : 50px auto;
    width:92%;
    height:500px;
    overflow: hidden;
`

const MapBoxWrapperMenu = styled.ul`
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top: 0px;
    background: white;
    padding-left: 13px;
    border: 1px solid #ACACAC;
    width:450px;
    z-index:99;
`

const MapBoxWrapperMeneItem = styled.li`
    float:left;
    margin-right:5px;
    width:25px;
    height:25px;
    margin: 11px 20px 11px 0;
    background: white;
`

const MapListWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    margin: 10px 0 30px 10px;
    padding: 5px;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.7);
    z-index: 1;
    font-size: 12px;
    border-radius: 10px;
`

const MapList = styled.ul`
    & > li {
        position: relative;
        border-bottom: 1px solid #888;
        overflow: hidden;
        cursor: pointer;
        min-height: 65px;
    }
`


const MapSearchInfo = styled.div`
    padding: 10px 0 10px 55px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    & > span {
        display: block;
        margin-top: 4px;
    }
`

const MapInfoWrapper = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    font-weight:700;
    top:0;;
    &:hover {
        transition: 0.5s;
        opacity:0;
    }
`

const MapInfoLabel = styled.div`
    color : #fff;
    font-size:52px;
    margin-left: 125px;
    margin-top: 79px;
`
const MapInfoName = styled.div`
    color: #00FF85;
    font-size:42px;
    margin-left: 125px;
    margin-top: 62px;
`