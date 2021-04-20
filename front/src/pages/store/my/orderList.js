import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { useRouter, withRouter  } from "next/router";
import styled from 'styled-components';
import Link from 'next/link';
import DaumPostcode from 'react-daum-postcode';
import { LOAD_ORDERS_REQUEST } from '../../../reducers/storeReducer';

const OrderList = () => {
    const router = useRouter();
    const {orderList, isLoading} = useSelector(state => state.storeReducer);
    const dispatch = useDispatch();
    const [title, onChangeTitle] = useInput('');
    const [contents, onChangeContents] = useInput('');

    useEffect(() => {
        dispatch({
            type: LOAD_ORDERS_REQUEST
        });
    }, []);

    const handleSubmit = () => {
    }

    const GoWriteReview = () => {

    }

    return (
        <>
            { orderList ?
                orderList.map(o => {
                    return <OrderWrapper>
                            <OrderDateWrapper>
                                <OrderDate>
                                    {o.created_date}
                                </OrderDate>
                                <GoDetail>
            
                                </GoDetail>
                            </OrderDateWrapper>
                            { 
                                o.productOrderList.map(op => {
                                    return  <OrderInfo>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <OIDeliveryInfo>
                                                                <OIDate>
                                                                    <DeliveryStatus>
                
                                                                    </DeliveryStatus>
                                                                    <DeliveryDate>

                                                                    </DeliveryDate>
                                                                </OIDate>
                                                            </OIDeliveryInfo>
                                                            <ProductInfoWrapper>
                                                                <ProductImgWrapper>
                
                                                                </ProductImgWrapper>
                                                                <ProductInfo>
                                                                    <ProductName>
                                                                        {op.product.title}
                                                                    </ProductName>
                                                                    <ProductOptionName>
                                                                        {
                                                                            op.product.optionGroups.find(og => og.id === op.selectOptionGroup).options.find(oo => oo.id === op.selectOption).name
                                                                        }
                                                                    </ProductOptionName>
                                                                    <ProductPrice>
                                                                        {op.price}
                                                                    </ProductPrice>
                                                                </ProductInfo>
                                                            </ProductInfoWrapper>
                                                        </td>
                                                        <td>
                                                            <BlueButton>
                                                                배송조회
                                                            </BlueButton>
                                                            <GrayButton>
                                                                교환, 반품 신청
                                                            </GrayButton>
                                                            <Link href={{ pathname: './review/write/' + op.id}}>
                                                                <GrayButton onClick={GoWriteReview}>
                                                                    구매후기 쓰기
                                                                </GrayButton>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                </tbody>
                            
                                            </OrderInfo>
                                })
                            }
                        </OrderWrapper>
                })
            : <></>
            }
        </>
    )
}

const OrderWrapper = styled.div`
    width: 800px;
    border-radius: 12px;
    box-shadow: rgb(0 0 0 / 8%) 0px 2px 4px 0px, rgb(0 0 0 / 16%) 0px 0px 1px 0px;
    background-color: rgb(255, 255, 255);
    margin-bottom: 20px;
    padding: 24px 24px 16px;
    box-sizing: border-box;
`

const OrderDateWrapper = styled.div`
    height: 28px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    box-sizing: border-box;
`

const OrderDate = styled.span`
    width: 50%;
    height: 28px;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: -0.5px;
    color: rgb(17, 17, 17);
`
const GoDetail = styled.span`
    text-align: right;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.5px;
    color: rgb(52, 106, 255);
    display: inline-flex;
    vertical-align: middle;
    position: relative;
    width: auto;
    -webkit-box-pack: end;
    justify-content: flex-end;
`

const OrderInfo = styled.table`
    border-radius: 8px;
    border: 1px solid rgb(238, 238, 238);
    background-color: rgb(255, 255, 255);
    margin-top: 16px;
    box-sizing: border-box;

    & > tobdy > tr > td:first-child {
        width: 540px;
        height: 100%;
        padding: 20px;
        border-right: 1px solid rgb(238, 238, 238);
        vertical-align: top;
    }
`
const OIDeliveryInfo = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 4px;
`

const OIDate = styled.div`
-webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    display: flex;
    line-height: 1.5;
`

const DeliveryStatus = styled.span`
    font-weight: bold;
    color: rgb(17, 17, 17);
    font-size: 1.25rem;
`
const DeliveryDate = styled.span`
    font-weight: normal;
    color: rgb(0, 137, 26);
    font-size: 1.25rem;
`

const ProductInfoWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
`

const ProductImgWrapper = styled.div`
    width: 64px;
    position: relative;
    margin-right: 16px;
`

const ProductInfo = styled.div`
    user-select: none;
    overflow: hidden;
    flex: 1 1 0%;
    display: flex;
`

const ProductName = styled.div`
    margin-bottom: 4px;
`

const ProductOptionName = styled.div`
`

const ProductPrice = styled.div`
    margin-bottom: 4px;
`

const BlueButton = styled.button`
`

const GrayButton = styled.div`
`

export default OrderList;