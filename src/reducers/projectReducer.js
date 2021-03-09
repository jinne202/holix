export const projectInitialState = {
    projectPosts : [],
    isLoadingPosts: false,
    posting: Object,
   
}

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';
export const LOAD_POSTING_REQUEST = 'LOAD_POSTING_REQUEST';
export const LOAD_POSTING_SUCCESS = 'LOAD_POSTING_SUCCESS';
export const LOAD_POSTING_FAILURE = 'LOAD_POSTING_FAILURE';


export const loadPostRequestAction = () => {
    
}

export const projectReducer = (state = projectInitialState, action) =>
{
    switch (action.type) {
        case LOAD_POSTS_REQUEST : {
            console.log(action.data);
            return {
                ...state,
                isLoadingPosts : true
            }
        }
        case LOAD_POSTS_SUCCESS : {
            return {
                ...state,
                isLoadingPosts : false,
                projectPosts : action.data,
            }
        }
        case LOAD_POSTS_FAILURE : {
            return {
                ...state,
                isLoadingPosts : false,
            }
        }
        case LOAD_POSTING_REQUEST: {
            return {
                ...state,
                posting : null,
            }
        }
        case LOAD_POSTING_SUCCESS: {
            return {
                ...state,
                posting: action.data,
            }
        }
        case LOAD_POSTING_FAILURE: {
            return {
                ...state,
                posting: null,
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
}