import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import Router, { useRouter, withRouter  } from "next/router";
import useInput from '../../hooks/useInput';
import StoreTopMenu from "../store/StoreTopMenu";
import StoreFooter from "../store/StoreFooter";
import { LOAD_CATEGORY_REQUEST } from 'reducers/editProjectReducer';
import { UPLOAD_PRODUCT_REQUEST } from 'reducers/storeReducer';
import * as ApiConfig from '../../api/apiConfig';
import { FiDelete } from 'react-icons/fi';
import CategoryList from "components/posting/CategoryList";
import EditContentsForm from "./EditContentsForm";
import ColorPicker from 'components/posting/ColorPicker';
import ImageButton from 'components/posting/ImageButton';

export default class EditPostingForm extends Component {
    //const { myAccountInfo } = useSelector((state) => state.userReducer);
    constructor(props) {
        super(props);
        this.editContentsFormRef = React.createRef(null);
        this.productInfoRef = React.createRef(null);
        this.fileUploadRef = React.createRef(null);
        this.categoryListRef = React.createRef(null);

        this.colorPickerRef = React.createRef(null);
        this.colorPickerGradientRef = React.createRef(null);

        this.backgroundRef = React.createRef(null);
        this.gradientRef = React.createRef(null);
        this.colorPickerRef = React.createRef(null);

        this.type = props.type;
        this.postingInfo = props.postingInfo;
        this.category = props.category;
        this.subinfos = props.subinfos;
        this.myAccountInfo  = props.account;
        console.log("this.category " + this.category)
        this.state = {
            nickname : this.type == "store" ? this.myAccountInfo.sellerList[0].name : this.myAccountInfo.nickname,
            subInfoList : [],
            title : '',
            titleColor : 'white',
            backGround : '#fff',
            gradientColor : '#000',
            selectedCategory : [],
            hashTags : [],
            currentHash : '',
            files : [],
            fileRenders : [],
            currentTitleIndex : 0,
            
        }
    }
    
    componentDidMount() {
        window.addEventListener('resize', this.updateSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize);
    }

    updateSize = () => {
        this.resizeContents(window.innerWidth, window.innerHeight);
    }
    
    //사이즈 조정시
    resizeContents = (width, height) => {
        if (this.gradientRef.current != null) {
            this.gradientRef.current.style.marginTop = (height - 82 - this.gradientRef.current.clientHeight) + 'px' 
            this.editContentsFormRef.current.resizeContents()
        }
    }
    
    //타이틀 컬러
    changeTitleColor = (color) => {
        this.setState({
            titleColor : color
        })
    }

    onChangeTitle = (e) => {
        this.props.onChangeTitle(e.target.value)
    };

    //타이틀 컬러 끝

    //데이터 셋팅
    onPostHandle = () => {
        var data = this.editContentsFormRef.current.transferForUpload(false);
        var titleImages = [];
        
        this.state.files.forEach(f => {
            if (!f.isFake) {
                let fileName = "titleimg_" + this.state.files.indexOf(f) + f.name.substring(f.name.lastIndexOf('.'));
                titleImages.push(fileName)
                Object.defineProperty(f, 'name', {
                    writable: true,
                    value: fileName
                });
            }
        })
        data.files.push(...this.state.files);

        var subinfoList = [];
        this.state.subInfoList.map(s => {
            subinfoList.push(s.name + "//" + s.value);
        })

        let json = {
            postingInfo : {
                titleimages : titleImages.join(','),
                title : this.state.title,
                textcolor : this.state.titleColor,
                backgroundcolor : this.state.backGround,
                gradientcolor : this.state.gradientColor,
                hashtag : this.state.hashTags.join(','),
                categorys : this.state.selectedCategory.join(','),
                contents : JSON.stringify(data.json),
                subinfolist : subinfoList.join(','),
            },
            files : data.files
            }    
        return json
    }

    onHandleTempSave = (isPreview) => {
        let data = this.editContentsFormRef.current.transferForUpload(true);
        var categoryList = [];
        this.state.selectedCategory.map((c) => 
            categoryList.push(this.category.find(ca => ca.id === parseInt(c)).name)
        );
        var subinfoList = [];
        this.state.subInfoList.map(s => {
            subinfoList.push(s.name + "//" + s.value);
        })
        let json = {
            postingInfo : {
                titleimages : this.state.files,
                title : this.state.title,
                textcolor : this.state.titleColor,
                backgroundcolor : this.state.backGround,
                gradientcolor : this.state.gradientColor,
                hashtag : this.state.hashTags.join(','),
                categoryList : this.state.selectedCategory,
                contents : data.json,
                nickname : this.state.nickname,
                subinfolist : subinfoList.join(','),
            }
        }
        console.log(json)
        return json;    
    }


    transferForEdit = () => {
        if (this.postingInfo.contents.contentsList) {
            Object.defineProperty(this.postingInfo, 'contents', {
                writable: true,
                value: JSON.parse(this.postingInfo.contents)
            });
            this.handleLoadData(this.postingInfo, false);
        }
    }

    handleLoadData = (postingInfo, isTemp) => {
        this.setState({
            title : postingInfo.title,
            textcolor : postingInfo.textcolor,
            backGround : postingInfo.backgroundcolor,
            gradientColor : postingInfo.gradientcolor,
            selectedCategory : postingInfo.categoryList,
            hashTags : postingInfo.hashtag.split(','),
        })
        postingInfo.subinfolist.split(',').map(s => {
            let subs = s.split('//');
            this.setState({
                subInfoList : [...this.state.subInfoList, {
                    name : subs[0],
                    value : subs[1]
                }]
            })
        })
        if (isTemp) {
            this.showTitleImgs(postingInfo.titleimages)
            this.setState({
                files : postingInfo.titleimages,
            })
        } else {
            this.showTitleImgsForEdit(postingInfo.titleimages)
        }
        console.log(postingInfo)
        this.editContentsFormRef.current.loadData(postingInfo.contents.contentsList)
    }

    //카테고리 설정
    handleAddSelectedCategory = (e) => {
        e.preventDefault();
        let categoryIndex = parseInt(e.target.getAttribute("value"));
        if (this.state.selectedCategory.length >= 2) return;
        if (this.state.selectedCategory.some(c => c === categoryIndex)) {
            this.setState(prevState => ({
                selectedCategory : prevState.selectedCategory.filter(c => c !== categoryIndex)
            }))
        } else {
            this.setState(prevState => ({
                selectedCategory : [...prevState.selectedCategory, categoryIndex]
            }))
        }
        
    };

    handleRemoveSelectedCategory = (e) => {
        e.preventDefault();
        console.log(e.target.getAttribute("value"));
        this.setState(prevState => ({
            selectedCategory : prevState.selectedCategory.filter(c => c !== parseInt(e.target.getAttribute("value")))
        }))
    };

    handleAddCategory = (e) => {
        e.preventDefault();

        this.categoryListRef.current.visible = !this.categoryListRef.current.visible;
        this.categoryListRef.current.forceUpdate();
    };
    
    // 카테고리 끝

    // 해시태그 시작
    handleCurrentHash = (e) => {
        this.setState({
            currentHash : e.target.value
        })
    }

    handleAddHashTag = (e) => {
        if (e.charCode == 13) {
            this.setState(prevState => ({
                hashTags : [...prevState.hashTags, this.state.currentHash],
                currentHash : ''
            }))
        }
    }

    handleRemoveTag = (index) => {
        this.setState(prevState => ({
            hashTags : prevState.hashTags.filter(h => prevState.hashTags.indexOf(h) !== index)
        }))
    };

    showHashTag = () => {
        this.state.hashTags.map((c, index) => {
            return (<HashTagListItem onClick={() => this.handleRemoveTag(index)} style={{color:this.state.titleColor}}>#{c}</HashTagListItem>)
        })
    }
    // 해시태그 끝

    //타이틀이미지 시작

    handleChangeComplete = (color) => {
        this.setState({
            backGround : color.hex
        })
        this.colorPickerRef.current.background = color.hex;
    };

    showColorPicker = () => {
        this.colorPickerRef.current.visible = true;
        this.colorPickerRef.current.forceUpdate();
    };

    delTitileImg = () => {
        this.setState(prevState => ({
            files : prevState.files.filter(fr => prevState.files.indexOf(fr) !== this.state.currentTitleIndex),
            fileRenders : prevState.fileRenders.filter(fr => prevState.fileRenders.indexOf(fr) !== this.state.currentTitleIndex)
        }))
    }

    changeTitleImg = (e) => {
        this.setState(prevState => ({
            files : [...prevState.files, ...e.target.files]
        }))
        this.showTitleImgs(e.target.files);
    }
    
    showTitleImgs = (files) => {
        for (var i = 0; i < files.length; i++) {
            let reader = new FileReader();
            let f = files[i];
            
            reader.onloadend = () => {
                this.setState(prevState => ({
                    fileRenders : [...prevState.fileRenders, reader.result]
                }))
            }
            reader.readAsDataURL(f);
        }
    }
    
    showTitleImgsForEdit = (list) => {
        list.split(',').forEach(img => {
            this.setState(prevState => ({
                fileRenders : [...prevState.fileRenders, ApiConfig.imageHost + this.type + "/" + this.postingId + "/" + img],
                files : [...prevState.files, {
                    name : img,
                    isFake : true
                }]
            }))
        });
    }

    changeTitleIndex = (isNext) => {
        this.setState(prevStae => ({
            currentTitleIndex : prevStae.currentTitleIndex + (isNext ? 1 : -1)
        }))
    }
    //타이틀이미지 끝

    //그라디언트 색 시작
    handleChangeGradientComplete = (color) => {
        this.setState({
            gradientColor : color.hex
        })
        this.colorPickerGradientRef.current.background = color.hex;
    };

    showColorGradientPicker = () => {
        this.colorPickerGradientRef.current.visible = true;
        this.colorPickerGradientRef.current.forceUpdate();
    }

    //그라디언트 끝

    uploadImage = () => {
        this.fileUploadRef.current.click();
    }
 
    //브랜드
    changeBrand = (e) => {
        this.setState({
            nickname : e.target.value
        })

    }
    //서브인포
    addSubInfo = () => {
        this.setState(prevState => ({
            subInfoList : [...prevState.subInfoList, {
                    value : '',
                    name : this.subinfos[0].name
            }]
        }))
        console.log(this.state.subInfoList)
    }

    changeSubInfoLabel = (e, index) => {
        this.state.subInfoList[index].name = e.target.value
        this.setState({
            subInfoList : this.state.subInfoList
        })
    }

    handleChangeSubInfoValue = (e, index) => {
        this.state.subInfoList[index].value = e.target.value
        this.setState({
            subInfoList : this.state.subInfoList
        })
    }

    removeSubInfo = (index) => {
        this.setState(prevState => ({
            subInfoList : prevState.subInfoList.filter(s => prevState.subInfoList.indexOf(s) !== index)
        }))
    }

    render() {
        return (
            <>
                    <ProductContentsWrapper id = "productContentsrapper">
                        <ColorPicker ref={this.colorPickerRef} onChangeComplete={this.handleChangeComplete} background={this.state.backGround}/>
                        <TitleSideMenu>
                            <input type="file" ref={this.fileUploadRef} multiple onChange={this.changeTitleImg}/>
                            <li onClick={this.uploadImage}><ImageButton name="image" /></li>
                            <li onClick={this.showColorPicker}><ImageButton name="color" /></li>
                        </TitleSideMenu>
                        <BackgroundTitle ref={this.backgroundRef} style={{backgroundColor: this.state.backGround}}>
                            <TitleImage src={this.state.fileRenders.length > 0 ?  this.state.fileRenders[this.state.currentTitleIndex] : ''} />
                            { this.state.fileRenders.length > 0 ?
                                <>
                                <DelTitleImgBtn onClick={this.delTitileImg}>X</DelTitleImgBtn>
                                <TitleImageSlideWrapper>
                                        { this.state.currentTitleIndex > 0 ?
                                            <TitleImagePrevBtn  onClick={() => this.changeTitleIndex(false)}>
                                                {"<"}
                                            </TitleImagePrevBtn>
                                            : <></>
                                        }
                                        { this.state.currentTitleIndex != this.state.fileRenders.length -1 ?
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
                        <GradientTitle ref={this.gradientRef} style={{background: 'linear-gradient(to top,' + this.state.gradientColor + ',#ffffff00)', marginTop:(window.innerHeight - 82 - 293) + 'px' }}>
                            <ColorPicker ref={this.colorPickerGradientRef} onChangeComplete={this.handleChangeGradientComplete} background={this.state.gradientColor}/>
                            <TitleSideMenu>
                                <li onClick={this.showColorGradientPicker}><ImageButton name="color" /></li>
                            </TitleSideMenu>
                            <TitleColorChip>
                                <ul >
                                    <li onClick={() => this.changeTitleColor("white")} className={this.state.titleColor == "white" ? "selected" : ""}></li>
                                    <li onClick={() => this.changeTitleColor("black")} className={this.state.titleColor == "black" ? "selected" : ""}></li>
                                </ul>
                            </TitleColorChip>
                            <Title type="text" value={this.state.title} onChange={this.onChangeTitle} color={this.state.titleColor} placeholder="제목을 입력해주세요."/>
                            <CategoryHashtagForm>
                                <CategoryForm>
                                    {this.state.selectedCategory.length < 2 ? <CategoryList style={{color:this.state.titleColor}} ref={this.categoryListRef} list={this.category} addOnClick={this.handleAddSelectedCategory}/>
                                    : <></>}
                                    <SelectedCategoryList style={{color:this.state.titleColor}}>
                                        {
                                            this.state.selectedCategory.map((c) => 
                                                <SelectedCategoryListItem onClick={this.handleRemoveSelectedCategory} value={c}>{this.category.find(ca => ca.id === parseInt(c)).name}</SelectedCategoryListItem>
                                            )
                                        }
                                        {
                                            this.state.selectedCategory.length < 2 ? 
                                            <SelectedCategoryListItem onClick={this.handleAddCategory} >+ Category</SelectedCategoryListItem>
                                            : <></>
                                        }
                                        
                                    </SelectedCategoryList>
                                </CategoryForm>
                                <HashtagForm>
                                    <HashTagList>
                                        { this.state.hashTags.map((c, index) => 
                                            <HashTagListItem onClick={() => this.handleRemoveTag(index)} style={{color:this.state.titleColor}}>#{c}</HashTagListItem>
                                        )
                                        }
                                        {
                                            this.state.hashTags.length < 4 ?
                                            <HashTagListItem><HashTagInput value={this.state.currentHash} onKeyPress={this.handleAddHashTag} color={this.state.titleColor} onChange = {this.handleCurrentHash} placeholder='+ HashTag'/></HashTagListItem>
                                            :
                                            <></>
                                        }
                                    </HashTagList>
                                </HashtagForm>
                            </CategoryHashtagForm>
                        </GradientTitle>
                        <SubinfoForm style={{backgroundColor: this.state.gradientColor, color:this.state.titleColor}}>
                            <SubinfoList>
                                {
                                    this.type == "store" ? 
                                    <li><SubinfoTitle>Brand</SubinfoTitle>
                                        <SubInfoList onChange={this.changeBrand} color={this.state.titleColor}>
                                            {
                                                this.myAccountInfo.sellerList.map( seller => 
                                                    <option value={seller.name}>{seller.name}</option>
                                                )
                                            }
                                        </SubInfoList></li>
                                    : 
                                    <li><SubinfoTitle>Creator</SubinfoTitle><SubInfoValue value={this.myAccountInfo.nickname} onChange={this.handleNick} color={this.state.titleColor} /></li>
                                }
                                {
                                    this.state.subInfoList.map((subInfo, index) => 
                                        <li key={index}><SubinfoTitle><SubInfoList onChange={(e) => this.changeSubInfoLabel(e, index)} color={this.state.titleColor}>
                                        {
                                            this.subinfos.map((s, i) => 
                                                <option key={i} value={s.name}>{s.name}</option>
                                            )
                                        }
                                        </SubInfoList></SubinfoTitle><SubInfoValue type="text" value={subInfo.value} onChange={(e) => this.handleChangeSubInfoValue(e, index)}  color={this.state.titleColor} />
                                        <ItemBtnWrapper>
                                            <ImageButton name="minus" onClick={() => this.removeSubInfo(index)}/>
                                        </ItemBtnWrapper>
                                        </li>
                                    )
                                }
                                <li style={{textAlign:'center', border: '1px dashed white'}}>
                                    <ItemBtnWrapper>
                                        <ImageButton name="plus" onClick={this.addSubInfo}/>
                                    </ItemBtnWrapper>
                                </li>
                             { /*   <li><SubinfoTitle>Client</SubinfoTitle><SubInfoValue type="text" value={this.state.client} onChange={this.handleClient}  color={this.state.titleColor} /></li>
                                <li><SubinfoTitle>Duration</SubinfoTitle><SubInfoValue type="text" value={this.state.duration} onChange={this.handleDuration}  color={this.state.titleColor} /></li> */}
                            </SubinfoList>
                        </SubinfoForm>
                        <EditContentsForm ref={this.editContentsFormRef} />
                </ProductContentsWrapper>
            </>
        )
    }
}

const ProductContentsWrapper = styled.div`
    position: relative;
    margin: 0px;
    padding: 0px;
    -webkit-box-align: stretch;
    align-items: stretch;
    border-width: 0px;
    border-style: solid;
    border-color: rgb(4, 4, 5);
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0px;
    min-width: 0px;
    max-width: 100%;
    -webkit-box-flex: 1;
    overflow:scroll;
    margin-top:80px;
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
        margin-right: 10px;
        float:left;
        width:30px;
        height:30px;
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
    background: url(/color.png);
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

const Title = styled.input`
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
const HashTagInput = styled.input`
    background: transparent;
    border: 0;
    color: ${props => props.color};
    font-size: 20px;
    padding:0;
    &::placeholder {
        color: ${props => props.color};
      }
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
    margin: 49px 0 46px 0;
    position: relative;
    left: 4%;
    width: 85%;
    & > li { 
        margin-top: 5px;
    }
`

const SubinfoTitle = styled.span`
    margin-right: 43px;
    width: 71px;
    display: inline-block;
`

const SubInfoValue = styled.input`
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

const SubInfoList = styled.select`
    background: transparent;
    border: 1px dashed white;
    box-sizing: border-box;
    width: 100%;
    color:white;
    padding:0;
    font-size: 24px;
    color: ${props => props.color};
`

const ItemBtnWrapper = styled.div`
    width:30px;
    height:30px;
    display: inline-block;
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
