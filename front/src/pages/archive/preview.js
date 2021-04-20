import React, { useState, useEffect,useRef,useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import Router, { useRouter, withRouter  } from "next/router";
import PreviewLayout from "components/posting/layout/PreviewLayout";
import ViewPostingForm from 'components/posting/ViewPostingForm';
import ArchiveRightInfo from 'components/layout/RightInfo/ArchiveRightInfo';

const ArchivePreview = () => {
    let type = "archive"
    const [archive, setArchive] = useState(null);
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
                        let archive = data.archive;
                        setArchive(archive);
                        viewPostingFormRef.current.id = archive.archiveInfo.id;
                        viewPostingFormRef.current.category = archive.category;
                        viewPostingFormRef.current.postingInfo = archive.postingInfo;
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

    if (!archive) return <></>;

    return (
        <PreviewLayout>
            <ViewPostingForm ref={viewPostingFormRef} type={type} category={archive.category} postingInfo={archive ? archive.postingInfo : null}/>
            <ArchiveRightInfo archive={archive}/>
        </PreviewLayout>
    )
}



export default withRouter(ArchivePreview);