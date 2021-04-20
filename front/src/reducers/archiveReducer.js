export const archiveInitialState = {
    archiveList : [],
    isLoaded : false,
    archive:null
}

export const LOAD_ARCHIVES_REQUEST = 'LOAD_ARCHIVES_REQUEST';
export const LOAD_ARCHIVES_SUCCESS = 'LOAD_ARCHIVES_SUCCESS';
export const LOAD_ARCHIVES_FAILURE = 'LOAD_ARCHIVES_FAILURE';
export const LOAD_ARCHIVE_REQUEST = 'LOAD_ARCHIVE_REQUEST';
export const LOAD_ARCHIVE_SUCCESS = 'LOAD_ARCHIVE_SUCCESS';
export const LOAD_ARCHIVE_FAILURE = 'LOAD_ARCHIVE_FAILURE';

export const WRITE_COMMENT_REQUEST = 'WRITE_COMMENT_REQUEST';
export const WRITE_COMMENT_SUCCESS = 'WRITE_COMMENT_SUCCESS';
export const WRITE_COMMENT_FAILURE = 'WRITE_COMMENT_FAILURE';

export const archiveReducer = (state = archiveInitialState, action) =>
{
    console.log(action.type);
    switch (action.type) {
        case LOAD_ARCHIVES_REQUEST : {
            return {
                ...state,
                isLoaded : false
            }
        }
        case LOAD_ARCHIVES_SUCCESS : {
            return {
                ...state,
                isLoaded : true,
                archiveList : action.data,
            }
        }
        case LOAD_ARCHIVES_FAILURE : {
            return {
                ...state,
                isLoaded : false,
            }
        }
        case LOAD_ARCHIVE_REQUEST : {
            return {
                ...state,
                isLoaded : false,
                archive : null
            }
        }
        case LOAD_ARCHIVE_SUCCESS : {
            return {
                ...state,
                isLoaded : true,
                archive : action.data,
            }
        }
        case LOAD_ARCHIVE_FAILURE : {
            return {
                ...state,
                isLoaded : false,
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
}