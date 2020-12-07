import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const Checkbox = ({ checked, ...rest }) => {
  return (
    <div>
      <CheckBoxLabel>
        <CheckBoxInput type="checkbox" checked={checked} {...rest} />
        <CheckBoxIcon checked={checked}>
          <svg width="12px" height="10px" viewbox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </CheckBoxIcon>
        <CheckBoxText checked={checked}>이용약관이랑 개인정보</CheckBoxText>
      </CheckBoxLabel>
    </div>
  );
}

const wave = keyframes`
  50% {
    transform: scale(0.9);
  }
`

const CheckBoxSpan = styled.span`
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
`

const CheckBoxIcon = styled(CheckBoxSpan)`
  position: relative;
  width: 24px;
  height: 24px;
  transform: scale(1);
  vertical-align: middle;
  border: 1px solid #9098A9;
  transition: all 0.2s ease;

  & > svg {
    position: absolute;
    top: 6px;
    left: 5px;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    background: black;
    display: block;
    transform: scale(0);
    opacity: 1;
    border-radius: 50%;
  }

  ${props => props.checked === true &&
  css`
    background: black;
    border-color: black;
    animation: ${wave} 0.4s ease;

    & > svg {
      stroke-dashoffset: 0;
    }

    &:before {
      transform: scale(3.5);
      opacity: 0;
      transition: all 0.6s ease;
    }
  `}
`

const CheckBoxLabel = styled.label`
  margin: auto;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  font-size : 18px;
  font-weight : 700;
  position : relative;
`

const CheckBoxText = styled(CheckBoxSpan)`
  padding-left: 8px;
  position : absolute;
  line-height : 100%;
  width : 200px;
  bottom : 3px;
  ${props => props.checked === true &&
  css`
  `}
`

const CheckBoxInput = styled.input`
  display : none;
`

export default Checkbox;