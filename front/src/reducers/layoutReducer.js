export const layoutInitialState = {
    showSidebar : false,
    showCategory : false,
}

export const SHOW_SIDE_BAR = 'SHOW_SIDE_BAR';
export const HIDE_SIDE_BAR = 'HIDE_SIDE_BAR';
export const SHOW_CATEGORY = 'SHOW_CATEGORY';
export const HIDE_CATEGORY = 'HIDE_CATEGORY';

export const showSidebarRequest = () => ({
    type : SHOW_SIDE_BAR
});

export const hideSidebarRequest = () => ({
    type : HIDE_SIDE_BAR
});

export const showCategoryRequest = () => ({
    type : SHOW_CATEGORY
})

export const hideCategoryRequest = () => ({
    type : HIDE_CATEGORY
})

export const layoutReducer = (state = layoutInitialState, action) =>
{
    switch (action.type) {
        case SHOW_SIDE_BAR : {
            return {
                ...state,
                showSidebar : true,
            }
        }
        case HIDE_SIDE_BAR : {
            return {
                ...state,
                showSidebar : false,
            }
        }
        case SHOW_CATEGORY : {
            return {
                ...state,
                showCategory : true,
            }
        }
        case HIDE_CATEGORY : {
            return {
                ...state,
                showCategory : false,
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
}