import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StoreFooter = () => {
    return (
        <>
            <FooterWrapper>
                <FooterContents>
                    <LeftFooter>
                        <CSWrapper>
                            <PhoneNumber>
                                02-3144-0099
                            </PhoneNumber>
                            <CSGuide>
                                통화량이 많을 때는 Q&A 게시판을 이용해주세요.<br/>
                                MON-FRI 9:00 ~18:00, LUNCH 13:00 ~14:00 / SAT-SUN·HOLIDAY OFF<br/>
                                예금주:(주)제로나인즈 0000-00-000000<br/>
                            </CSGuide>
                        </CSWrapper>
                        <CompanyInfoWrapper>
                            <CompanyInfo>
                                COMPANY : ZERONINEZ<br/>
                                BUSINESS LICENSE : 563-88-01435 <a href="#none">[사업자정보확인]</a> <br/>
                                MAIL ORDER LICENSE : 2021-세종조치원-0013<br/>

                                            ADDRESS : 세종특별자치시 조치원읍 세종로 2639, 홍익대학교세종캠퍼스 U동 410<br/>
                                            BRIDGE-ADDRESS : 서울특별시 마포구 잔다리로 28, 7층<br/>
                                CHIEF PRIVACY OFFICER : 정상목<br/>
                                MAIL : topmok@naver.com<br/>

                                            CALL CENTER : 02-3144-0099<br/>
                            </CompanyInfo>
                            <CopyRightInfo>
                                ⓒ ZERONINEZ ALL RIGHTS RESERVED.
                            </CopyRightInfo>
                        </CompanyInfoWrapper>
                    </LeftFooter>
                    <RightFooter>

                    </RightFooter>
                </FooterContents>
            </FooterWrapper>
        </>

    )
}

const FooterWrapper = styled.div`
    width: 100%;
    background: #f6f6f6;
`
const FooterContents = styled.div`
    margin-left:10%;
    width:80%;
    text-align: left;
    background: #f6f6f6;
    display: flex;
`
const LeftFooter = styled.div`
    float: left;
    padding-top: 45px;
    padding-bottom: 45px;
`

const RightFooter = styled.div`
    float: right;
    padding-top: 45px;
`

const CSWrapper = styled.div`
`

const PhoneNumber = styled.div`
    font-size: 32px;
    font-weight: bold;
    line-height: 1;
`

const CSGuide = styled.div`
    font-size: 12px;
    color: #555;
    line-height: 17px;
    padding-top: 25px;
`

const CompanyInfoWrapper = styled.div`
    font-size: 11px;
    color: #888;
    line-height: 21px;
`

const CompanyInfo = styled.div`
    padding-top: 60px;
`

const CopyRightInfo = styled.div`
    padding-top: 40px;
`
export default StoreFooter;