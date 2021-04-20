import React, { Component } from 'react';
import styled from 'styled-components';
import { ICONHOST } from 'api/apiConfig'

/**
 * Component that alerts if you click outside of it
 */
export default class ImageButton extends Component {
    constructor(props) {
        super(props);
        this.imgSrc = ICONHOST + "editor/"
    }

    state = {
        name : this.props.name
    }
    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }
    
    render() {
        return (
        <Button imgSrc={this.imgSrc + this.state.name + ".png"} hImgSrc={this.imgSrc + this.state.name + "_h.png"} onClick={this.props.onClick}></Button>
        )
    }
}

const Button = styled.div`
    width:100%;
    height:100%;
    background-image : url(${props => props.imgSrc});
    &:hover {
        background-image : url(${props => props.hImgSrc});
    }
    background-size : cover;
`