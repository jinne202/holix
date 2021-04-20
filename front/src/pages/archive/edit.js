import React, { useState, useEffect,useRef ,useLayoutEffect, useCallback} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Router, { useRouter, withRouter  } from "next/router";
import useInput from '../../hooks/useInput';
import StoreTopMenu from "../../components/store/StoreTopMenu";
import StoreFooter from "../../components/store/StoreFooter";
import { LOAD_CATEGORY_REQUEST } from 'reducers/editProjectReducer';
import { LOAD_ARCHIVE_REQUEST } from 'reducers/archiveReducer';
import { UPLOAD_POSTING_REQUEST } from 'reducers/postingReducer';
import * as ApiConfig from '../../api/apiConfig';
import { FiDelete } from 'react-icons/fi';
import ArchiveRightInfoEditMode from 'components/layout/RightInfo/ArchiveRightInfoEditMode'
import EditPostingForm from "components/posting/EditPostingForm";

const EditAchive = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const type = "archive";

    const editPostingFormRef = useRef(null);
    const rightInfoRef = useRef(null);
    const [postingId, setPostingId] = useState(0);

    const { myAccountInfo } = useSelector((state) => state.userReducer);

    const { archive, isLoaded } = useSelector(state => state.archiveReducer);

    const onChangeTitle = useCallback((txt) => {
        editPostingFormRef.current.setState({title : txt});
        rightInfoRef.current.setState({
            productName : txt
        })
    }, []);

    //카테고리 설정
    const {category, subInfos, isLoadingConfig} = useSelector(state => state.editProjectReducer);
    
    useEffect(() => {
        dispatch({
            type: LOAD_CATEGORY_REQUEST,
            categoryType : type
        });
    }, []);

    Router.onRouteChangeComplete = () => {
        let postingId = router.query.Id || router.query.id;
        if (postingId)
            setPostingId(postingId)
        else 
            setPostingId(0)
      };

    useEffect(() => {
        if (postingId) {
            dispatch({
                type: LOAD_ARCHIVE_REQUEST,
                id:  postingId,
            });
        } else  if (typeof window !== 'undefined' && category) {
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                // DON'T use "var indexedDB = ..." if you're not in a function.
                // Moreover, you may need references to some window.IDB* objects:
                window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
                window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
            var request = indexedDB.open("HolixDB",10);

            request.onerror = function(event) {
                alert("Database error: " + event.target.errorCode);
                return;
            };
            request.onsuccess = function(event) {
                var db = request.result;
                var range = IDBKeyRange.only(type + 'postingInfo');
                var transaction = db.transaction(["holixdb"],"readwrite");
                var store = transaction.objectStore("holixdb");
        
        
                var index = store.index('name');
                index.openCursor(range).onsuccess = function(event) {
                    var cursor = event.target.result;
                    console.log(cursor)
                    if (cursor) {
                        if (confirm("임시저장된 내용이 있습니다. 불러오시겠습니까?"))
                            handleLoadData(cursor.value.archive, true);
                        else
                            store.clear()
                    }
                }
            };

            request.onupgradeneeded = function(event) {
                var db = event.target.result;

                if(!db.objectStoreNames.contains("holixdb")) {
                    db.createObjectStore("holixdb", { keyPath: '_id', autoIncrement: true });
                }

                var objectStore = request.transaction.objectStore("holixdb");
                if (objectStore)
                    objectStore.createIndex('name', 'name');
            };
            
        }
    }, [category, postingId]);

    const transferForEdit = () => {
        if (isLoaded && archive) {
            if (!archive.postingInfo.contents.contentsList) {
                Object.defineProperty(archive.postingInfo, 'contents', {
                    writable: true,
                    value: JSON.parse(archive.postingInfo.contents)
                });
                handleLoadData(archive, false);
            }   
        }
    }

    const handleLoadData = (data, isTemp) => {
        console.log(data)
        editPostingFormRef.current.handleLoadData(data.postingInfo, isTemp);
    }

    useEffect(() => {
        transferForEdit()
    }, [isLoaded]);
    
    //사이즈 조정시
    const topMenuRef = useRef(null);

    //등록 
    const onPostHandle = () => {
        if (editPostingFormRef.current.state.selectedCategory.length == 0) {
            alert("카테고리를 설정해주세요.")
            return;
        }
        let data = editPostingFormRef.current.onPostHandle();
        alert('등록 되었습니다.')
        return dispatch({
            type : UPLOAD_POSTING_REQUEST,
            id : postingId == 0 ? null : postingId,
            postingType : type,
            data : {
                postingInfo : data.postingInfo,
                archiveInfo : {
                    description : rightInfoRef.current.state.description
                }
            },
            files : data.files
        }, [data]);
        
      //  editPostingFormRef.current.transferForUpload();

    }
    //등록 끝
    //미리보기
    const onHandleTempSave = (isPreview) => {
        let data = editPostingFormRef.current.onHandleTempSave(isPreview);
        let json = {
            postingInfo : data.postingInfo ,
            archiveInfo : {
                description : rightInfoRef.current.state.description
            },
            category : category
        }

        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

        if (!indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
        }
        var request = indexedDB.open("HolixDB", 10);

        request.onerror = function(event) {
            alert("Database error: " + event.target.errorCode);
          };
        request.onsuccess = function(event) {
            var db = request.result;
            console.log("all done")

            var transaction = db.transaction(["holixdb"],"readwrite");
            var store = transaction.objectStore("holixdb");
            var index = store.index('name');
            var pdestroy = index.openKeyCursor(IDBKeyRange.only(isPreview ? type + 'preview' : type + 'postingInfo')); 
                pdestroy.onsuccess = function() {
                    var cursor = pdestroy.result;
                    if (cursor) {
                        store.delete(cursor.primaryKey);
                        cursor.continue();
                    } else {
                        var addRequest = store.add({
                            name : isPreview ? type + 'preview' : type + 'postingInfo',
                            archive : json
                        });
                        addRequest.onerror = function(e) {
                            console.log("Error",e.target.error.name);
                            //some type of error handler
                        }

                        addRequest.onsuccess = function(e) {
                            if (isPreview)
                                window.open('./preview', '', 'width='+screen.availWidth+',height='+screen.availHeight);
                            else
                                alert('임시 저장 되었습니다.')
                        }
                    }
            }
        };

        request.onupgradeneeded = function(event) {
            var db = event.target.result;

            if(!db.objectStoreNames.contains("holixdb")) {
                db.createObjectStore("holixdb", { keyPath: '_id', autoIncrement: true });
            }

            var objectStore = request.transaction.objectStore("holixdb");
            var index = objectStore.createIndex('name', 'name');
            console.log("running onupgradeneeded");
            
        };

        

       // localStorage.setItem('files', fileList);
        
    }
    if (!category) return <></>
    console.log(subInfos);
    return (
        <> 
        <StoreTopMenu />
            <ContentsWrapper>
                <EditPostingForm ref={editPostingFormRef} account={myAccountInfo} category={category} subinfos={subInfos} type={type} onChangeTitle={onChangeTitle}/>
                <ArchiveRightInfoEditMode ref={rightInfoRef} onPostHandle={onPostHandle} onHandleTitleChange={onChangeTitle} onHandleTempSave={onHandleTempSave}/>
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


export default EditAchive;