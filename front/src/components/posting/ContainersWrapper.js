import React, { Component, Fragment } from 'react';
import styled, { css, keyframes } from 'styled-components';

/**
 * Component that alerts if you click outside of it
 */
export default class ContainersWrapper extends Component {
    constructor(props) {
        super(props);
        this.hover = props.hover;
        this.viewMode = props.viewMode;
    }

    render() {
        return (
            <ContainerWrapper ref={this.props.wrapperRef }animation={this.props.state.animation} style={{backgroundColor:this.hover && !this.viewMode ? '#d1dccf' : this.props.state.background, border:!this.viewMode && this.focused ? '2px solid rgb(255, 115, 14)' : '0'}}>
                    {this.props.children}
            </ContainerWrapper>
        );
    }
}


const ContainerWrapper = styled.div`
    width:100%;
    background:#dedede;
    overflow: hidden;
    height: auto;
    display: flex;
    animation-duration: 3s;
    animation-name:  ${props => props.animation};
`
