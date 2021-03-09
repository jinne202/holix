/*global kakao*/ 
import React, { Component, useCallback, useRef } from 'react';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import MabBoxContents from './MabBoxContents';
import ContentsWrapper from './ContentsWrapper';
import ColorPicker from './ColorPicker';


export default class MapBoxWrapper extends ContentsWrapper {
    state = {
        youtubeAdress : null
    }

    constructor(props) {
        super(props);
        this.onClick = props.addOnClick;
        this.mapboxRef = React.createRef();
        
        this.colorPickerRef = React.createRef();
        this.background = "gray";
        this.isLoaded = false;
    }
    placesSearchCB(data, status, pagination) {
        console.log("data" + data);
        if (status === kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);
            // 페이지 번호를 표출합니다
            displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    }

    componentDidMount() {
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
          var ps = new kakao.maps.services.Places();
          console.log(ps);
          ps.keywordSearch("수유", this.placesSearchCB);
       
        });
      };
      this.isLoaded = true;
    }

    reSizeContentsBox(isFull) {
        const mapboxRef = this.mapboxRef.current;
        if (isFull) {
            mapboxRef.perWidth = window.innerWidth;
            mapboxRef.marginLeft = -window.innerWidth * (0.04);
        } else {
            mapboxRef.perWidth = "100%";
            youtubeRef.marginLeft = 0;
        }
        mapboxRef.forceUpdate();
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
        this.mapboxRef.current.state.youtubeAdress = this.state.youtubeAdress;
        this.mapboxRef.current.forceUpdate();
        console.log(this.mapboxRef.current.state.youtubeAdress);
    }

    render() {
        return (
                    <MapContentsWrapper className="MapBoxWrapper" style={{backgroundColor:this.background}}>
                        <ColorPicker ref={this.colorPickerRef} onChangeComplete={this.handleChangeComplete} background={this.background}/>
                        <MapBoxWrapperMenu>
                        <MapBoxWrapperMeneItem onClick={() => this.reSizeContentsBox(true)}>full</MapBoxWrapperMeneItem>
                            <MapBoxWrapperMeneItem onClick={() => this.reSizeContentsBox(false)}>contents</MapBoxWrapperMeneItem>
                            <MapBoxWrapperMeneItem><div>주소 <input type="text" value={this.state.youtubeAdress} onChange={this.handleYoutubeAddressInput}/> <button onClick={this.handleYoutube}>확인</button></div></MapBoxWrapperMeneItem>
                            <MapBoxWrapperMeneItem onClick={() => this.showColorPicker()}>color</MapBoxWrapperMeneItem>
                            <MapBoxWrapperMeneItem>del</MapBoxWrapperMeneItem>
                        </MapBoxWrapperMenu>
                        <MapBoxWrapperContents>
                            <MabBoxContents ref={this.mapboxRef}/>
                        </MapBoxWrapperContents>
                    </MapContentsWrapper>
                
        )
    }
}
const MapContentsWrapper = styled.div`
    width:100%;
    background:gray;
    overflow: hidden;
    height: auto;
`
const MapBoxWrapperContents = styled.div`
    margin : 50px auto;
    width:92%;
    background : green;
`

const MapBoxWrapperMenu = styled.ul`
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top: -35px;
    background: white;
`

const MapBoxWrapperMeneItem = styled.li`
    float:left;
    margin-right:5px;
`