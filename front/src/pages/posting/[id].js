import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import useScrollDirection from '../../hooks/useScrollDirection';
import { useRouter, withRouter  } from "next/router";
import { LOAD_POSTING_REQUEST } from '../../reducers/projectReducer';

const Posting = () => {
    const scrollDirection = useScrollDirection();
    const { posting } = useSelector(state => state.projectReducer);
    const dispatch = useDispatch();
    const router = useRouter();

    function isLoadedRouter() {
        return (Object.keys(router.query).length > 0);
    }
    const isLoadRouter = isLoadedRouter();
    useEffect(() => {
        console.log("isLoadRouter" + isLoadRouter);
        if (!isLoadRouter) return;
        dispatch({
            type: LOAD_POSTING_REQUEST,
            id: router.query.id,
        });
    }, [isLoadRouter]);

    // !-- HEADER 높이
    const [header, setHeader] = useState(false);
    const listenScrollEvent = event => {
        if (window.scrollY < 199) {
            return setHeader(false);
        } else if (window.scrollY > 200) {
            return setHeader(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);

    console.log(header);
    // !-- HEADER 높이
    console.log("isLoadRouter" + isLoadRouter);
    console.log("psting");
    console.log(posting);
    return (
        <div dangerouslySetInnerHTML={{ __html: posting != null ? posting.body : "" }}>
        </div>
    )
}

const TestGrid = styled.div`
    width : 100%;
    padding : 0 79px;
    display : inline-grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 15px;
    row-gap : 30px;
    /* 스크롤용 마진 */
    margin : 300px 0 2000px 0;

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

const SortStyle = styled.div`
  position : fixed;
  width : 100%;
  overflow: visible;
  z-index : 39;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  top : 79px;

  ${props =>
    props.scoll === "up" &&
    css`
        transform: translateY(0);
  `}

  ${props =>
    props.scoll === "down" &&
    css`
        transform: translateY(-100%);
  `}

  ${props =>
    props.header === true &&
    css`
        top : 56px;
    `}
`

export default withRouter(Posting);