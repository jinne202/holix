import React, { Component } from 'react';
import styled, { css } from 'styled-components';

/**
 * Component that alerts if you click outside of it
 */
export default class Anchor extends Component {
    state = {
        anchorIndex : 0,
        isRemove:false
    }

    constructor(props) {
        super(props);
        this.top = props.aTop;
        console.log(props.anchorIndex);
        this.state = {
            anchorIndex : props.anchorIndex
        }
        this.onClickHandler = props.onClickHandler
    }

    transferForUpload() {
        const json = {
            anchorIndex : this.state.anchorIndex,
            top : this.top
        }
        
        return json;
    }


    render() {
        return (
            <>
            { !this.state.isRemove ? 
                <AnchorWrapper style={{top:this.top + 'px'}} onClick={this.onClickHandler}>
                    <AnchorIndex>
                        {this.state.anchorIndex}
                    </AnchorIndex>
                    <AnchorLine>
                    </AnchorLine>
                </AnchorWrapper>            
            : <></>
            }
            </>
        );
    }
}

const AnchorWrapper = styled.div`
    overflow: hidden;
    position: absolute;
    top: 0;
    width: auto;
    height: auto;
    left: 4px;
`

const AnchorIndex = styled.div`
    width: 30px;
    height: 30px;
    background-color: beige;
    border-radius: 30px;
    border: 1px solid;
    box-sizing: border-box;
    margin: auto;
    text-align: center;
    display: inline-block;
`

const AnchorLine = styled.div`
    border: 1px solid;
    display: inline-block;
    width: 50px;
    margin-bottom: 5%;
`