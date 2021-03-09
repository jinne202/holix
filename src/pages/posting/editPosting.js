import React, { useState, useEffect, PureComponent, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import styled, { css } from 'styled-components';
import useScrollDirection from '../../hooks/useScrollDirection';
import { useRouter, withRouter  } from "next/router";
import { LOAD_POSTING_REQUEST } from '../../reducers/projectReducer';
import { LOAD_CATEGORY_REQUEST } from '../../reducers/editProjectReducer';
import CategoryList from "../../components/posting/CategoryList";
import EditPostingForm from "../../components/posting/EditPostingForm";
import ImageContentsWrapper from "../../components/posting/ImageContentsWrapper";

const EditPosting = () => {
    const scrollDirection = useScrollDirection();
    const dispatch = useDispatch();
    const router = useRouter();

    const { myAccountInfo } = useSelector((state) => state.userReducer);
    const [client, handleClient] = useInput('');
    const [title, handleTitle] = useInput('');
    const [hashtag, handleHashtag] = useInput('');
    const [duration, handleDuration] = useInput('');
    const [titleColor, handleTitleColor] = useInput('');
    const [titleTextColor, handleTitleTextColor] = useInput('');
    const [gradientColor, handleGradientColor] = useInput('');
    const [body, handleBody] = useInput('');
    const [imageList, setImageList] = useState([]);
    
    //카테고리 설정
    const {category, isLoadingConfig} = useSelector(state => state.editProjectReducer);
    const [selectedCategory, addSelectedCategory] = useState([]);
    const categoryListRef = useRef(null);
    const editPostingFormRef = useRef(null);
    useEffect(() => {
        dispatch({
            type: LOAD_CATEGORY_REQUEST,
        });
    }, []);

    const handleAddSelectedCategory = useCallback((e) => {
        e.preventDefault();
        addSelectedCategory([...selectedCategory, e.target.getAttribute("value")]);
    });

    const handleRemoveSelectedCategory = useCallback((e) => {
        e.preventDefault();
        addSelectedCategory(selectedCategory.filter(c => c !== e.target.getAttribute("value")));
    });

    const handleAddCategory = useCallback((e) => {
        e.preventDefault();
        categoryListRef.current.visible = !categoryListRef.current.visible;
        categoryListRef.current.forceUpdate();
    });

    const showSelectedCategory = selectedCategory.map((c) => 
            <SelectedCategoryListItem onClick={handleRemoveSelectedCategory} value={c}>{category[c].name}</SelectedCategoryListItem>
        );
    
    // 카테고리 끝

    // 해시태그 시작
    const [hashTags, setHashTags] = useState([]);
    var hashTagIndex = 0;
    const handleAddHashTag = useCallback((e) => {
        e.preventDefault();
        setHashTags([...hashTags, hashTagIndex++]);
        console.log(hashTags);
    }); 
    const showHashTagLost = hashTags.map((c) => 
            <HashTagListItem onClick={handleRemoveSelectedCategory} value={c}><input type="text"/></HashTagListItem>
        );
    // 해시태그 끝


    // !-- HEADER 높이
    const [header, setHeader] = useState(false);
    const listenScrollEvent = event => {
        if (window.scrollY < 199) {
            return setHeader(false);
        } else if (window.scrollY > 200) {
            return setHeader(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);

    // !-- HEADER 높이
    if (isLoadingConfig) return <div>로딩중</div>;
    return (
        <>
            <BackgroundTitle>
            </BackgroundTitle>
            <GradientTitle>
                <TitleColorChip>
                    <ul >
                        <li class="titleWhite selected"></li>
                        <li class="titleBlack"></li>
                    </ul>
                </TitleColorChip>
                <Title type="text" placeholder="제목을 입력해주세요." value={title} onChange={handleTitle}/>
                <CategoryHashtagForm>
                    <CategoryForm>
                        <CategoryList ref={categoryListRef} list={category} addOnClick={handleAddSelectedCategory}/>
                        <SelectedCategoryList>
                            {showSelectedCategory}
                            <SelectedCategoryListItem onClick={handleAddCategory}>+ Category</SelectedCategoryListItem>
                        </SelectedCategoryList>
                    </CategoryForm>
                    <HashtagForm>
                        <HashTagList>
                            {showHashTagLost}
                            <HashTagListItem onClick={handleAddHashTag}>+ HashTag</HashTagListItem>
                        </HashTagList>
                    </HashtagForm>
                 </CategoryHashtagForm>
            </GradientTitle>
            <SubinfoForm>
                <SubinfoList>
                    <li><SubinfoTitle>Creator</SubinfoTitle><SubInfoValue value={myAccountInfo ? myAccountInfo.nickname : "" } /></li>
                    <li><SubinfoTitle>Client</SubinfoTitle><SubInfoValue type="text" value={client} onChange={handleClient} /></li>
                    <li><SubinfoTitle>Duration</SubinfoTitle><SubInfoValue type="text" value={duration} onChange={handleDuration} /></li>
                </SubinfoList>
            </SubinfoForm>
            <EditPostingForm ref={editPostingFormRef} />
         </>
    )   
}


const BackgroundTitle = styled.div`
    background-color: #FAFAFA;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: fixed;
    top: 0;
    z-index: -1;    
`

const GradientTitle = styled.div`
    position: relative;
    width: 100%;
    background: linear-gradient(to top, #00ffd3, #ffffff00);
    overflow: visible;
    height: auto;
    margin-top: 585px;
`

const TitleColorChip = styled.div`
    position: absolute;
    left: 4%;
    top: 7%;
    z-index: 99;
`

const Title = styled.input`
    position: relative;
    width: 80%;
    left: 4%;
    color: #000000;
    font-size: 64pt;
    font-weight: 530;
    padding: 64px 0 22px 0;
    background: transparent;
    border: none;
`

const CategoryHashtagForm = styled.div`
    position: relative;
    width: 80%;
    left: 4%;
    color: white;
    padding-bottom: 64px;
    font-size: 24px;
`

const CategoryForm = styled.div`
    margin-right: 19px;
    display: inline-block;
`

const SelectedCategoryList = styled.ul`
 
`

const SelectedCategoryListItem = styled.ul`
    float:left;
`

const HashTagList = styled.ul`
 
`
const HashTagListItem = styled.ul`
    float:left;
`

const AddCategoryBtn = styled.button`
    border: 0;
    background: none;
    color: white;
    font-size: 24px;
`
const HashtagForm = styled.div`
    display: inline-block;
`

const AddHashBtn = styled.button`
    border: 0;
    background: none;
    color: white;
    font-size: 24px;
    display: inline-block;
`

const SubinfoForm = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    background: #00ffd3;
    overflow: hidden;
    color: white;
    font-size: 24px;
`

const SubinfoList = styled.ul`
    margin: 49px 0 46px 0;
    position: relative;
    left: 4%;
`

const SubinfoTitle = styled.span`
    margin-right: 43px;
    width: 71px;
    display: inline-block;
`

const SubInfoValue = styled.input`
`

export default EditPosting;