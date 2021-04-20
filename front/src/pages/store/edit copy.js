import React, { useState, useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from 'hooks/useInput';
import styled, { css } from 'styled-components';
import Router, { useRouter, withRouter  } from "next/router";
import StoreTopMenu from "../../components/store/StoreTopMenu";
import StoreFooter from "../../components/store/StoreFooter";
import { LOAD_PRODUCT_REQUEST } from '../../reducers/productReducer';
import * as ApiConfig from '../../api/apiConfig';
import { FiDelete } from 'react-icons/fi';

const EditProduct = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const selectListRef = useRef(null);
    const totalPriceRef = useRef(null);
    const [selected, setSelectedOptions] = useState([]);
    const imgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ17FH0kWqPd3AiuWU-3zNoLkK1po4AqYs_Bg&usqp=CAU';
    
    const [isCheckOption, setCheckedOption] = useState(false);

    const [files, setFiles] = useState([]);
    const [fileRenders, setFileRenders] = useState([]);

    const [price, onChangePrice] = useInput(0);
    const [optionGroups, setOptionGroups] = useState([]);
    const [focusOGIndex, setFocusOGIndex] = useState(-1);

    const [options, setOptions] = useState();

    const [product, setProduct] = useState(null);
    
    const addOptionGroup = (e) => {
        let optionGroup = {
            necessary:false,
            name:'테스트',
            options: []
        }
        if (focusOGIndex == -1) {
            setFocusOGIndex(0);
        }
        setOptionGroups(optionGroups => [...optionGroups, optionGroup]);
    }

    const deleteOptionGroup = (index) => () => {
        setOptionGroups(optionGroups.filter(og => optionGroups.indexOf(og) !== index))
    }

    const addOption = () => {
        let option = {
            name : '옵션 테스트',
            addPrice : 0,
            count : 1
        }
        let copyOption = optionGroups.find(og => optionGroups.indexOf(og) === focusOGIndex).options;
        copyOption.push(option);
        setOptionGroups(
            optionGroups.map(og => 
                optionGroups.indexOf(og) === focusOGIndex
                ? {...og, options : copyOption} 
                : og 
        ))
    }

    const changeOptionGroupName = (e) => {
        setOptionGroups(
            optionGroups.map(og => 
                optionGroups.indexOf(og) === focusOGIndex
                ? {...og, name : e.target.value} 
                : og 
        ))
    }

    const deleteOption = (index) => () => {
        let options = optionGroups.find(og => optionGroups.indexOf(og) === focusOGIndex).options;
        setOptionGroups(
            optionGroups.map(og => 
                optionGroups.indexOf(og) === focusOGIndex
                ? {...og, options : options.filter(o => options.indexOf(o) !== index)} 
                : og 
        ))
    }

    const onChangeOptionName = (index) => (e) => {
        let options = optionGroups.find(og => optionGroups.indexOf(og) === focusOGIndex).options;
        options.find(o => options.indexOf(o) === index).name = e.target.value;
        setOptionGroups(
            optionGroups.map(og => 
                optionGroups.indexOf(og) === focusOGIndex
                ? {...og, options : options} 
                : og 
        ))
    }

    const onChangeOptionPrice = (index) => (e) => {
        let options = optionGroups.find(og => optionGroups.indexOf(og) === focusOGIndex).options;
        options.find(o => options.indexOf(o) === index).addPrice = e.target.value;
        setOptionGroups(
            optionGroups.map(og => 
                optionGroups.indexOf(og) === focusOGIndex
                ? {...og, options : options} 
                : og 
        ))
    }

    const onChangeOptionCount = (index) => (e) => {
        let options = optionGroups.find(og => optionGroups.indexOf(og) === focusOGIndex).options;
        options.find(o => options.indexOf(o) === index).count = e.target.value;
        setOptionGroups(
            optionGroups.map(og => 
                optionGroups.indexOf(og) === focusOGIndex
                ? {...og, options : options} 
                : og 
        ))
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

    const handleImgUpload = (e) => {
        setFiles([...files, ...e.target.files]);
        
        for (var i = 0; i < e.target.files.length; i++) {
            let reader = new FileReader();
            let f = e.target.files[i];
            console.log(f);
            reader.onloadend = () => {
                console.log(reader.result);
                setFileRenders(fileRenders => [...fileRenders, reader.result])
            }
            reader.readAsDataURL(f);
        }
    }

    // !-- HEADER 높이
    const checkOption = () => {
       
    }
    checkOption();
    return (
        <> 
        <StoreTopMenu/>
            <ContentsWrapper>
                <ProductInfoWrapper>
                    <ProdcutThumnailWrapper>
                    <input type="file" multiple onChange={handleImgUpload}/>
                        <ProdcutThumnail src={fileRenders.length > 0 ? fileRenders[0] : ""}/>
                        <ProductSubImageWrapper>
                            <ProductSubImageList>
                                {
                                    fileRenders.map(f => {
                                        return <li><ProductSubImage src={f}/></li>
                                    })
                                }
                            </ProductSubImageList>
                        </ProductSubImageWrapper>
                    </ProdcutThumnailWrapper>
                    <ProductInfo>
                        <TitleWrapper>
                            <Title placeholder="상품명"/>
                        </TitleWrapper>
                        <PriceWrapper>
                            <ProductInfoTable>
                                <tr>
                                    <th>
                                        판매가
                                    </th>
                                    <td>
                                        <PriceInput value={price} onChange={onChangePrice}/> 원
                                    </td>
                                </tr>
                            </ProductInfoTable>
                        </PriceWrapper>
                        <OptionWrapper>
                            <ProductInfoTable>
                                {  
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
                                                        optionGroups.map((og, i) => {
                                                            return (<tr className={i == focusOGIndex ? "highlight" : ""}  onClick={() => {
                                                                            setFocusOGIndex(i);
                                                                        }}>
                                                                        <td>
                                                                            <input type="checkbox" />
                                                                        </td>
                                                                        <td>
                                                                                <input type="text" placeholder="그룹명" value={og.name} onChange={changeOptionGroupName}/>
                                                                        </td>
                                                                        <td>
                                                                            <button onClick={deleteOptionGroup(i)}>
                                                                                삭제
                                                                            </button>
                                                                        </td>
                                                                        <td>
                                                                            <button>^</button>
                                                                            <button>⌵</button>
                                                                        </td>
                                                                    </tr>)
                                                        })
                                                    }
                                                </tbody>
                                            </ProductOptionList>
                                            <button onClick={addOptionGroup}>옵션 그룹 추가</button>
                                        </td>
                                    </tr>
                                }
                            </ProductInfoTable>
                            { focusOGIndex !== -1 ?
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
                                        optionGroups.find(og => optionGroups.indexOf(og) === focusOGIndex) ?
                                        optionGroups.find(og => optionGroups.indexOf(og) === focusOGIndex).options.map((o, i) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <input type="text" value={o.name} onChange={onChangeOptionName(i)}/>
                                                    </td>
                                                    <td>
                                                        <input type="text" value={o.addPrice} onChange={onChangeOptionPrice(i)}/>
                                                    </td>
                                                    <td>
                                                        <input type="text" value={o.count} onChange={onChangeOptionCount(i)}/>
                                                    </td>
                                                    <td><button onClick={deleteOption(i)}>삭제</button></td>
                                                    <td>
                                                        <button>^</button>
                                                        <button>⌵</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <></>
                                    }
                                </tbody>
                            </OptionList>
                            <button onClick={addOption}>옵션 추가</button>
                            </>
                            : <></>
                                }
                        </OptionWrapper>
                    </ProductInfo>
                </ProductInfoWrapper>
                <ProductDetailWrapper>
                    <ProductDetailTab>
                        <li>상품상세</li>
                        <li>상품평 <span>(1,599)</span></li>
                        <li>상품문의</li>
                        <li>배송/교환/반품 안내</li>
                    </ProductDetailTab>
                    <ProductDetail>
                        <img style={{maxWidth:'100%'}}/>
                    </ProductDetail>
                </ProductDetailWrapper>
                <ReviewWrapper>
                    <WrapperLabel>상품평</WrapperLabel>
                    <ReviewSortWrapper>

                    </ReviewSortWrapper>
                    <ReviewArticleWrapper>
                        <ReviewArticle>
                            <RAProfileInfo>

                            </RAProfileInfo>
                            <RAImageWrapper>

                            </RAImageWrapper>
                            <RATitle>

                            </RATitle>
                            <RAContents>

                            </RAContents>
                        </ReviewArticle>
                    </ReviewArticleWrapper>
                </ReviewWrapper>
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
`
const ProductSubImageWrapper = styled.div`
`

const ProductSubImageList = styled.ul`
    
    & > li {
        width:25%;
        float:left;
        margin-right:10px;
    }
`

const ProductSubImage = styled.img`
    max-width:100%;
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
const Title = styled.input`
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
const PriceInput = styled.input`
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

const ProductOptionList = styled.table`
    width:70%;
    font-size:13px;
    border-collapse: collapse;
    & > tbody >  tr {
        height:30px;
    }

    & > tbody > .highlight {
        background:gray;
    }
`
    const OptionList = styled.div`
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

const ProductDetailTab = styled.ul`
    border-top: 2px solid #555;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    list-style-type: none;
    font-size: 0;
    top: 0;
    width: 100%;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    & > li {
        display: inline-block;
        padding: 15px 20px 14px;
        width: 25%;
        border-right: 1px solid #ccc;
        background-color: #fafafa;
        text-align: center;
        color: #555;
        font-weight: bold;
        font-size: 16px;
        box-sizing: border-box;
        cursor: pointer;
    }

    & > li.active {
        margin-bottom: -2px;
        background: #ffffff;
        border-bottom: 1px solid #fff;
        color: #111;
    }
`

const DetailTitle = styled.div`
    text-align: center;
    border-bottom: 2px solid #000;
`

const ProductDetail = styled.div`
    height: auto;
    text-align: center;
`

const WrapperLabel = styled.h4`
    margin-top: 26px;
    margin-bottom: 14px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
`

const ReviewWrapper = styled.div`
    position: relative;
    padding-top: 35px;
    font-size: 12px;
    letter-spacing: -1px;
    user-select: none;
    margin: 30px 0px 0px;
    border-top: 1px solid rgb(51, 51, 51);
    background: white;
    overflow: visible;
    outline: none;
`

const ReviewSortWrapper = styled.div`
    display: table;
    width: 100%;
    table-layout: fixed;
    height: 50px;
    padding: 11px 12px 10px 18px;
    box-sizing: border-box;
    background-color: #555
`

const ReviewArticleWrapper = styled.div`
    display: block;
    margin-bottom: 16px;
`

const ReviewArticle = styled.div`
    display: block;
    padding-top: 30px;
    border-bottom: 1px solid #ccc;
`

const RAProfileInfo = styled.div`
    margin-bottom: 13px;
`

const RAImageWrapper = styled.div`
    margin-bottom: 19px;
    font-size: 0;
`

const RATitle = styled.div`
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: bold;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const RAContents = styled.div`
`

export default withRouter(EditProduct);