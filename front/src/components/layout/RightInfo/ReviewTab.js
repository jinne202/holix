import React, { useState, useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from 'hooks/useInput';
import styled, { css } from 'styled-components';
import StarRatings from 'components/buttons/star-ratings';

const ReviewLayout = ({id, list}) => {

    return (
        <TabWrapper>
            <ListWrapper>
                {
                    list.map((item, index) => {
                        return (
                            <ItemWrapper>
                                <ProfileWrapper>
                                    <ProfileImg>

                                    </ProfileImg>
                                    <NickName>
                                        {item.account}
                                    </NickName>
                                </ProfileWrapper>
                                <ConetentsWrapper>
                                    <Rating>
                                        <StarRatings
                                        rating={item.point}
                                        starRatedColor="#FF730E"
                                        numberOfStars={5}
                                        starDimension="20px"
                                        starSpacing="1px"/>
                                    </Rating>
                                    <Title>
                                        {item.title}
                                    </Title>
                                </ConetentsWrapper>
                            </ItemWrapper>
                        )
                    })
                }
            </ListWrapper>
        </TabWrapper>
    )
}

const TabWrapper = styled.div`
    width:100%;
    overflow-y:scroll;
`
const ListWrapper = styled.div`
    height: auto;
    overflow:scroll;
`

const ItemWrapper = styled.div`
    padding-bottom : 10px;
    border-bottom : 0.5px solid gray;
    height: auto;
    overflow:auto;
`

const ProfileWrapper = styled.div`
    display:inline-block;
    padding-right: 5px;
    width : 50px;
    height: 50px;
    overflow: hidden;
    border-right : 1px solid gray;
    float: left;
`

const ProfileImg = styled.img`
`

const ConetentsWrapper = styled.div`
    display:inline-block;
    float : left;
`

const NickName = styled.div`
    font-size: 9px;
`

const Title = styled.div`
    font-weight:500;
`

const Rating = styled.div`
`


export default ReviewLayout;