import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { useRouter, withRouter  } from "next/router";
import { loadTossPayments } from '@tosspayments/sdk';
import DaumPostcode from 'react-daum-postcode';
import StoreTopMenu from "../../components/store/StoreTopMenu";
import StoreFooter from "../../components/store/StoreFooter";

const clientKey = 'test_ck_D4yKeq5bgrpQjbZAOop8GX0lzW6Y';

const imageHost = "https://holix.s3.ap-northeast-2.amazonaws.com/image/";
const Order = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { myAccountInfo } = useSelector((state) => state.userReducer);
    const product = JSON.parse(localStorage.getItem('product'));
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
    const totalPrice = localStorage.getItem("totalPrice")
    const [optionDelCheck, setOptionDelCheck] = useState([]);
    const [address, setAddress] = useState("");
    const [remainingAddress, setRemainingAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [showAddressBox, setShowAddressBox] = useState(false);
    const [emailHost, setEmailHost] = useState("");
    var tossPayments = null;
    var isLoaded = false;
    useEffect(() => {
        async function loadPayments() {
            tossPayments = await loadTossPayments(clientKey);
            console.log(tossPayments);
        }
        loadPayments()
      }, [])


    const handlePayment = () => {
        console.log(tossPayments);
        tossPayments.requestPayment('카드', {
            amount: Number(totalPrice),
            orderId: 'tn1jYc9N_ewJr7wttTKFc',
            orderName: product.title,
            customerName: '테스터',
            successUrl: 'http://localhost:8080/store/order',
            failUrl: 'http://localhost:8080/store/orderfail',
          });
    }

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
    
    const handleEmail = (e) => {
        setEmailHost(e.target.value);
    }

    return (
        <>
            <StoreTopMenu/>
            <ContentsWrapper>
                <OrderTitleLabel><h2>주문서작성</h2></OrderTitleLabel>
                <AccountInfoWrapper>
                    <AccountInfoLabel>
                        혜택정보
                    </AccountInfoLabel>
                    <AccountInfo>
                        { myAccountInfo ?
                            <>
                                <AccountGrade><strong>{myAccountInfo.nickname}</strong> 님은, [{myAccountInfo.buyerGrade}] 회원이십니다.</AccountGrade>
                                <AccountMoney>가용적립금 : <strong style={{color:'#008bcc'}}>{myAccountInfo.point}원</strong>  예치금 :<strong style={{color:'#008bcc'}}>{myAccountInfo.deposit}원</strong>   쿠폰<strong style={{color:'#008bcc'}}> 0개</strong></AccountMoney>
                            </>
                        : 
                            <></>
                        }
                    </AccountInfo>
                </AccountInfoWrapper>
                <OrderListWrapper>
                    <OrderListTable>
                        <caption>국내배송상품 주문내역</caption>
                        <thead>
                            <tr>
                                <th><input type="checkbox"/></th>
                                <th>이미지</th>
                                <th>상품정보</th>
                                <th>판매가</th>
                                <th>수량</th>
                                <th>적립금</th>
                                <th>배송구분</th>
                                <th>배송비</th>
                                <th>합계</th>
                            </tr>
                        </thead>
                        <tbody>
                            { selectedOptions.map((o) => {
                                var option, optionPrice;
                                if (o.groupid != -1) {
                                    option = product.optionGroups.find(g => g.id === o.groupid).options.find(option => option.id === o.id);
                                    optionPrice = o.count * ((o.necessary ? product.price : 0) + option.addprice);
                                } else {
                                    optionPrice = o.count * product.price;
                                }
                                return (
                                    <tr>
                                        <td><input type="checkbox"/></td>
                                        <td><img src ={imageHost+product.id+"_thumnail.png"} style={{width:'129px'}}/></td>
                                        <td>
                                            <div style={{fontSize:'20px', fontWeight:'bold'}}>{product.title}</div>
                                            {
                                                o.groupid != -1 ?
                                                <div style={{fontSize:'14px', color:'#949494'}}>[옵션] {option.name}</div>
                                                :
                                                <></>
                                            }
                                        </td>
                                        <td><strong>{optionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</strong></td>
                                        <td>{o.count}</td>
                                        <td>{optionPrice / 1000}</td>
                                        <td>기본배송</td>
                                        <td>[조건]</td>
                                        <td>{optionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>[기본배송]</td>
                                <td colspan="8">상품구매금액 <strong>{totalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>+ 배송비 0 = 합계: <h2>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</h2></td>
                            </tr>
                        </tfoot>
                    </OrderListTable>
                   {/* <OrderListDelWrapper>
                        선택상품을
                        <OrderDelButton>
                            삭제하기
                        </OrderDelButton>
                   </OrderListDelWrapper>*/}
                </OrderListWrapper>
                <DeliveryInfoWrapper>
                    <DeliveryTable>
                        <caption>
                            배송정보
                            <span>필수정보입력사항</span>
                        </caption>
                        <tbody>
                            <tr>
                                <td>받으시는 분</td>
                                <td><input type="text"/></td>
                            </tr>
                            <tr>
                                <td>주소</td>
                                <td>
                                    <input type="text" value={zipCode} style={{width:'60px'}}/><button onClick={hadleShowAdressBox} style={{marginLeft:'5px'}}>우편번호</button>
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
                                    <br/>
                                    <input type="text" value={address} style={{width:'400px',marginTop:'5px'}}/>
                                    <AddressGuideLabel>기본 주소</AddressGuideLabel>
                                    <br/>
                                    <input type="text" style={{width:'400px',marginTop:'5px'}} value={remainingAddress} onChange={(e) => {setRemainingAddress(e.target.value)}}/>
                                    <AddressGuideLabel>나머지 주소</AddressGuideLabel>
                                    <br/>
                                </td>
                            </tr>
                            <tr>
                                <td>휴대전화</td>
                                <td><input type="text" style={{width:'60px'}}/>-<input type="text" style={{width:'80px'}}/>-<input type="text" style={{width:'80px'}}/></td>
                            </tr>
                            <tr>
                                <td>이메일</td>
                                <td>
                                    <input type="text"/> @ <input type="text" value={emailHost} onChange={handleEmail}/>
                                    <select fw-label="주문자 이메일" fw-alone="N" onChange={handleEmail}>
                                        <option value="" selected="selected">- 이메일 선택 -</option>
                                        <option value="naver.com">naver.com</option>
                                        <option value="daum.net">daum.net</option>
                                        <option value="nate.com">nate.com</option>
                                        <option value="hotmail.com">hotmail.com</option>
                                        <option value="yahoo.com">yahoo.com</option>
                                        <option value="empas.com">empas.com</option>
                                        <option value="korea.com">korea.com</option>
                                        <option value="dreamwiz.com">dreamwiz.com</option>
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="">직접입력</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>배송메시지</td>
                                <td><textarea  style={{width:'400px', height:'100px'}}/></td>
                            </tr>
                        </tbody>
                    </DeliveryTable>
                </DeliveryInfoWrapper>
                <OrderPriceWrapper>
                    <OrderPriceTable>
                        <caption>결제예상금액</caption>
                        <tr>
                            <td>총 주문 금액</td>
                            <td>총 할인 + 부가결제 금액</td>
                            <td>총 결제예정 금액</td>
                        </tr>
                        <tr>
                            <td>{totalPrice}원</td>
                            <td>- 0원</td>
                            <td>{totalPrice}원</td>
                        </tr>
                    </OrderPriceTable>
                    <OrderTotalPriceTable>
                        <tr>
                            <th>총 할인금액</th>
                            <td>0원</td>
                        </tr>
                        <tr>
                            <th>총 부가결제금액</th>
                            <td>{totalPrice}원</td>
                        </tr>
                    </OrderTotalPriceTable>
                </OrderPriceWrapper>
                <PaymentWrapper>
                    <PayButton onClick={handlePayment}>결제하기</PayButton>
                </PaymentWrapper>
            </ContentsWrapper>
            <StoreFooter/>
        </>
    )
}

const ContentsWrapper = styled.div`
    width : 1296px;
    height: auto;
    margin: 30px auto;
`

const OrderTitleLabel = styled.div`
    min-height: 30px;
    margin: 50px 0 20px;
    border-bottom: 0;
    text-align: left;
`

const AccountInfoWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    border: 5px solid #e8e8e8;
    color: #404040;
    display: table;
    table-layout: fixed;
    padding: 10px 0;
    width: 100%;
    box-sizing: border-box;
`

const AccountInfoLabel = styled.div`
    vertical-align: middle;
    display: table-cell;
    padding: 0 15px;
    width: 86px;
    text-align: center;
`

const AccountInfo = styled.div`
    display: table-cell;
    padding: 0 10px;
    width: auto;
    line-height: 1.5em;
    border-left: 1px solid #e8e8e8;
    vertical-align: middle;
`

const AccountGrade = styled.div`

`

const AccountMoney = styled.div`
    margin: 6px 0 0;
    padding: 10px 0 0;
    border-top: 1px solid #e8e8e8;
`

const OrderListWrapper = styled.div`
`

const OrderListTable = styled.table`
    border: 1px solid #d7d5d5;
    width : 100%;
    margin-top : 30px;
    border-spacing: 0px;
    text-align:center;
    & > caption {
        position: relative;
        height: 38px;
        margin: 0;
        padding: 0 0 0 9px;
        border: 1px solid #d7d5d5;
        border-bottom:0;
        line-height: 38px;
        background: #f6f6f6;
    }
    & > thead > tr > th {
        border-left: 0;
        padding: 11px 0 10px;
        border-bottom: 1px solid #dfdfdf;
        border-right:  1px solid #dfdfdf;
        color: #353535;
        vertical-align: middle;
        font-weight: bold;
        background: #fbfafa;
        margin :0;

    }

    & > tfoot {
        background: #f6f6f6;
    }
    & > tfoot > tr > td:last-child {
        text-align:right;
    }
    & > tfoot > tr > td > h2 {
        display:inline-block;
    }
`


const OrderListDelWrapper = styled.div`
    padding: 10px 0 50px;
    
`

const OrderDelButton = styled.button`
    display: inline-block;
    box-sizing: border-box;
    padding: 2px 8px;
    margin-left : 10px;
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
    background-color: #84868b;
`

const DeliveryInfoWrapper = styled.div`
    border-top: 1px black solid;
`
const DeliveryTable = styled.table`
    margin-top: 20px;
    width:100%;
    border-spacing: 0px;

    & > caption {
        vertical-align: middle;
        color: #353535;
        font-size: 20px;
        font-weight:bold;
        text-align:left;
        height:50px;
    }
    & > caption > span {
        font-size: 14px;
        text-align:right;
        float:right;
        font-weight:normal;
    }
    & > thead > tr {
        height: 41px;
    }

    & > thead > tr:first-child {
    }

    & > tbody > tr > td {
        border-bottom : 1px solid #dfdfdf;
    }

    & > tbody > tr > td:first-child {
        background:#fbfafa;
        width:139px;
        padding : 11px 0 10px 18px;
        border-right: 1px solid #dfdfdf;
    }

    & > tbody > tr > td:last-child {
        padding: 8px 10px 7px;
    }
`
const AddressGuideLabel = styled.span`
    color:#707070;
    font-size:11px;
    margin-left:10px;
`
const OrderPriceWrapper = styled.div`
    margin: 40px 0 10px 10px;
`

const OrderPriceLabel = styled.div`
`

const OrderPriceTable = styled.table`
    width:100%;
    border: 1px solid #777;
    border-spacing: 0px;

    & > caption {
        vertical-align: middle;
        color: #353535;
        font-size: 20px;
        font-weight:bold;
        text-align:left;
        height:40px;
    }

    & > tr {
        height: 39px;
        text-align:center;
    }

    & > tr:first-child {
        background: #fbfafa;
    }

    & > tr > td{
        border-bottom: 1px solid #dfdfdf;
        border-right: 1px solid #dfdfdf;
        margin:0;
    }

    & > tr:last-child > td{
        font-size: 23px;
    }
`
const OrderTotalPriceTable = styled.table`
    margin-top:20px;
    width:100%;
    color:#353535;
    & > tr > td {
        background: #fbfafa;
        height:60px;
        font-size:14px;
        font-weight:bold;
        padding-left:10px;
    }
    & > tr > th {
        width:180px;
        padding: 11px 0 10px 18px;
        border-bottom: 1px solid #dfdfdf;
        border-right: 1px solid #dfdfdf;
    }
`

const PaymentWrapper = styled.div`
    margin-top:80px;
    text-align:center;
`

const PayButton = styled.button`
    display: inline-block;
    width: 40%;
    height: 90px;
    box-sizing: border-box;
    padding: 2px 8px;
    margin-left : 10px;
    border: 1px solid transparent;
    border-radius: 2px;
    font-family: "굴림",Gulim;
    font-size: 30px;
    line-height: 18px;
    font-weight: normal;
    text-decoration: none;
    vertical-align: middle;
    word-spacing: -0.5px;
    letter-spacing: 0;
    text-align: center;
    white-space: nowrap;
    color: #fff;
    background-color: #84868b;
`

export default withRouter(Order);