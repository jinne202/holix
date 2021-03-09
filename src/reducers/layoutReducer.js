export const layoutInitialState = {
    showSidebar : false,
    showCategory : false,
    showDayCategory : false,
    showSortCategory : false,
}

export const SHOW_SIDE_BAR = 'SHOW_SIDE_BAR';
export const HIDE_SIDE_BAR = 'HIDE_SIDE_BAR';
export const SHOW_CATEGORY = 'SHOW_CATEGORY';
export const HIDE_CATEGORY = 'HIDE_CATEGORY';
export const SHOW_DAY_CATEGORY = 'SHOW_DAY_CATEGORY';
export const HIDE_DAY_CATEGORY = 'HIDE_DAY_CATEGORY';
export const SHOW_SORT_CATEGORY = 'SHOW_SORT_CATEGORY';
export const HIDE_SORT_CATEGORY = 'HIDE_SORT_CATEGORY';

export const showSidebarRequest = () => ({
    type : SHOW_SIDE_BAR
});

export const hideSidebarRequest = () => ({
    type : HIDE_SIDE_BAR
});

export const showCategoryRequest = () => ({
    type : SHOW_CATEGORY
});

export const hideCategoryRequest = () => ({
    type : HIDE_CATEGORY
});

export const showDayCategoryRequest = () => ({
    type : SHOW_DAY_CATEGORY
});

export const hideDayCategoryRequest = () => ({
    type : HIDE_DAY_CATEGORY
});

export const showSortCategoryRequest = () => ({
    type : SHOW_SORT_CATEGORY
});

export const hideSortCategoryRequest = () => ({
    type : HIDE_SORT_CATEGORY
});

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
        case SHOW_DAY_CATEGORY : {
            return {
                ...state,
                showDayCategory : true,
            }
        }
        case HIDE_DAY_CATEGORY : {
            return {
                ...state,
                showDayCategory : false,
            }
        }
        case SHOW_SORT_CATEGORY : {
            return {
                ...state,
                showSortCategory : true,
            }
        }
        case HIDE_SORT_CATEGORY : {
            return {
                ...state,
                showSortCategory : false,
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
}