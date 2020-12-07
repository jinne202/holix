export const userInitialState = {
    isLoggedIn : false, // 로그인 여부
    isLoggingIn : false, //로그인 시도
    me : null, //본인 정보
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
});

// export const logoutRequestAction = () => ({
//     type: LOG_OUT_REQUEST,
// });

export const userReducer = (state = userInitialState, action) =>
{
    switch (action.type) {
        case LOG_IN_REQUEST : {
            return {
                ...state,
                isLoggingIn : true,
                isLoggedIn : false,
                me : null,
            }
        }
        case LOG_IN_SUCCESS : {
            return {
                ...state,
                isLoggingIn : false,
                isLoggedIn : true,
                me : action.data,
            }
        }
        case LOG_IN_FAILURE : {
            return {
                ...state,
                isLoggingIn : false,
                isLoggedIn : false,
                me : null,
            }
        }
        default : {
            return {
              ...state,
            };
        }
    }
};
