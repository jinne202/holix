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
    }
    
    render() {
        if (this.visible) {
            this.onChangeComplete;
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
    position : absolute;
    width: auto;
    display: inline-block;
`