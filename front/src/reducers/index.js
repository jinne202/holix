import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { userReducer } from './userReducer';
import { projectReducer } from './projectReducer';
import { layoutReducer } from './layoutReducer';

const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
        console.log('HYDRATE', action);
        return action.payload;
        default: {
        const combinedReducer = combineReducers({
            userReducer,
            projectReducer,
            layoutReducer,
        });
        return combinedReducer(state, action);
        }
    }
};

export default rootReducer;