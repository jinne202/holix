import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import RightInfoEditModeLayout from './RightInfoEditModeLayout'
export default class ArchiveRightInfoEditMode extends Component {
    constructor(props) {
        super(props);
        this.onHandleTitleChange = props.onHandleTitleChange;
    }
    
    state = {
        price : 0,
        optionGroups : [],
        focusOGIndex : -1,
        productName : '',
        description : ''
    }

    onChangeProductName = (e) => {
       // setProductName(e.target.value)
       this.setState({productName:e.target.value})
       this.onHandleTitleChange(e.target.value)
    }
    
    onChangeDescription = (e) => {
        this.setState({
            description : e.target.value
        })
    }

    render() {
        return (
            <RightInfoEditModeLayout>
                <ContentsWrapper>
                        <TitleWrapper>
                            <Title value={this.state.productName} onChange={this.onChangeProductName} placeholder="제목"/>
                        </TitleWrapper>
                        <TitleWrapper>
                            <DESCRIPTIONINPUT value={this.state.description} onChange={this.onChangeDescription} placeholder="소개"/>
                        </TitleWrapper>
                        </ContentsWrapper>
                        <BuyWrapper>
                            <BuyButtonWarper>
                                <WillBuyButton onClick={() => this.props.onHandleTempSave(true)}>미리보기</WillBuyButton>
                                <WillBuyButton onClick={() => this.props.onHandleTempSave(false)}>임시저장</WillBuyButton>
                                <BuyButton onClick={() => this.props.onPostHandle()} >등록하기</BuyButton>
                            </BuyButtonWarper>
                        </BuyWrapper>
            </RightInfoEditModeLayout>
        )
    }
}

const ContentsWrapper = styled.div`
    width:90%;
    margin: 10px auto;
    height : calc(100% - 84px);
    overflow-y:scroll;
`

const TitleWrapper = styled.div`
    position: relative;
    margin: 0;
    border: 0;
    text-align: left;
    border-bottom: 1px solid #e9e9e9;
`

const Title = styled.input`
    font-size: 24px;
    color: #222;
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    line-height: 36px;
    width:100%;
`

const DESCRIPTIONINPUT = styled.textarea`
    font-size: 24px;
    color: #222;
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    line-height: 36px;
    width:100%;
`

const BuyWrapper = styled.div`
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px);
    box-shadow: rgb(4 4 5 / 5%) 0px -5px 12px;

    position:absolute;
    width:100%;
    bottom:0;
    height:auto;
    overflow:auto;
    padding: 19px 1% 13px 1%;
    color: #353535;
    vertical-align: middle;
    background: #fff;
    right:0;
`

const BuyButtonWarper = styled.div`
`

const WillBuyButton = styled.button`
    width: 30%;
    height: 52px;
    line-height: 52px;
    border: 1px solid #e5e5e5;
    letter-spacing: -0.3px;
    color: #888;
    font-size: 17px;
    display: block;
    float: left;
    font-weight: 300;
    margin-right: 14px;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
`

const BuyButton = styled.button`
    width: 30%;
    height: 52px;
    line-height: 52px;
    border: 3px solid #000;
    letter-spacing: 1px;
    background-color: #fff;
    color: #000;
    font-size: 17px;
    font-weight: 600;
    display: block;
    float: left;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
`
