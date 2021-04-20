import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import RightInfoEditModeLayout from './RightInfoEditModeLayout'

export default class StoreRightInfoEditMode extends Component {
    constructor(props) {
        super(props);
        this.onHandleTitleChange = props.onHandleTitleChange;
        this.width = "25%";
    }
    
    state = {
        price : 0,
        optionGroups : [],
        focusOGIndex : -1,
        productName : '',
        isFull: false
    }

    onChangeProductName = (e) => {
       // setProductName(e.target.value)
       this.setState({productName:e.target.value})
       this.onHandleTitleChange(e.target.value)
    }

    addOptionGroup = (e) => {
        let optionGroup = {
            necessary:false,
            name:'테스트',
            options: []
        }
        if (this.state.focusOGIndex == -1) {
            this.setState({
                focusOGIndex : 0
            })
        }
        this.setState(prevState => ({
            optionGroups : [...prevState.optionGroups, optionGroup]
        }))

    }

    deleteOptionGroup = (index) => () => {
        this.setState(prevState => ({
            optionGroups : prevState.optionGroups.filter(og => prevState.optionGroups.indexOf(og) !== index)
        }))
    }

    addOption = () => {
        let option = {
            name : '옵션 테스트',
            addPrice : 0,
            count : 1
        }
        let copyOption = this.state.optionGroups.find(og => this.state.optionGroups.indexOf(og) === this.state.focusOGIndex).options;
        copyOption.push(option);
        this.setState(prevState => ({
            optionGroups : prevState.optionGroups.map(og => 
                prevState.optionGroups.indexOf(og) === this.state.focusOGIndex
                ? {...og, options : copyOption} 
                : og )
        }))
    }
    
    changeOptionNecessary = (e) => {
        this.setState(prevState => ({
            optionGroups : prevState.optionGroups.map(og => 
                prevState.optionGroups.indexOf(og) === this.state.focusOGIndex
                ? {...og, necessary : e.target.checked} 
                : og)
        }))
    }

    changeOptionGroupName = (e) => {
        this.setState(prevState => ({
            optionGroups : prevState.optionGroups.map(og => 
                prevState.optionGroups.indexOf(og) === this.state.focusOGIndex
                ? {...og, name : e.target.value} 
                : og)
        }))
    }

    deleteOption = (index) => () => {
        let options = this.state.optionGroups.find(og => this.state.optionGroups.indexOf(og) === this.state.focusOGIndex).options;
        this.setState(prevState => ({
            optionGroups : prevState.optionGroups.map(og => 
                prevState.optionGroups.indexOf(og) === this.state.focusOGIndex
                ? {...og, options : options.filter(o => options.indexOf(o) !== index)} 
                : og )
        }))
    }

    onChangeOptionName = (index) => (e) => {
        let options = this.state.optionGroups.find(og => this.state.optionGroups.indexOf(og) === this.state.focusOGIndex).options;
        options.find(o => options.indexOf(o) === index).name = e.target.value;
        this.setState(prevState => ({
            optionGroups : prevState.optionGroups.map(og => 
                prevState.optionGroups.indexOf(og) === this.state.focusOGIndex
                ? {...og, options : options} 
                : og )
        }))
    }

    onChangeOptionPrice = (index) => (e) => {
        let options = this.state.optionGroups.find(og => this.state.optionGroups.indexOf(og) === this.state.focusOGIndex).options;
        options.find(o => options.indexOf(o) === index).addPrice = e.target.value;
        this.setState(prevState => ({
            optionGroups : prevState.optionGroups.map(og => 
                prevState.optionGroups.indexOf(og) === this.state.focusOGIndex
                ? {...og, options : options} 
                : og 
            )}))
    }

    onChangeOptionCount = (index) => (e) => {
        let options = this.state.optionGroups.find(og => this.state.optionGroups.indexOf(og) === this.state.focusOGIndex).options;

        options.find(o => options.indexOf(o) === index).count = e.target.value;
        this.setState(prevState => ({
            optionGroups : prevState.optionGroups.map(og => 
                prevState.optionGroups.indexOf(og) === this.state.focusOGIndex
                ? {...og, options : options} 
                : og  )
        }))
    }

    array_move = (arr, old_index, new_index) => {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    }

    optionGroupMove = (index, isUp) => {
      
        this.setState({
            optionGroups : this.array_move(this.state.optionGroups, index, isUp ? index - 1 : index + 1)
        })
    }


    optionMove = (index, isUp) => {
        let options = this.state.optionGroups.find(og => this.state.optionGroups.indexOf(og) === this.state.focusOGIndex).options;
        this.setState(prevState => ({
            optionGroups : prevState.optionGroups.map(og => 
                prevState.optionGroups.indexOf(og) === this.state.focusOGIndex
                ? {...og, options : this.array_move(options, index, isUp ? index - 1 : index + 1)}
                : og )
        }))
    }
    //가격
    onChangePrice = (e) => {
        this.setState({
            price : e.target.value
        })
    }
    
    handleSideInfo = () => {
        this.setState(prevState => ({
            isFull : !prevState.isFull
        }))
    }

    render() {
        return (
            <RightInfoEditModeLayout>
                        <ContentsWrapper>
                        <TitleWrapper>
                            <Title value={this.state.productName} onChange={this.onChangeProductName} placeholder="상품명"/>
                        </TitleWrapper>
                        <PriceWrapper>
                            <ProductInfoTable>
                                <tbody>
                                    <tr>
                                        <th>
                                            판매가
                                        </th>
                                        <td>
                                            <PriceInput value={this.state.price} onChange={this.onChangePrice}/> 원
                                        </td>
                                    </tr>
                                </tbody>
                            </ProductInfoTable>
                        </PriceWrapper>
                        <OptionWrapper>
                            <ProductInfoTable>
                            <tbody>
                                <tr>
                                    <th>
                                        옵션
                                    </th>
                                    <td>
                                        <ProductOptionList>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        필수
                                                    </td>
                                                    <td>
                                                        옵션 그룹명
                                                    </td>
                                                    <td>
                                                        삭제
                                                    </td>
                                                    <td>
                                                        순서
                                                    </td>
                                                </tr>
                                                {
                                                    this.state.optionGroups.map((og, i) => {
                                                        return (<tr className={i == this.state.focusOGIndex ? "highlight" : ""}  onClick={() => {
                                                                    this.setState({focusOGIndex:i})
                                                                    }}>
                                                                    <td>
                                                                        <input type="checkbox" value={og.necessary} onChange={this.changeOptionNecessary}/>
                                                                    </td>
                                                                    <td>
                                                                            <input type="text" placeholder="그룹명" value={og.name} onChange={this.changeOptionGroupName}/>
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={this.deleteOptionGroup(i)}>
                                                                            삭제
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={() => this.optionGroupMove(i, true)} disabled={i == 0}>^</button>
                                                                        <button onClick={() => this.optionGroupMove(i, false)} disabled={i == this.state.optionGroups.length - 1}>⌵</button>
                                                                    </td>
                                                                </tr>)
                                                    })
                                                }
                                            </tbody>
                                        </ProductOptionList>
                                        <button onClick={this.addOptionGroup}>옵션 그룹 추가</button>
                                    </td>
                                </tr>
                                </tbody>
                            </ProductInfoTable>
                            { this.state.focusOGIndex !== -1 ?
                                <>
                                <OptionList>
                                    <tbody>
                                        <tr>
                                            <td>옵션이름</td>
                                            <td>가격</td>
                                            <td>재고</td>
                                            <td>삭제</td>
                                            <td>순서</td>
                                        </tr>
                                        {
                                            this.state.optionGroups.find(og => this.state.optionGroups.indexOf(og) === this.state.focusOGIndex) ?
                                            this.state.optionGroups.find(og => this.state.optionGroups.indexOf(og) === this.state.focusOGIndex).options.map((o, i) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <input type="text" value={o.name} onChange={this.onChangeOptionName(i)}/>
                                                        </td>
                                                        <td>
                                                            <input type="text" value={o.addPrice} onChange={this.onChangeOptionPrice(i)}/>
                                                        </td>
                                                        <td>
                                                            <input type="text" value={o.count} onChange={this.onChangeOptionCount(i)}/>
                                                        </td>
                                                        <td><button onClick={this.deleteOption(i)}>삭제</button></td>
                                                        <td>
                                                            <button onClick={() => this.optionMove(i, true)} disabled={i == 0}>^</button>
                                                            <button onClick={() => this.optionMove(i, false)} disabled={i == this.state.optionGroups.find(og => this.state.optionGroups.indexOf(og) === this.state.focusOGIndex).options.length - 1}>⌵</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <></>
                                        }
                                    </tbody>
                                </OptionList>
                                <button onClick={this.addOption}>옵션 추가</button>
                                </>
                                : <></>
                                }
                        </OptionWrapper>
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
`

const PriceWrapper = styled.div`
    margin: 0px 0 0px 0;
    font-size: 11px;
    color: #333333;
`

const PriceInput = styled.input`
`

const ProductOptionList = styled.table`
    width:100%;
    font-size:13px;
    border-collapse: collapse;
    & > tbody >  tr {
        height:30px;
    }

    & > tbody > .highlight {
        background:gray;
    }
`

const ProductInfoTable = styled.table`
    width:100%;
    font-size:13px;
    border-collapse: collapse;
    margin-top: 10px;
    & > tbody > th {
        width : 30px;
    }
    & >  tbody > tr {
        border-bottom : 1px solid #9a9ba0;
        height: 60px;
    }

    & > tbody > tr:last-child {
        border-bottom : 0;
    }

    & > tbody > tr > th {
        width : 20%;
        text-align:left;
    }

    & > tbody > tr > td > select {
        width : 100%;
    }
`

const OptionWrapper = styled.div`
    border-top:1px solid black;
    font-size: 11px;
    color: #333333;
    margin-top: 10px;
`
const OptionList = styled.table`
    width:100%;
    border-top: 1px solid #e9e9e9;
    margin-top: 10px;
    padding-top: 5px;
    
    & > tbody > tr > td {
        width : 25%;
    }

    & > tbody > tr > td > input {
        width : 100%;
    }
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
}
`

const BuyLabel = styled.span`

`

const BuyCount = styled.span`
    font-style: normal;
    font-size: 21px;
    font-weight: 400;
`

const CountWarpper = styled.div`
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
