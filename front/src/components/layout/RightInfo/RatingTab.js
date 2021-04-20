import React, { useState, useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import StarRatings from 'components/buttons/star-ratings';
const RatingTab = ({ratingList}) => {
    console.log(ratingList)
    const [ratings, setRatings] = useState(new Array(ratingList.length));
    const changeRating = ( newRating, name ) => {
        ratings[name] = newRating;
        setRatings([...ratings])
      }

    return (
        <RatingWrapper>
            <RatingAverageWrapper>
                <RatingList>
                    <tbody>
                    { ratingList.map((r, index) => {
                        return (
                        <tr key={index}>
                            <th>{r.name}</th>
                            <td><StarRatings
                            rating={3.42}
                            starRatedColor="#FF730E"
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="5px"
                            /></td>
                        </tr>)
                    })}
                    </tbody>
                </RatingList>
            </RatingAverageWrapper>
            <UserRateWrapper>
                <RatingList>
                    <tbody>
                    { ratingList.map((r, index) => {
                        console.log(ratings[index])
                        return (
                        <tr key={index}>
                            <th>{r.name}</th>
                            <td>
                            <StarRatings
                            rating={ratings[index]}
                            starRatedColor="#FF730E"
                            changeRating={changeRating}
                            numberOfStars={5}
                            name={index}
                            starDimension="20px"
                            starSpacing="5px"
                            />
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </RatingList>
                <button>평가하기</button>
            </UserRateWrapper>
        </RatingWrapper>
    )
}

const RatingWrapper = styled.div`
    width:100%;
    overflow-y:scroll;
`

const RatingAverageWrapper = styled.div`
    padding: 10px 0;
    border-bottom : 1px solid gray;
`

const RatingList = styled.table`
    
`

const UserRateWrapper = styled.div`
    padding-top:30px;
`

export default RatingTab;
