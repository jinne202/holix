import React, {  Component} from 'react';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import ImageButton from './ImageButton';

export default class AnimationMenu extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isVisible : false,
            animationType : 'none',
            animationTime : 3.0
        }
    }
    
    animationList = [
        'none',
        'movingToLeft',
        'movingToRight',
        'movingToTop',
        'fadeIn'
    ]

    onChangeAnimationType = (e) => {
        this.setState({
            animationType : e.target.parentElement.getAttribute('value')
        })
    }

    onChangeAnimationTime = (e) => {
        console.log(e.target.value)
        this.setState({
            animationTime : e.target.value
        })
    }

    render() {
        if (!this.state.isVisible) return <></>
        else {
             const animationList = this.animationList.map(a => 
                <AnimationMenuItem value={a} active={this.state.animationType == a} ><ImageButton name="image_full"/></AnimationMenuItem>
            )
            return (
            <AnimationMenuWrapper>
                <AnimationMenuList onClick={this.onChangeAnimationType}>
                    {animationList}
                </AnimationMenuList>
                <AnimationSettingWrapper>
                    <AnimationTimeSliderButton type="range" min={0.1} max={5} step={0.1} value={this.state.animationTime} onChange={this.onChangeAnimationTime}/>
                    <AnimationTimeTxtrButton type="number" min={0.1} max={5}  value={this.state.animationTime} onChange={this.onChangeAnimationTime}/>
                    <SubmitButton onClick={() => this.props.changeAnimation(this.state.animationType, this.state.animationTime + 's')}>적용</SubmitButton>
                </AnimationSettingWrapper>
            </AnimationMenuWrapper>
            )
        }
    }
}
const AnimationMenuWrapper = styled.div`
    position:absolute;
    background: white;
    padding-left: 13px;
    border: 1px solid #ACACAC;
    width : 200px;
`

const AnimationMenuList = styled.ul`
    position: relative;
    height: 100px;
`

const AnimationMenuItem = styled.li`
    float: left;
    margin-right:5px;
    width:25px;
    height:25px;
    margin: 11px 20px 11px 0;
    background: white;

    ${props =>
        props.active &&
        css`
        border : 2px solid blue;
        `}
`

const AnimationSettingWrapper = styled.div`
    position: relative;
    height: 50px;
`
const AnimationTimeSliderButton = styled.input`
    width : 40%;
`

const AnimationTimeTxtrButton = styled.input`
    width : 45px;
    margin-right:10px;
`

const SubmitButton = styled.button`
`