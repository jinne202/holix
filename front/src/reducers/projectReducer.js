export const projectInitialState = {
    projectPosts : [],
    isLoadingPosts : false,
}

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

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
        default : {
            return {
                ...state,
            }
        }
    }
}