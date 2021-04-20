import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentsMenu from './ContentsMenu';

/**
 * Component that alerts if you click outside of it
 */
export default class ContentsWrapper2 extends Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.visible = false;
        this.focused = false;
        this.viewMode = false;
        this.hover = false;
        this.contentCount = 0;
        this.state = {
            background : '#fff'
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('mouseover', this.handleHover);
        document.addEventListener('mouseout', this.handleLeave);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('mouseover', this.handleHover);
        document.removeEventListener('mouseout', this.handleLeave);
    }
    

    getContentsPadding(contentCount) {
        this.contentCount = contentCount;
        switch (contentCount) {
            case 1:
                return 0;
            case 2:
                return 5;
            case 3:
                return 4;
            case 4:
                return 2;
        }
    }
    
    handleHover(e) {
        if (this.wrapperRef && this.wrapperRef.current && !this.focused) {
            this.hover = this.wrapperRef.current.contains(event.target);
            this.forceUpdate()
        }
    }

    handleLeave(e) {
        
        if (this.wrapperRef && this.wrapperRef.current && !this.focused) {
            this.hover = this.wrapperRef.current.contains(event.target);
            this.forceUpdate()
        }
    }

    handleClickOutside(event) {
        if (this.wrapperRef && this.wrapperRef.current && !event.target.className.includes('ImageButton')) {
            this.focused = this.wrapperRef.current.contains(event.target);
            this.hover = false;
            this.forceUpdate();
        }
    }

    handleChangeBackgroundColor = (color) => {
        console.log(color)
        this.setState({
            background : color
        })
        console.log("handleChangeBackgroundColor");
    }

    render() {
        return (
            <>
                <ContentsMenu handleChangeBackgroundColor={this.handleChangeBackgroundColor} state={this.state}/>
                <Contianer ref={this.wrapperRef} style={{backgroundColor:this.hover && !this.viewMode ? '#d1dccf' : this.state.background, border:!this.viewMode && this.focused ? '2px solid rgb(255, 115, 14)' : '0'}}>
                    {this.props.contents}
                </Contianer>
            </>
        )
    }
}

const Contianer = styled.div`
    width:100%;
    background:#dedede;
    overflow: hidden;
    height: auto;
    display: flex;
`