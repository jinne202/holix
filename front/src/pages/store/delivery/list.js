import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, withRouter  } from "next/router";
import styled from 'styled-components';
import { LOAD_DELIVERYS_REQUEST } from '../../../reducers/deliveryReducer';

const DeliveryList = () => {
    const router = useRouter();
    const {deliveryList, isLoading} = useSelector(state => state.deliveryReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
          type: LOAD_DELIVERYS_REQUEST,
        });
    }, []);

    return (
        <>
            <Header>
                배송 주소록 관리
            </Header>
            <Contents>
                <Guide>
                <GuildLabel>배송주소록 유의사항</GuildLabel>
                <div style={{padding:'0 9px 12px', margin:'0'}}>
                    <ul style={{margin:'15px 0 0 11px'}}>
                        <li>배송 주소록은 최대 10개까지 등록할 수 있으며, 별도로 등록하지 않을 경우 최근 배송 주소록 기준으로 자동 업데이트 됩니다.</li>
                        <li>자동 업데이트를 원하지 않을 경우 주소록 고정 선택을 선택하시면 선택된 주소록은 업데이트 대상에서 제외됩니다.</li>
                        <li>기본 배송지는 1개만 저장됩니다. 다른 배송지를 기본 배송지로 설정하시면 기본 배송지가 변경됩니다.</li>
                    </ul>
                </div>
                </Guide>
                <ListWrapper>
                    <List>
                        <caption>배송 주소지 목록</caption>
                        <tbody>
                        <tr>
                                <td><span class="displaynone"><input type="checkBox" /></span></td>
                                <td>주소록 고정</td>
                                <td>배송지명</td>
                                <td>수령인</td>
                                <td>일반전화</td>
                                <td>휴대전화</td>
                                <td>주소</td>
                                <td>배송지관리</td>
                            </tr>
                        </tbody>
                    </List>
                </ListWrapper>
            </Contents>
            <Footer>
                <SubmitButton>
                    배송지 등록
                </SubmitButton>
            </Footer>
        </>
    )
}
const Header = styled.div`
    padding: 12px 35px 12px 19px;
    color: #fff;
    background: #495164;
`

const Contents = styled.div`
    padding: 20px;
    font-size: 12px;
`
const Guide = styled.div`
    margin: 0 0 20px 0;
    border: 1px solid #d6d4d4;
    line-height: 18px;
`

const GuildLabel = styled.h2`
    margin: 0;
    padding: 9px 0 6px 10px;
    border-bottom: 1px solid #e8e7e7;
    color: #101010;
    font-size: 12px;
    background: #fbfbfb;
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

    & > tbody > tr > td {
        padding: 11px 0 10px;
        border-top: 1px solid #dfdfdf;
        border-left: 1px solid #dfdfdf;
        border-bottom: 1px solid #dfdfdf;
        color: #353535;
        vertical-align: middle;
        text-align: center;
        background: #fbfafa;
    }
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

export default DeliveryList;