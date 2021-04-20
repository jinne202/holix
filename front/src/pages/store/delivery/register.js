import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { useRouter, withRouter  } from "next/router";
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { LOAD_DELIVERYS_REQUEST } from '../../../reducers/deliveryReducer';

const DeliveryRegister = () => {
    const router = useRouter();
    const {deliveryList, isLoading} = useSelector(state => state.deliveryReducer);
    const dispatch = useDispatch();
    const [name, onChangeName] = useInput('');
    const [reciever, onChangeReciever] = useInput('');
    const [firstNumber, onChangeFirstNumber] = useInput('');
    const [middleNumber, onChangeMiddleNumber] = useInput('');
    const [lastNumber, onChangeLastNumber] = useInput('');
    const [zipCode, setZipCode] = useState('');
    const [address, setAddress] = useState('');
    const [remainAddress, onChangeRemainAddress] = useInput('');
    const [phoneNumber, onChangePhoneNumber] = useInput('');
    const [isBasic, setBasic] = useState(false);
    const [showAddressBox, setShowAddressBox] = useState(false);

    const hadleShowAdressBox = () => {
        setShowAddressBox(!showAddressBox);
    }

    const handleAddress = (data) => {
        console.log(data);
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setZipCode(data.zonecode);
        setAddress(fullAddress);
        setShowAddressBox(false);
    }
    const handleSubmit = () => {
        console.log(firstNumber);
    }
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
                                <th>배송지명</th>
                                <td><input fw-label="배송지명" type="text" value={name} onChange={onChangeName}/></td>
                           </tr>
                            <tr>
                                <th>성명 </th>
                                <td><input fw-label="성명" type="text" value={reciever} onChange={onChangeReciever}/></td>
                            </tr>
                            <tr>
                                <th scope="row">주소 </th>
                                <td>
                                    <input fw-label="우편번호" readOnly={true} maxlength="14" type="text" value={zipCode}/>                            
                                    <button onClick={hadleShowAdressBox}>우편번호</button><br/>
                                    { showAddressBox ?
                                        <DaumPostcode onComplete={handleAddress} style={{
                                            position:'absolute',
                                            width:'40%',
                                            zIndex:99,
                                            left:'50%',
                                            transform: `translateX(-50%)` 
                                        }} height='50vh'/>
                                        : <></>
                                    }
                                    <input fw-label="주소" readOnly={true} type="text" value={address}/> 기본주소<br/>
                                    <input fw-label="주소" type="text" value={remainAddress} onChange={onChangeRemainAddress}/> 나머지주소<span class="" >(선택입력가능)</span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">휴대전화
                                </th>
                                 <td>
                                    <select id="ma_rcv_mobile_no1" fw-label="휴대전화" fw-alone="N" onChange={onChangeFirstNumber}>
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="017">017</option>
                                        <option value="018">018</option>
                                        <option value="019">019</option>
                                    </select>-<input fw-label="휴대전화" fw-alone="N" type="text" value={middleNumber} onChange={onChangeMiddleNumber}/>-<input maxlength="4" fw-label="휴대전화" fw-alone="N" type="text"  value={lastNumber} onChange={onChangeLastNumber}/>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><input fw-label="기본 배송지로 저장" value="T" type="checkbox" /><label>기본 배송지로 저장</label>
                                </td>
                            </tr>
                            </tbody>
                    </List>
                </ListWrapper>
            </Contents>
            <Footer>
                <SubmitButton onClick={handleSubmit}>
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

    & > tbody > tr > th {
        padding: 9px 0 8px 10px;
        border: 1px solid #dfdfdf;
        border-left: 0;
        border-bottom-width: 0;
        color: #353535;
        text-align: left;
        font-weight: normal;
        background-color: #fbfafa;
    }

    & > tbody > tr > td {
        padding: 5px 10px 4px;
        border-top: 1px solid #dfdfdf;
        color: #353535;
        vertical-align: middle;
        word-break: break-all;
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

export default DeliveryRegister;