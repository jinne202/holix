import React, { useState, useEffect,useRef,useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Router, { useRouter, withRouter  } from "next/router";
import StoreTopMenu from "../../components/store/StoreTopMenu";
import StoreFooter from "../../components/store/StoreFooter";
import { LOAD_CATEGORY_REQUEST } from 'reducers/editProjectReducer';
import { LOAD_PRODUCT_REQUEST } from '../../reducers/storeReducer';
import * as ApiConfig from '../../api/apiConfig';
import { FiDelete } from 'react-icons/fi';
import StoreRightInfo from 'components/layout/RightInfo/StoreRightInfo'
import ViewPostingForm from "components/posting/ViewPostingForm";
import ReviewLayout from 'components/store/ReviewLayout'
import StarRatings from 'components/buttons/star-ratings';

const Product = () => {
    const dispatch = useDispatch();
    let type = "store";
    const { product, isLoaded } = useSelector(state => state.storeReducer);
    const router = useRouter();

    const {category, isLoadingConfig} = useSelector(state => state.editProjectReducer);
    const viewPostingFormRef = useRef(null);

    Router.onRouteChangeComplete = () => {
        dispatch({
            type: LOAD_PRODUCT_REQUEST,
            id: router.query.id,
        });
      };


    useEffect(() => {
        if (!category) {
            dispatch({
                type: LOAD_CATEGORY_REQUEST,
                categoryType: type
            });
        }
    }, [category]); 

    useEffect(() => {
        if (product && category) {
            viewPostingFormRef.current.id = product.productInfo.id;
            viewPostingFormRef.current.category = category;
            viewPostingFormRef.current.postingInfo = product.postingInfo;
            viewPostingFormRef.current.transferForViewer()
        }
    }, [product, category]); 

    if (!product || !category) return <></>

    return (
        <> 
        <StoreTopMenu />
            <ContentsWrapper>
                <PostingWrapper>
                    <ViewPostingForm ref={viewPostingFormRef} type={type} category={category} postingInfo={product ? product.postingInfo : null}/>
                    <ReviewLayout id={product.productInfo.id} list={product.productInfo.reviews}/>
                </PostingWrapper>
                <StoreRightInfo data={product}/>
            </ContentsWrapper>
            
        </>
    )
}

const ContentsWrapper = styled.div`
    margin: 0px;
    padding: 0px;
    border-width: 0px;
    border-style: solid;
    border-color: rgb(4, 4, 5);
    display: flex;
    flex: 1 0 auto;
    min-height: 0px;
    min-width: 0px;
    max-width: 100%;
    -webkit-box-flex: 1;
    flex-direction: row;
    -webkit-box-align: stretch;
    align-items: stretch;
    position: absolute; 
    inset: 0px; 
    overflow:hidden;
`

const PostingWrapper = styled.div`
    position: relative;
    margin: 0px;
    padding: 0px;
    -webkit-box-align: stretch;
    align-items: stretch;
    border-width: 0px;
    border-style: solid;
    border-color: rgb(4, 4, 5);
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0px;
    min-width: 0px;
    max-width: 100%;
    -webkit-box-flex: 1;
    overflow:scroll;
    margin-top:80px;
`

const ReviewWrapper = styled.div`
    width: 90%;
    margin : 0 auto;
    background: #efefef;
`
const TitleLabel = styled.h2`
`


const ReviewListWrapper = styled.div`
    height: auto;
    overflow:auto;
    
`

const ReviewContentsWrapper = styled.div`
    padding-bottom : 10px;
    border-bottom : 0.5px solid gray;
    height: auto;
    overflow:auto;
`

const ProfileWrapper = styled.div`
    display:inline-block;
    padding-right: 5px;
    width : 50px;
    height: 50px;
    overflow: hidden;
    border-right : 1px solid gray;
    float: left;
`

const ProfileImg = styled.img`
`

const ConetentsWrapper = styled.div`
    display:inline-block;
    float : left;
`

const NickName = styled.div`
    font-size: 9px;
`

const Title = styled.div`
    font-weight:500;
`

const Rating = styled.div`
`

const ReviewWriteWrapper = styled.div`
    border-top:1px solid gray;
    padding-top:10px;
`

const ImgList = styled.ul`
    margin-top : 10px;
    & > li {
        float : left;
        margin-right : 5px;
    }
    & > li > img { 
        width : 50px;
        height : 50px;
    }
`


export default Product;