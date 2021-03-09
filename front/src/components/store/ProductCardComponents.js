import React from "react";
import Link from 'next/link';
import styled from "styled-components";

const ProductCardComponents = ({ product }) => {
    const imageHost = "https://holix.s3.ap-northeast-2.amazonaws.com/image/";


    return (
            <ProductCardWrapper>
                <Link href = {{ pathname : 'store/' + product.id }}>
                <ProductCardUI>
                    <ProductCardImgWrapper>
                        <img src={imageHost+product.id+"_thumnail.png"}/>
                    </ProductCardImgWrapper>
                </ProductCardUI>
                </Link>
                <ProductInfo>
                    <Title>{product.title}</Title>
                    <Price>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Price>
                </ProductInfo>
            </ProductCardWrapper>
    )
}

const ProductCardUI = styled.div`
    position: relative;
    max-width : 450px;
    min-width : 250px;
	height: 0;
	overflow: hidden;
	padding-bottom: 75%;
`

const ProductCardWrapper = styled.div`
`

const ProductCardImgWrapper = styled.div`
    cursor : pointer;
    position: absolute;
    overflow : hidden;
    width : 100%;
    height : 100%;
    display : block;
	top: 0;
	left: 0;

    &:before {
        content:'';
        position: absolute;
        width: 100%;
        height: 40%;
        background: linear-gradient(to bottom, transparent, ${props => props.bottomColor || 'black'});
        z-index: 2;
        bottom: -40%;
        left: 0;
    }

    & > img {
        width : 100%;
        height : 100%;
        object-fit: cover;
    }

    & > div {
        width : 100%;
        height : 100%;
    }
`
const ProductInfo = styled.div`
`

const Title = styled.p`
    font-size : 15px;
    margin:3px 0;
`
const Price = styled.p`
    color: #222;
    font-size: 12px;
    font-weight: 600;
    margin:0;
`
export default ProductCardComponents;