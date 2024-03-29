import React from "react";
import Link from 'next/link';
import styled from "styled-components";

const ArchiveCardComponent = ({ archive }) => {
    const imageHost = "https://holix.s3.ap-northeast-2.amazonaws.com/image/archive/";
    const titleImages = archive.postingInfo.titleimages.split(',');
    let potingInfo = archive.postingInfo;
    let mainImage = titleImages.length > 0 ? <img src={imageHost + archive.archiveInfo.id + "/" + titleImages[0]}/> : <div style={{background : potingInfo.gradientcolor}}></div>

    const bottomColor = archive.gradientColor;
console.log( potingInfo)
    return (
            <StoryCardWrapper>
                <Link href={{ pathname: 'archive/' + archive.archiveInfo.id }}>
                <StoryCardUI>
                    <StoryCardImgWrapper bottomColor={bottomColor}>
                        {mainImage}
                        <StoryTitle>{potingInfo.title}</StoryTitle>
                    </StoryCardImgWrapper>
                </StoryCardUI>
                </Link>
                <StoryInfo>
                    <UserInfo>
                        <UserName>{potingInfo.account}</UserName>
                    </UserInfo>
                </StoryInfo>
            </StoryCardWrapper>
    )
}

const StoryCardUI = styled.div`
    position: relative;
    max-width : 450px;
    min-width : 250px;
	height: 0;
	overflow: hidden;
	padding-bottom: 75%;
`

const StoryCardWrapper = styled.div`
`

const StoryCardImgWrapper = styled.div`
    cursor : pointer;
    position: absolute;
    overflow : hidden;
    width : 100%;
    height : 100%;
    display : block;
	top: 0;
	left: 0;

    &:before {
        content:'';
        position: absolute;
        width: 100%;
        height: 40%;
        background: linear-gradient(to bottom, transparent, ${props => props.bottomColor || 'black'});
        z-index: 2;
        bottom: -40%;
        left: 0;
    }

    &:hover:before {
        transition: all .3s ease-in-out;
        bottom : 0;
    }

    &:hover {
        transition: all .3s ease-in-out;

        & > p {
            opacity: 1;
            /* transform: translate3d(0, -30px, 0); */
        }
    }

    & > img {
        width : 100%;
        height : 100%;
        object-fit: cover;
    }

    & > div {
        width : 100%;
        height : 100%;
    }
`
const StoryInfo = styled.div`
`

const StoryTitle = styled.p`
    font-size : 24px;
    font-weight : 700;
    position: absolute;
    color: #fff;
    z-index: 2;
    margin : 0 20px 0 20px;
    transition: opacity 0.2s, transform 0.7s;
    bottom: 40px;
    letter-spacing: 1px;
    opacity: 0;
    /* transform: translate3d(0, -10px, 0); */
`

const UserInfo = styled.div`
    display : flex;
    padding : 10px 0 0 10px;
    cursor : pointer;
`

const UserName = styled.p`
    font-size : 12px;
    margin : 0 8px;
    padding : 3px 0;
`

export default ArchiveCardComponent;