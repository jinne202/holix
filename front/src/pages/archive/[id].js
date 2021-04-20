import React, { useState, useEffect,useRef,useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Router, { useRouter, withRouter  } from "next/router";
import StoreTopMenu from "../../components/store/StoreTopMenu";
import StoreFooter from "../../components/store/StoreFooter";
import { LOAD_CATEGORY_REQUEST } from 'reducers/editProjectReducer';
import { LOAD_ARCHIVE_REQUEST } from 'reducers/archiveReducer';
import * as ApiConfig from '../../api/apiConfig';
import { FiDelete } from 'react-icons/fi';
import ArchiveRightInfo from 'components/layout/RightInfo/ArchiveRightInfo'
import ViewPostingForm from "components/posting/ViewPostingForm";

const Archive = () => {
    const dispatch = useDispatch();
    let type = "archive";
    const { archive, isLoaded } = useSelector(state => state.archiveReducer);
    const router = useRouter();

    const {category, isLoadingConfig} = useSelector(state => state.editProjectReducer);
    const viewPostingFormRef = useRef(null);

    Router.onRouteChangeComplete = () => {
        dispatch({
            type: LOAD_ARCHIVE_REQUEST,
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
        if (archive && category) {
            viewPostingFormRef.current.id = archive.archiveInfo.id;
            viewPostingFormRef.current.category = category;
            viewPostingFormRef.current.postingInfo = archive.postingInfo;
            viewPostingFormRef.current.transferForViewer()
        }
    }, [archive, category]); 

    if (!archive || !category) return <></>

    return (
        <> 
        <StoreTopMenu />
            <ContentsWrapper>
                <PostingWrapper>
                    <ViewPostingForm ref={viewPostingFormRef} type={type} category={category} postingInfo={archive ? archive.postingInfo : null}/>
                </PostingWrapper>
                <ArchiveRightInfo archive={archive}/>
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

export default withRouter(Archive);