import React, { Component } from 'react';
import OutsideClickWrapper from './OutsideClickWrapper';
import { SketchPicker } from 'react-color';
import styled, { css } from 'styled-components';
/**
 * Component that alerts if you click outside of it
 */
export default class ColorPicker extends OutsideClickWrapper {
    constructor(props) {
        super(props);
        this.background = props.background;
        this.onChangeComplete = props.onChangeComplete;
        this.visible = props.visible;
    }
    
    render() {
        if (this.visible) {
            return (
                <PickerWrap ref={this.wrapperRef}>
                    <SketchPicker
                        color={ this.background }
                        onChange={this.onChangeComplete }
                    />
                </PickerWrap>
            )
        } else {
            return <></>;
        }
    }
}

const PickerWrap = styled.div`
    position : fixed;
    left:30%;
    top:30%;
    width: auto;
    display: inline-block;
    z-index:99;
`