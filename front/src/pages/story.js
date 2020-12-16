import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from "../components/layout/AppLayout";
import styled from 'styled-components';
import StoryCardComponents from '../components/StoryCardComponents';
import { LOAD_POSTS_REQUEST } from '../reducers/projectReducer';

const Story = () => {
    const {projectPosts, isLoadingPosts} = useSelector(state => state.projectReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
          type: LOAD_POSTS_REQUEST,
        });
    }, []);

    console.log(projectPosts);

    return (
        <AppLayout>
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

export default Story;