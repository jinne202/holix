export const postingInitialState = {
    isSuccessPosting : false
}

export const UPLOAD_POSTING_REQUEST = 'UPLOAD_POSTING_REQUEST';
export const UPLOAD_POSTING_SUCCESS = 'UPLOAD_POSTING_SUCCESS';
export const UPLOAD_POSTING_FAILURE = 'UPLOAD_POSTING_FAILURE';



export const postingReducer = (state = postingInitialState, action) =>
{
    console.log(action.type)
    switch (action.type) {
        case UPLOAD_POSTING_REQUEST : {
            console.log(action.data);
            return {
                ...state,
                isSuccessPosting : false
            }
        }
        case UPLOAD_POSTING_SUCCESS : {
            return {
                ...state,
                isSuccessPosting : true,
            }
        }
        case UPLOAD_POSTING_FAILURE : {
            return {
                ...state,
                isSuccessPosting : false,
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
}