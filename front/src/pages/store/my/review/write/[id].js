import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../../../../../hooks/useInput';
import { useRouter, withRouter  } from "next/router";
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { LOAD_ORDER_REQUEST, WRITE_REVIEW_REQUEST } from 'reducers/storeReducer';

const WriteReview = () => {
    const router = useRouter();
    const {order, isLoading} = useSelector(state => state.storeReducer);
    const dispatch = useDispatch();
    const [title, onChangeTitle] = useInput('');
    const [contents, onChangeContents] = useInput('');
    const [files, setFiles] = useState([]);
    
    function isLoadedRouter() {
        return (Object.keys(router.query).length > 0);
    }

    const isLoadRouter = isLoadedRouter();
    useEffect(() => {
        if (!isLoadRouter) return;
        dispatch({
            type: LOAD_ORDER_REQUEST,
            id: router.query.id,
        });
    }, [isLoadRouter]);

    const handleFileUpload = (e) => {
        setFiles([...files, ...e.target.files]);
    };

    const handleSubmit = () => {
        console.log('dadas');
        console.log('dadas');
        return dispatch({
            type : WRITE_REVIEW_REQUEST,
            data : {
                id:router.query.id,
                title,
                contents,
            },
            files : files
        }, [title, contents, files]);
    }
    return (
        <>
        { order ? 
            <>
            <Header>
                구매후기<subHeader>구매후기 운영원칙</subHeader>
            </Header>
            <Contents>
                <ContentsHeader>
                    구매후기 쓰기
                </ContentsHeader>
                <ProductWrapper>
                    <ProductImgWrapper>
                        <img class="my-review__writable__image" src="https://thumbnail7.coupangcdn.com/thumbnails/remote/250x250ex/image/retail/images/2020/07/31/12/0/871edf53-c836-4efe-9e54-f14d0c289468.jpg" title="모가비 알루미늄 2단 접이식 폴딩 노트북 거치대 MOG-104, 실버" alt="모가비 알루미늄 2단 접이식 폴딩 노트북 거치대 MOG-104, 실버" />
                    </ProductImgWrapper>
                    <ProductInfo>
                        <ProductName>
                            { order.product.title }
                        </ProductName>
                        <ProductOption>
                            {
                                order.product.optionGroups.find(og => og.id === order.selectOptionGroup).options.find(oo => oo.id === order.selectOption).name
                            }
                        </ProductOption>
                        <ProductDeliveryDate>

                        </ProductDeliveryDate>
                    </ProductInfo>
                </ProductWrapper>
                <ListWrapper>
                    <List>
                        <tbody>
                           <tr>
                                <th>제목</th>
                                <td><TextInput fw-label="제목" type="text" value={title} onChange={onChangeTitle}/></td>
                            </tr>
                            <tr>
                                <th>구매후기</th>
                                <td><TextArea value={contents} onChange={onChangeContents}/></td>
                            </tr>
                            <tr>
                                <th>사진첨부</th>
                                <td>
                                    <input type = "file" onChange={handleFileUpload} multiple={true} style={{width:'90px'}}/>
                                    <AttachCount>{files.length}/10</AttachCount>
                                    <AttachGuide>사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</AttachGuide>
                                </td>
                            </tr>
                            </tbody>
                    </List>
                </ListWrapper>
            </Contents>
            <Footer>
                <SubmitButton onClick={handleSubmit}>
                    등록하기
                </SubmitButton>
            </Footer>
            </>
            : <></>
        }
        </>
    )
}
const Header = styled.div`
    padding: 12px 35px 12px 19px;
    color: #fff;
    background: #495164;
`

const Contents = styled.div`
    border-top: 1px solid #111;
`
const ContentsHeader = styled.div`
    padding: 17px 20px;
    border-bottom: 1px solid #eee;
    line-height: 1.42857;
    color: #333;
`

const ProductWrapper = styled.div`
    border-bottom: 1px solid #111;
    padding: 20px 20px 20px 30px;
`

const ProductImgWrapper = styled.div`
    display: inline-block;
`
const ProductInfo = styled.div`
    display: inline-block;
    width: 430px;
    margin: 5px 20px 0px;
    vertical-align: top;
    position: relative;
`

const ProductName = styled.div`
    font-size: 14px;
    color: #111111;
    overflow: hidden;
    font-weight: bold;
    line-height: 17px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`

const ProductOption = styled.div`
    margin-top: 5px;
    font-size: 12px;
    line-height: 15px;
    font-weight: normal;
    color: #111;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

const ProductDeliveryDate = styled.div`
    margin-top: 32px;
    font-size: 12px;
    font-weight: normal;
    color: #888;
    line-height: 15px;
    letter-spacing: 0px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

const ListWrapper = styled.div`
`

const List = styled.table`
    margin-top: 0;
    border-top: 1px solid #d7d5d5;
    line-height: 1.4;
    position: relative;
    margin: 0 0 10px 0;
    border: 1px solid #d7d5d5;
    border-top: 0;
    color: #fff;
    width: 100%;
    border: 0;
    border-spacing: 0;
    border-collapse: collapse;

    & > tbody > tr > th {
        text-align: left;
        width: 120px;
        padding: 30px 20px;
        font-size: 14px;
        color: #111;
        font-weight: bold;
    }

    & > tbody > tr > td {
        padding-left: 20px;
        vertical-align: middle;
    }
`
const TextInput = styled.input`
    height: 28px;
    padding: 0 10px;
    border: 1px solid #ddd;
    line-height: 30px;
    outline: none;
    width: 90%;

`

const TextArea = styled.textarea`
    width: 100%;
    height: 146px;
    padding: 10px 0px;
    margin-bottom: 20px;
    border: none;
    color: #111;
    outline: none;
    resize: none;
    padding-left: 10px;
    border: 1px solid #ddd
`

const AttachCount = styled.span`
    padding-left: 10px;
    width: 77px;
    font-size: 12px;
    color: #111;
    font-weight: bold;
    display: inline-block;
`

const AttachGuide = styled.span`
    clear: both;
    padding-top: 10px;
    font-size: 12px;
    line-height: 15px;
    color: #888888;
    letter-spacing: 0px;
`

const Footer = styled.div`
    padding: 9px;
    border-top: 1px solid #d7d5d5;
    text-align: center;
    background: #fbfafa;
`

const SubmitButton = styled.button`
    width: 96px;
    padding: 6px 8px;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid transparent;
    border-radius: 2px;
    font-family: "굴림",Gulim;
    font-size: 12px;
    line-height: 18px;
    font-weight: normal;
    text-decoration: none;
    vertical-align: middle;
    word-spacing: -0.5px;
    letter-spacing: 0;
    text-align: center;
    white-space: nowrap;
    color: #fff;
    background-color: #4a5164;
`

export default withRouter(WriteReview);