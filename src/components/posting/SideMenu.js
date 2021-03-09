import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import { useRouter } from "next/router";

const SideMenu = ({ menus }) => {
    
    return (
        <MenuWrapper>
            <ul>

                {menus.map((menu, index) =>
                    <MenuList key={index}><ImageButton name={menu.name} onClick={menu.onClick}/></MenuList>
                )}
            </ul>
        </MenuWrapper>
    )
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
    z-index: 1;
    ${props =>
    props.header === true &&
    css`
        height : 56px;
    `}
`

const ImageButton = styled.button`
    width: 30px;
    height: 30px;
    border: 0;
    background: url(${require(`../../../images/editor/addImage.png`)});
    background-size: cover;
`
const MenuList = styled.li`
    padding-bottom: 10px;
    float: inherit;
`

export default SideMenu;