import React, { useState, useEffect,useRef,useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import Router, { useRouter, withRouter  } from "next/router";
import PreviewLayout from "components/posting/layout/PreviewLayout";
import ViewPostingForm from 'components/posting/ViewPostingForm';
import StoreRightInfo from 'components/layout/RightInfo/StoreRightInfo';

const Storereview = () => {
    let type = "store"
    const [product, setProduct] = useState(null);
    const viewPostingFormRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            var request = indexedDB.open("HolixDB", 10);

            request.onerror = function(event) {
                alert("Database error: " + event.target.errorCode);
            };
            request.onsuccess = function(event) {
                var db = request.result;
                var range = IDBKeyRange.only(type + 'preview');
                var transaction = db.transaction(["holixdb"],"readonly");
                var store = transaction.objectStore("holixdb");
                
                
                var index = store.index('name');
                index.openCursor(range).onsuccess = function(event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        var data = cursor.value;
                        let product = data.product;
                        setProduct(product);
                        viewPostingFormRef.current.id = product.productInfo.id;
                        viewPostingFormRef.current.category = product.category;
                        viewPostingFormRef.current.postingInfo = product.postingInfo;
                        viewPostingFormRef.current.transferForViewer(true)
                        cursor.continue(); 
                    }
                }
            };

            request.onupgradeneeded = function(event) {
                var db = event.target.result;

                if(!db.objectStoreNames.contains("holixdb")) {
                    db.createObjectStore("holixdb", { keyPath: '_id', autoIncrement: true });
                }

                var objectStore = request.transaction.objectStore("holixdb");
                objectStore.createIndex('name', 'name');
            };
            
        }
    }, []);

    if (!product) return <></>;
console.log(product)
    return (
        <PreviewLayout>
            <ViewPostingForm ref={viewPostingFormRef} type={type} category={product.category} postingInfo={product ? product.postingInfo : null}/>
            <StoreRightInfo data={product}/>
        </PreviewLayout>
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


export default withRouter(Storereview);