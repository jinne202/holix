import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from "../components/layout/AppLayout";
import styled, { css } from 'styled-components';
import StoryCardComponents from '../components/StoryCardComponents';
import SortWrapper from '../components/sorting/SortWrapper';
import useScrollDirection from '../hooks/useScrollDirection';
import { LOAD_POSTS_REQUEST } from '../reducers/projectReducer';

const Story = () => {
    const scrollDirection = useScrollDirection();
    const {projectPosts, isLoadingPosts} = useSelector(state => state.projectReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
          type: LOAD_POSTS_REQUEST,
        });
    }, []);

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

    console.log(projectPosts);

    return (
        <AppLayout>
            <SortStyle scoll={scrollDirection} header={header}>
                <SortWrapper/>
            </SortStyle>
            <TestGrid>
            {projectPosts.map((c) => {
                return (
                <StoryCardComponents key={c.index} posting={c} />
                );
            })}
            </TestGrid>
        </AppLayout>
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

export default Story;