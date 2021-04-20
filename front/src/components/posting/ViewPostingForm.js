import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import StoreTopMenu from "../store/StoreTopMenu";
import StoreFooter from "../store/StoreFooter";
import { LOAD_CATEGORY_REQUEST } from 'reducers/editProjectReducer';
import { LOAD_ARCHIVE_REQUEST } from '../../reducers/archiveReducer';
import * as ApiConfig from '../../api/apiConfig';
import { FiDelete } from 'react-icons/fi';
import ArchiveRightInfo from 'components/layout/RightInfo/ArchiveRightInfo'
import ViewContentsForm from "components/posting/ViewContentsForm";

export default class ViewPostingForm extends Component {
    constructor(props) {
        super(props);
        this.viewContentsFormRef = React.createRef(null);
        this.backgroundRef = React.createRef(null);
        this.gradientRef = React.createRef(null);
        
        this.id = props.id;
        this.type = props.type;
        this.postingInfo = props.postingInfo;
        this.category = props.category;

        this.state = {
            currentTitleIndex : 0,
            titleImages : []
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize);
    }

    scroll = (e) => {
        console.log(e.target.scrollTop)
        this.viewContentsFormRef.current.contentsWrappers.forEach( c => {
            if (c[1].current.wrapperRef.current.offsetTop < e.target.scrollTop + 30) {
                c[1].current.setState({
                    inView : true
                })
            }
        })
        this.viewContentsFormRef.current.contentsWrappers.forEach( c => {
            console.log(c[1].current.state)
        })
    }

    updateSize = () => {
        this.resizeContents(window.innerWidth, window.innerHeight);
    }
    
    //사이즈 조정시
    resizeContents = (width, height) => {
        if (this.gradientRef.current != null) {
            this.gradientRef.current.style.marginTop = (height - 82 - this.gradientRef.current.clientHeight) + 'px' 
            this.viewContentsFormRef.current.resizeContents()
        }
    }

    //타이틀 이미지 시작
    changeTitleIndex = (isNext) => {
        this.setState(prevState => ({
            currentTitleIndex : prevState.currentTitleIndex + (isNext ? 1 : -1)
        }))
    }
    //타이틀 이미지 끝

    transferForViewer = (isTemp) => {
        if (!this.postingInfo.contents.contentsList) {
            Object.defineProperty(this.postingInfo, 'contents', {
                writable: true,
                value: JSON.parse(this.postingInfo.contents)
            });
        }
        this.viewContentsFormRef.current.transferForViewer(this.postingInfo.contents.contentsList);
        if (isTemp) {
            for (var i = 0; i < this.postingInfo.titleimages.length; i ++) {
                let reader = new FileReader();
                let f = this.postingInfo.titleimages[i];
                reader.onloadend = () => {
                    this.setState(prevState => ({
                        titleImages : [...prevState.titleImages, reader.result]
                    }))
                }
                console.log(f);
                reader.readAsDataURL(f);
            }
        } else {
            this.setState({
                titleImages : this.postingInfo.titleimages.split(',')
            })
        }
    }

    getImgSrc = () => {
        if (this.state.titleImages.length > 0) {
            let imgSrc = this.state.titleImages[this.state.currentTitleIndex];
            if (imgSrc.includes('data')) {
                return imgSrc;
            } else {
                return ApiConfig.imageHost + this.type + "/" + this.id + "/" + imgSrc;
            }
        } else {
            return '';
        }
    }
    
    render() {
        return (
            <> 
                <PostingContentsWrapper onScroll={this.scroll}>
                    { this.postingInfo ? 
                    <>
                    <BackgroundTitle ref={this.backgroundRef} style={{backgroundColor: this.postingInfo.backgroundcolor}}>
                        <TitleImage src={this.getImgSrc()}/>
                        { this.state.titleImages.length > 0 ?
                            <>
                            <TitleImageSlideWrapper>
                                    { this.state.currentTitleIndex > 0 ?
                                        <TitleImagePrevBtn  onClick={() => this.changeTitleIndex(false)}>
                                            {"<"}
                                        </TitleImagePrevBtn>
                                        : <></>
                                    }
                                    { this.state.currentTitleIndex != this.postingInfo.imageSize -1 ?
                                        <TitleImageNextBtn onClick={() => this.changeTitleIndex(true)}>
                                            {">"}
                                        </TitleImageNextBtn>
                                    : <></>
                                    }
                                </TitleImageSlideWrapper>
                                </>
                            :
                            <></>
                        }
                    </BackgroundTitle>
                    <GradientTitle ref={this.gradientRef} style={{background: 'linear-gradient(to top,' + this.postingInfo.gradientcolor + ',#ffffff00)', marginTop:(window.innerHeight - 82 - 293) + 'px'}}>
                        <Title color={this.postingInfo.textcolor}>{this.postingInfo.title}</Title>
                        <CategoryHashtagForm>
                            <CategoryForm>
                                <SelectedCategoryList >
                                {
                                    this.postingInfo.categoryList.map((c, index) => 
                                        <SelectedCategoryListItem key={index} value={c}>{this.category.find(ca => ca.id === parseInt(c)).name}</SelectedCategoryListItem>
                                    )
                                }
                                </SelectedCategoryList>
                            </CategoryForm>
                            <HashtagForm>
                                <HashTagList>
                                { 
                                    this.postingInfo.hashtag.split(',').map((c, index) => 
                                            <HashTagListItem key={index} style={{color:this.state.titleColor}}>#{c}</HashTagListItem>
                                    )
                                }
                                </HashTagList>
                            </HashtagForm>
                        </CategoryHashtagForm>
                    </GradientTitle>
                    <SubinfoForm style={{backgroundColor: this.postingInfo.gradientcolor, color:this.postingInfo.titleColor}}>
                        <SubinfoList>
                            <li><SubinfoTitle>Creator</SubinfoTitle><SubInfoValue color={this.postingInfo.titleColor}>{this.postingInfo.nickname}</SubInfoValue></li>
                            {
                                this.postingInfo.subinfolist.split(',').map((s, index) => {
                                    let subInfo = s.split('//');
                                    return <li key={index}><SubinfoTitle>{subInfo[0]}</SubinfoTitle><SubInfoValue color={this.postingInfo.titleColor}>{subInfo[1]}</SubInfoValue></li>
                                })
                            }
                        </SubinfoList>
                    </SubinfoForm>
                    </>
                    : <></> }
                    <ViewContentsForm ref={this.viewContentsFormRef} />
                </PostingContentsWrapper>
            </>
            )
    }
}

const PostingContentsWrapper = styled.div`
    
`
//타이틀 부분
const TitleSideMenu = styled.ul`
    z-index:99;
    position: absolute;
    right: 4%;
    top: 180px;
    text-align: center;
    overflow: hidden;

    & > input {
        display:none;
    }

    & > li {
        padding-right: 10px;
        float:left;
    }
`
const BackgroundTitle = styled.div`
    background-color: #FAFAFA;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;    
    text-align:center;
    
`

const TitleImage = styled.img`
    background-color: #FAFAFA;
    max-width: 100%;
    max-height: 100%;
    position: relative;
`

const DelTitleImgBtn = styled.div`
    position:absolute;
    top: 0;
    right: 0;
    font-size: 30px;
`

const TitleImageSlideWrapper = styled.div`
    width:100%;
    height:auto;
    top:30%;
    position:absolute;
`
const TitleImagePrevBtn = styled.div`
    height:30px;
    float: left;
    font-size:30px;
`

const TitleImageNextBtn = styled.div`
    height:30px;
    float: right;
    font-size:30px;
`
const GradientTitle = styled.div`
    position: relative;
    width: 100%;
    background: linear-gradient(to top, #00ffd3, #ffffff00);
    overflow: visible;
    height: auto;
    margin: 480px 0 0 0;
`

const TitleColorChip = styled.div`
    position: absolute;
    left: 4%;
    top: 7%;
    z-index: 99;

    & > ul > li {
        float: left;
        width: 28px;
        height: 28px;
        margin-right: 6px;
        border-radius: 30px;
        background: white;
        border: 1px solid black;
    }

    & > ul > li:last-child {
        background:black;
    }

    & > ul > li.selected {
        width: 34px;
        height: 34px;
    }
`

const Title = styled.div`
    position: relative;
    width: 80%;
    left: 4%;
    color: ${props => props.color};
    font-size: 64pt;
    font-weight: 530;
    padding: 64px 0 22px 0;
    background: transparent;
    border: none;
    &::placeholder {
        color: ${props => props.color};
      }
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
    padding-right:10px;
`

const HashTagList = styled.ul`
 
`
const HashTagListItem = styled.li`
    float:left;
    padding-right:10px;
`
const HashtagForm = styled.div`
    display: inline-block;
`

const SubinfoForm = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    background: #00ffd3;
    overflow: visible;
    color: white;
    font-size: 24px;
`

const SubinfoList = styled.ul`
    padding: 49px 0 46px 0;
    position: relative;
    left: 4%;
`

const SubinfoTitle = styled.span`
    margin-right: 43px;
    width: 71px;
    display: inline-block;
`

const SubInfoValue = styled.span`
    background: transparent;
    border: 1px dashed white;
    box-sizing: border-box;
    width: 521px;
    color:white;
    padding:0;
    font-size: 24px;
    color: ${props => props.color};
    &:not([value=""]){
        border: 0px;
    }
`
//컨텐츠 부분 끝

//리뷰
const ReviewWrapper = styled.div`
    position: relative;
    padding-top: 35px;
    font-size: 12px;
    letter-spacing: -1px;
    user-select: none;
    margin: 30px 0px 0px;
    border-top: 1px solid rgb(51, 51, 51);
    background: white;
    overflow: visible;
    outline: none;
`

const ReviewSortWrapper = styled.div`
    display: table;
    width: 100%;
    table-layout: fixed;
    height: 50px;
    padding: 11px 12px 10px 18px;
    box-sizing: border-box;
    background-color: #555
`

const ReviewArticleWrapper = styled.div`
    display: block;
    margin-bottom: 16px;
`

const ReviewArticle = styled.div`
    display: block;
    padding-top: 30px;
    border-bottom: 1px solid #ccc;
`

const RAProfileInfo = styled.div`
    margin-bottom: 13px;
`

const RAImageWrapper = styled.div`
    margin-bottom: 19px;
    font-size: 0;
`

const RATitle = styled.div`
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: bold;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const RAContents = styled.div`
`
