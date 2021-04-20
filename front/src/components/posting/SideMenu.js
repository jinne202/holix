import React, { Component, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import { useRouter } from "next/router";
import ImageButton from './ImageButton'

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.menus = props.menus;
    }
    state = {
        top : 30
    }

    render() {
        return (
            <MenuWrapper style={{top:this.state.top}}>
                <ul>

                    {this.menus.map((menu, index) =>
                        <MenuList key={index} onClick={menu.onClick}><ImageButton name={menu.name}/></MenuList>
                    )}
                </ul>
            </MenuWrapper>
        )
    }
}

const MenuWrapper = styled.div`
    width: 82px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 53px;
    text-align: center;
    padding: 20px 0;
    position: absolute;
    top: 30px;
    right: 60px;
    z-index: 99;
    ${props =>
    props.header === true &&
    css`
        height : 56px;
    `}

    & > ul {
        left: 32%;
        position: relative;
    }
`

const MenuList = styled.li`
    margin-bottom: 10px;
    float: inherit;
    width:30px;
    height:30px;
`
