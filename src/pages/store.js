import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, withRouter  } from "next/router";
import StoreLayout from "../components/layout/StoreLayout";
import styled from 'styled-components';
import ProductCardComponents from '../components/store/ProductCardComponents';
import { LOAD_PRODUCTS_REQUEST } from '../reducers/productReducer';

const Store = () => {
    const router = useRouter();
    const {productList, isLoading} = useSelector(state => state.productReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
          type: LOAD_PRODUCTS_REQUEST,
        });
    }, []);

    return (
        <StoreLayout>
            <TestGrid>
            {productList.map((c) => {
                return (
                <ProductCardComponents key={c} product={c} />
                );
            })}
            </TestGrid>
        </StoreLayout>
    )
}

const TestGrid = styled.div`
    width : 100%;
    margin-top:50px;
    margin-bottom:50px;
    display : inline-grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 15px;
    row-gap : 30px;

    @media (min-width: 963px) and (max-width: 1348px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 633px) and (max-width: 962px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 633px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

export default Store;