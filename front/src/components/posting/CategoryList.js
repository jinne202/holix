import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import OutsideClickWrapper from './OutsideClickWrapper';

/**
 * Component that alerts if you click outside of it
 */
export default class CategoryList extends OutsideClickWrapper {
    constructor(props) {
        super(props);
        this.list = props.list;
        this.onClick = props.addOnClick;
    }
    
    render() {
        const categoryItems = this.list.map((c, index) => <li value={c.id} >{c.name}</li>);
        if (this.visible) {
            return (
                <CategoryWrapper>
                    <ul ref={this.wrapperRef} onClick={this.onClick}>{categoryItems}</ul>
                </CategoryWrapper>
            )
        } else {
            return <></>;
        }
    }
}
const CategoryWrapper = styled.div`
    position: absolute;
    bottom: 81px;
    left: 160px;
    border: 1px solid #BEBEBE;
    box-sizing: border-box;
    border-radius: 5px;
    background: white;
    color:#5f5f5f;
    & > ul {
        padding:5px 10px;
    }

    & > ul > li {
        float: none;
        border-bottom: 1px solid #F0F0F0;
        padding: 0 0 3px 0;
    }
`