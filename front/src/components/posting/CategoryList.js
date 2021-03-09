import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        const categoryItems = this.list.map((c) => <li value={c.id} >{c.name}</li>);
        if (this.visible) {
            return (
                <ul ref={this.wrapperRef} onClick={this.onClick}>{categoryItems}</ul>
            )
        } else {
            return <></>;
        }
    }x
}