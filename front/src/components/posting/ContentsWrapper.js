import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that alerts if you click outside of it
 */
export default class ContentsWrapper extends Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.visible = false;
        this.focused = false;
        this.hover = false;
        this.contentCount = 0;
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
        console.log(event.target)
        if (this.wrapperRef && this.wrapperRef.current && !event.target.className.baseVal && !event.target.title && !event.target.className.includes('saturation') && !event.target.className.includes('Button') && !event.target.className.includes('menu')) {
            this.focused = this.wrapperRef.current.contains(event.target);
            this.hover = false;
            this.forceUpdate();
        }
        console.log("this.focused " + this.focused )
    }
}