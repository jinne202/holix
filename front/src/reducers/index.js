import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { userReducer } from './userReducer';
import { layoutReducer } from './layoutReducer';
import { editProjectReducer } from './editProjectReducer';
import { postingReducer } from './postingReducer';
import { deliveryReducer } from './deliveryReducer';
import { storeReducer } from './storeReducer';
import { archiveReducer } from './archiveReducer'
const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
        return action.payload;
        default: {
        const combinedReducer = combineReducers({
            userReducer,
            layoutReducer,
            editProjectReducer,
            postingReducer,
            deliveryReducer,
            storeReducer,
            archiveReducer,
        });
        return combinedReducer(state, action);
        }
    }
};

export default rootReducer;