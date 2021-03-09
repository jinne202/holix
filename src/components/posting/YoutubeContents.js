import React, { Component } from 'react';
import styled, { css } from 'styled-components';

/**
 * Component that alerts if you click outside of it
 */
export default class YoutubeContents extends Component {
    state = {
        youtubeAdress : null
    }

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.perWidth =  "100%";
        this.marginLeft = "0";
    }



    render() {
        return (
            <><ContentsBox style={{width : this.perWidth, marginLeft : this.marginLeft}}> 
                { this.state.youtubeAdress ?
                        <YoutubeIframe src={this.state.youtubeAdress} allowfullscreen="" frameborder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">

                        </YoutubeIframe>
                    :
                    <></>
                }
                </ContentsBox>
            </>
        );
    }
}

const ContentsBox = styled.div`
    background:blue;
    display:inline-block;
    padding-bottom: 56.25%;
    overflow: hidden;
    position: relative;
`

const YoutubeIframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`