import React, { useState, useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Router, { useRouter, withRouter  } from "next/router";
import * as ApiConfig from 'api/apiConfig';
import { FiDelete } from 'react-icons/fi';
import RightInfoLayout from 'components/posting/layout/RightInfoLayout'

const StoreRightInfo = ({data}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const selectListRef = useRef(null);
    const totalPriceRef = useRef(null);
    const [product] = useState(data.productInfo)
    const [selected, setSelectedOptions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCheckOption, setCheckedOption] = useState(false);
    const [isFull, setFull] = useState(false);

    const width = "25%";

    const onOptionChange = (e) => {
        const optionIndex = Number(e.target.value);
        const optionGroupIndex = Number(e.target.parentElement.parentElement.getAttribute('data-optionGroupId'));
        if (selected.some(o => o.id === optionIndex)) {
            alert("이미 선택한 옵션입니다.");
            return;
        }
        const selectedOption = {
            product : product,
            groupId: optionGroupIndex,
            id : optionIndex,
            count : 1
        }

        const option = product.optionGroups.find(g => g.id === optionGroupIndex).options.find(o => o.id === optionIndex);
        console.log(option);
        setSelectedOptions([...selected, selectedOption]);
        setTotalPrice(totalPrice + product.price + option.addprice);
        selectListRef.current.focus();
    }

    const moveOrderPage = e => {
        localStorage.setItem('totalPrice', totalPrice);
        localStorage.setItem('selectedOptions', JSON.stringify(selected));
        Router.push("./order")
    }
    
    const handleOptionCount = e => {
        const selectOptionIndex =  Number(e.target.parentElement.parentElement.getAttribute('data-optionid'));
        var count = e.target.value;
        if (count <= 0) {
            alert("0보다 작은 숫자는 입력할 수 없습니다.");
            count = 1;
            e.target.value = 1;
        }
        const selectOption = selected.find(o => o.id === selectOptionIndex);
        selectOption.count = count;
        setSelectedOptions([...selected]);
        calcTotalPrice();
    }

    const calcTotalPrice = () => {
        var price = 0;
        selected.map((o) => {
            var optionGroup, option;
            if (o.groupId != -1) {
                optionGroup = product.optionGroups.find(g => g.id === o.groupId);
                option = optionGroup.options.find(option => option.id === o.id);
                price += o.count * ((optionGroup.necessary ? product.price : 0) + option.addprice);
            } else {
                price += o.count * product.price;
            }
        })
        setTotalPrice(price);
    }

    const handleRemoveOption = e => {
        const selectOptionIndex = Number(e.target.parentElement.parentElement.getAttribute('data-optionid'));
        setSelectedOptions(selected.filter(o => o.id !== selectOptionIndex));
        calcTotalPrice();
    }

    if (!product) return <></>;
    // !-- HEADER 높이
    const checkOption = () => {
        if (isCheckOption) return;
        setCheckedOption(true);

        if (product.optionGroups == null || !product.optionGroups.some(g => g.necessary)) {
            const selectedOption = {
                groupId: -1,
                id : -1,
                count : 1
            }
            setSelectedOptions([...selected, selectedOption]);
            setTotalPrice(totalPrice + product.price);
        }
    }

    const handleSideInfo = () => {
        setFull(!isFull)
    }

    checkOption();
    return (
        <RightInfoLayout>
                <ContentsWrapper>
                <TitleWrapper>
                    <Title>
                        {product ? product.title : ""}
                    </Title>
                </TitleWrapper>
                <PriceWrapper>
                    <ProductInfoTable>
                        <tr>
                            <th>
                                판매가
                            </th>
                            <td>
                                {product ? product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): ""}원
                            </td>
                        </tr>
                    </ProductInfoTable>
                </PriceWrapper>
                <OptionWrapper>
                    <ProductInfoTable>
                        {  
                            product ? 
                                product.optionGroups.map((optionGroup) => {
                                    return (
                                        <tr data-optionGroupId={optionGroup.id}>
                                            <th>
                                                { optionGroup.name }
                                            </th>
                                            <td>
                                                <select onChange={onOptionChange}>
                                                    <option value="*" disabled selected>- {optionGroup.necessary ? "[필수]" : "[선택]"} 옵션을 선택해 주세요 -</option>
                                                    {
                                                        optionGroup.options.map((option) => {
                                                            return (<option value={option.id}>{option.name}  + {option.addprice}</option>)
                                                        }) 
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                }) 
                            :
                            <></>
                        }
                    </ProductInfoTable>
                    
                    <SelectedOptionList ref={selectListRef}>
                        <tbody>
                                {
                                    selected.map((o) => {
                                        var optionGroup, option;
                                        if (o.groupId != -1) {
                                            optionGroup = product.optionGroups.find(g => g.id === o.groupId);
                                            option = optionGroup.options.find(option => option.id === o.id);
                                        }
                                        return (
                                            <tr data-optionid = {o.id}>
                                                <td>
                                                    {o.groupId == -1 ? product.title : option.name}
                                                </td>
                                                <td>
                                                    <input value = {o.count} onChange={handleOptionCount} type="number"/> 
                                                    {
                                                        o.groupId != -1 ?
                                                        <FiDelete onClick={handleRemoveOption}/>
                                                        : <></>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        o.groupId == -1 ? 
                                                            (o.count * product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        :
                                                            optionGroup.necessary ?
                                                                (o.count * (product.price + option.addprice)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                            :
                                                            (o.count * option.addprice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    }원
                                                </td>
                                            </tr>)
                                    })
                                }
                        </tbody>
                    </SelectedOptionList>
                </OptionWrapper>
                    <TabMenu>
                        <li>정보</li>
                        <li>리뷰</li>
                        <li>문의</li>
                    </TabMenu>
                </ContentsWrapper>
                <BuyWrapper>
                        <BuyLabel>총 상품금액(수량) : 
                            <BuyCount ref={totalPriceRef}>
                                {totalPrice}
                            </BuyCount>
                            원
                        </BuyLabel>
                        <BuyButtonWarper>
                            <WillBuyButton>장바구니</WillBuyButton>
                            <BuyButton onClick={moveOrderPage}>구매하기</BuyButton>
                        </BuyButtonWarper>
                    </BuyWrapper>
        </RightInfoLayout>
    )
}

const ContentsWrapper = styled.div`
    width:90%;
    margin: 0 auto;
`

const TitleWrapper = styled.div`
    position: relative;
    margin: 0;
    border: 0;
    text-align: left;
    border-bottom: 1px solid #e9e9e9;
`
const Title = styled.h2`
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

const ProductInfoTable = styled.table`
    width:100%;
    font-size:13px;
    border-collapse: collapse;
    & >  tr {
        border-bottom : 1px solid #9a9ba0;
        height: 60px;
    }

    & >  tr:last-child {
        border-bottom : 0;
    }

    & > tr > th {
        width : 20%;
        text-align:left;
    }

    & > tr > td > select {
        width : 100%;
    }
`

const OptionWrapper = styled.div`
    border-top:1px solid black;
    font-size: 11px;
    color: #333333;
`

const SelectedOptionList = styled.table`
    width:100%;
    font-size:13px;
    border-collapse: collapse;
    & > tbody >  tr {
        border-top: 1px solid #9a9ba0;
        height:60px;
    }

    & > tbody > tr > td:first-child {
        width : 50%;
    }

    & > tbody > tr > td:last-child {
        text-align: right;
    }

    & > tbody > tr > td > input {
        width : 50px;
    }
    & > tbody > tr > td > input[type=number]::-webkit-inner-spin-button,
    & > tbody > tr > td > input[type=number]::-webkit-outer-spin-button {
        opacity: 1;
    }
`

const TabMenu = styled.ul`
    padding:0;
    margin-top:30px;
    & > li {
        float:left;
        margin-right:10px;
        font-size:15px;
        font-weight:bold;
        color:rgba(4, 4, 5, 0.4);
        transition: all 0.12s ease-in-out 0s;
    }
    & > li:hover{
        color: rgb(4, 4, 5);
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
    padding: 19px 1% 30px 1%;
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
    width: 45%;
    height: 56px;
    line-height: 56px;
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
    width: 45%;
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


export default StoreRightInfo;