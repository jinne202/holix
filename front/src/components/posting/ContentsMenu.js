import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';
import ImageButton from './ImageButton';
import AnimationMenu from './AnimationMenu';

export default class ContentsMenu extends Component {
    constructor(props) {
        super(props);
        this.colorPickerRef = React.createRef();
        this.animationRef = React.createRef();
        this.state = {
            background : '#fff'
        }
    }

    showColorPicker = () => {
        this.colorPickerRef.current.visible = true;
        this.colorPickerRef.current.forceUpdate();
    }

    showAnimationMenu = () => {
        console.log("showAnimationMenu")
    }

    changeAnimation = () => {
        console.log("changeAnimation")
    }


    render() {
        return (
            <MenuWrapper>
                <ColorPicker ref={this.colorPickerRef} onChangeComplete={(color) => this.props.handleChangeBackgroundColor(color.hex)} background={this.props.state.background}/>
                { this.props.children }
                <MenuItem onClick={() => this.showColorPicker()}><ImageButton name="colorChange"/></MenuItem>
                <MenuItem onClick={this.showAnimationMenu}>
                    <ImageButton name="changeAnimation"/>
                    <AnimationMenu ref={this.animationRef} changeAnimation={this.changeAnimation}/>
                </MenuItem>
                <MenuItem onClick={this.removeHandler} ><ImageButton name="delete"/></MenuItem>
            </MenuWrapper>
        )
    }
}

const MenuWrapper = styled.ul`
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top: -35px;
    background: white;
    padding-left: 13px;
    border: 1px solid #ACACAC;
    z-index: 99;
`

const MenuItem = styled.li`
    float:left;
    margin-right:5px;
    width:25px;
    height:25px;
    margin: 11px 20px 11px 0;
    background: white;
`