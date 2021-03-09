import React, { useState, useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Router, { useRouter, withRouter  } from "next/router";
import StoreTopMenu from "../../components/store/StoreTopMenu";
import StoreFooter from "../../components/store/StoreFooter";
import { LOAD_PRODUCT_REQUEST } from '../../reducers/productReducer';
import * as ApiConfig from '../../api/apiConfig';
import { FiDelete } from 'react-icons/fi';

const Product = () => {
    const dispatch = useDispatch();
    const { product, isLoading } = useSelector(state => state.productReducer);
    const router = useRouter();
    const selectListRef = useRef(null);
    const totalPriceRef = useRef(null);
    const [selected, setSelectedOptions] = useState([]);
    const imgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ17FH0kWqPd3AiuWU-3zNoLkK1po4AqYs_Bg&usqp=CAU';
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCheckOption, setCheckedOption] = useState(false);

    function isLoadedRouter() {
        return (Object.keys(router.query).length > 0);
    }

    const isLoadRouter = isLoadedRouter();
    useEffect(() => {
        if (!isLoadRouter) return;
        dispatch({
            type: LOAD_PRODUCT_REQUEST,
            id: router.query.id,
        });
    }, [isLoadRouter]);
    
    const onOptionChange = (e) => {
        const optionIndex = Number(e.target.value);
        const optionGroupIndex = Number(e.target.parentElement.parentElement.getAttribute('data-optionGroupId'));
        if (selected.some(o => o.id === optionIndex)) {
            alert("이미 선택한 옵션입니다.");
            return;
        }
        const selectedOption = {
            groupid: optionGroupIndex,
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
        localStorage.setItem('product', JSON.stringify(product));
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
            if (o.groupid != -1) {
                optionGroup = product.optionGroups.find(g => g.id === o.groupid);
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
                groupid: -1,
                id : -1,
                count : 1
            }
            setSelectedOptions([...selected, selectedOption]);
            setTotalPrice(totalPrice + product.price);
        }
    }
    checkOption();
    return (
        <> 
        <StoreTopMenu/>
            <ContentsWrapper>
                <ProductInfoWrapper>
                    <ProdcutThumnailWrapper>
                        <ProdcutThumnail src = {ApiConfig.imageHost +product.id+"_thumnail.png"}/>
                    </ProdcutThumnailWrapper>
                    <ProductInfo>
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
                                                if (o.groupid != -1) {
                                                    optionGroup = product.optionGroups.find(g => g.id === o.groupid);
                                                    option = optionGroup.options.find(option => option.id === o.id);
                                                }
                                                return (
                                                    <tr data-optionid = {o.id}>
                                                        <td>
                                                            {o.groupid == -1 ? product.title : option.name}
                                                        </td>
                                                        <td>
                                                            <input value = {o.count} onChange={handleOptionCount} type="number"/> 
                                                            {
                                                                o.groupid != -1 ?
                                                                <FiDelete onClick={handleRemoveOption}/>
                                                                : <></>
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                o.groupid == -1 ? 
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
                        <BuyWrapper>
                            <BuyLabel>총 상품금액(수량) : 
                                <BuyCount ref={totalPriceRef}>
                                    {totalPrice}
                                </BuyCount>
                                원
                            </BuyLabel>
                            <BuyButtonWarper>
                                <WillBuyButton>장바구니</WillBuyButton>
                                <WillBuyButton>관심상품</WillBuyButton>
                                <BuyButton onClick={moveOrderPage}>구매하기</BuyButton>
                            </BuyButtonWarper>
                        </BuyWrapper>
                    </ProductInfo>
                </ProductInfoWrapper>
                <ProductDetailWrapper>
                    <DetailTitle>
                        상품상세정보
                    </DetailTitle>
                    <ProductDetail>
                        <img src = {ApiConfig.imageHost +product.id+"_contents.png"} style={{maxWidth:'100%'}}/>
                    </ProductDetail>
                </ProductDetailWrapper>
            </ContentsWrapper>
            <StoreFooter/>
        </>
    )
}

const ContentsWrapper = styled.div`
    width : 1296px;
    height: auto;
    margin: 30px auto;
`

const ProductInfoWrapper = styled.div`
    width:100%;
    height: auto;
    display: flex;
`

const ProdcutThumnailWrapper = styled.div`
    width: 580px;
    margin: 0 auto;
    position: relative;
    float: left;

    &:before {
        padding-top: 100%;
    }
`

const ProdcutThumnail = styled.img`
    width: 100%;
    border: 1px solid #f6f6f6;
    cursor: pointer;
    background:blue;
`

const ProductInfo = styled.div`
    float: right;
    width: 580px;
    height: 600px;
    text-align: left;
    margin-left: 0;
    border-top: 2px solid #000;

`

const TitleWrapper = styled.div`
    position: relative;
    margin: 0;
    border: 0;
    padding: 20px 0 20px 0;
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
    margin: 20px 0 20px 0;
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

const OptionList = styled.div`
display: inline-block;
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

const BuyWrapper = styled.div`
    padding: 34px 9px 19px;
    border-top: 1px solid #9a9ba0;
    color: #353535;
    vertical-align: middle;
    background: #fff;
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
    width: 159px;
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
    width: 212px;
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

const ProductDetailWrapper = styled.div`
    margin-top: 60px;
`
const DetailTitle = styled.div`
    text-align: center;
    border-bottom: 2px solid #000;
`

const ProductDetail = styled.div`
    height: auto;
    text-align: center;
`

export default withRouter(Product);