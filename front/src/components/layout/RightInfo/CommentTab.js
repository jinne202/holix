import React, { useState, useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { WRITE_COMMENT_REQUEST } from 'reducers/archiveReducer';
import useInput from 'hooks/useInput';

const CommentTab = ({list, id}) => {
    const dispatch = useDispatch();
    const { myAccountInfo } = useSelector((state) => state.userReducer);
    const [comment, changeComment] = useInput('');

    const writeComment = (e) => {
        dispatch({
            type: WRITE_COMMENT_REQUEST,
            data : {
                comment : comment
            },
            id : id
        });
    }
console.log(list)
    return (
        <CommentWrapper>
            <CommentListWrapper>
                {list.map((item, index) => {
                    return <Item key={index}>
                        {item.account}/
                        {item.comment}
                    </Item>
                })}
            </CommentListWrapper>
            <CommentWriteWrapper>
                <textarea style={{width:'100%', height:'70px'}} onChange={changeComment}></textarea>
                <button style={{width:'100%'}} onClick={writeComment}>등록</button>
            </CommentWriteWrapper>
        </CommentWrapper>
    )
}

const CommentWrapper = styled.div`
    width:100%;
    overflow-y:scroll;
`
const CommentListWrapper = styled.div`
    width:100%;
    height:auto;
    overflow:auto;

`

const Item = styled.div`
    width:100%;
    height:auto;
    overflow:auto;

`

const CommentWriteWrapper = styled.div`
    border-top:1px solid gray;
    padding-top:10px;
`


export default CommentTab;