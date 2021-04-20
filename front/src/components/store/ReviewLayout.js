import React, { useState, useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from 'hooks/useInput';
import styled, { css } from 'styled-components';
import StarRatings from 'components/buttons/star-ratings';
import { WRITE_REVIEW_REQUEST } from 'reducers/storeReducer';

const ReviewTab = ({id, list}) => {
    const dispatch = useDispatch();
    const { myAccountInfo } = useSelector((state) => state.userReducer);
    const [ contents, handleChangeContents ] = useInput('');
    const [ title, handleChangeTitle ] = useInput('');
    const [ rating, setRating ] = useState(0);
    const [ files, setFiles ] = useState([]);
    const [ fileRenders, setFileRenders ] = useState([]);
    const changeRating = ( newRating ) => {
        setRating(newRating)
      }

      const uploadImgs = (e) => {
        setFiles([...files, ...e.target.files])
        
        for (var i = 0; i < e.target.files.length; i++) {
            let reader = new FileReader();
            let f = e.target.files[i];
            
            reader.onloadend = () => {
                setFileRenders([...fileRenders, reader.result])
            }
            reader.readAsDataURL(f);
        }
        console.log(fileRenders)
      }
    const writeReview = (e) => {
        files.forEach(f => {
                let fileName = "reviewimg_" + files.indexOf(f) + f.name.substring(f.name.lastIndexOf('.'));
                Object.defineProperty(f, 'name', {
                    writable: true,
                    value: fileName
                });
            }
        )
        dispatch({
            type: WRITE_REVIEW_REQUEST,
            data : {
                title : title,
                contents : contents,
                point : rating
            },
            id : id,
            files : files
        });
    }

    return (
        <TabWrapper>
            <Label>
                리뷰
            </Label>
            <ListWrapper>
                {
                    list.map((item, index) => {
                        return (
                            <CommentWrapper>
                                <ProfileWrapper>
                                    <ProfileImg>

                                    </ProfileImg>
                                    <NickName>
                                        {item.account}
                                    </NickName>
                                </ProfileWrapper>
                                <ConetentsWrapper>
                                    <TitleWrapper>
                                        <Title>
                                            {item.title}
                                        </Title>
                                        <Rating>
                                            <StarRatings
                                            rating={item.point}
                                            starRatedColor="#FF730E"
                                            numberOfStars={5}
                                            starDimension="20px"
                                            starSpacing="1px"/>
                                        </Rating>
                                    </TitleWrapper>
                                    <Contents>
                                        {item.contents}
                                    </Contents>
                                </ConetentsWrapper>
                            </CommentWrapper>
                        )
                    })
                }
            </ListWrapper>
            <WriteWrapper>
                <StarRatings
                    rating={rating}
                    starRatedColor="#FF730E"
                    changeRating={changeRating}
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="5px"
                />
                <input type="text" value = {title} onChange={handleChangeTitle} />
                <textarea style={{width:'100%', height:'70px'}} value={contents} onChange={handleChangeContents}></textarea>
                <input type="file" multiple onChange={uploadImgs} />
                <ImgList>
                    {
                        fileRenders.map(f => {
                            return <li><img src={f} /> </li>
                        })
                    }
                </ImgList>
                <button style={{width:'100%'}} onClick={writeReview}>등록</button>
            </WriteWrapper>
        </TabWrapper>
    )
}

const TabWrapper = styled.div`
    width:90%;
    margin: 0 auto;
`

const Label = styled.h2`
`
const ListWrapper = styled.div`
    height: auto;
    overflow:auto;
    margin-bottom : 20px;
    width: 100%;
`

const CommentWrapper = styled.div`
    padding-bottom : 10px;
    border-bottom : 0.5px solid gray;
    margin-bottom : 10px;
    height: auto;
    overflow:auto;
`

const ProfileWrapper = styled.div`
    display:inline-block;
    padding-right: 5px;
    width : 10%;
    height: 60px;
    overflow: hidden;
    border-right : 1px solid gray;
    float: left;
`

const ProfileImg = styled.img`
`

const ConetentsWrapper = styled.div`
    display:inline-block;
    padding-left: 10px;
    float : left;
    width: 90%;
    height:auto;
    overflow:auto;
`

const NickName = styled.div`
    font-size: 9px;
`

const TitleWrapper = styled.div`
    height: auto;
    overflow: auto;
`

const Title = styled.span`
    font-size : 20px;
    font-weight:500;
    float:left;
`

const Rating = styled.span`
    float:right;
`


const Contents = styled.div`
`


const WriteWrapper = styled.div`
    border-top:1px solid gray;
    padding-top:10px;
`

const ImgList = styled.ul`
    margin-top : 10px;
    & > li {
        float : left;
        margin-right : 5px;
    }
    & > li > img { 
        width : 50px;
        height : 50px;
    }
`

export default ReviewTab;