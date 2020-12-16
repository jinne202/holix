export const userInitialState = {
    isLoggedIn : false, // 로그인 여부
    isLoggingIn : false, //로그인 시도
    me : null, //본인 정보
    isSigningUp : false, // 회원가입 시도
    isSignedUp : false // 회원가입 여부
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

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
                me : localStorage.getItem('token')
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
        case SIGN_UP_REQUEST : {
            return {
                ...state,
                isSigningUp : true,
                isSignedUp : false,
            }
        }
        case SIGN_UP_SUCCESS : {
            return {
                ...state,
                isSigningUp : false,
                isSignedUp : true,
            }
        }
        case SIGN_UP_FAILURE : {
            return {
                ...state,
                isSigningUp : false,
                isSignedUp : false,
            }
        }
        default : {
            return {
              ...state,
            };
        }
    }
};
