import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { userReducer } from './userReducer';
import { projectReducer } from './projectReducer';
import { layoutReducer } from './layoutReducer';
import { editProjectReducer } from './editProjectReducer';
import { productReducer } from './productReducer';

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
            editProjectReducer,
            productReducer,
        });
        return combinedReducer(state, action);
        }
    }
};

export default rootReducer;