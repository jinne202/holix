import React, {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
import { TweenMax } from "gsap";

const CustomCursorSample = () => {
    const [position, setPosition] = useState({mouseX: 0, mouseY: 0});
    const [linkHovered, setLinkHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        addEventListeners();
        handleLinkHoverEvents();
        return () => removeEventListeners();
    }, []);

   const addEventListeners = () => {
       document.addEventListener("mousemove", onMouseMove);
       document.addEventListener("mousedown", onMouseDown);
       document.addEventListener("mouseup", onMouseUp);
   };

   const removeEventListeners = () => {
       document.removeEventListener("mousemove", onMouseMove);
       document.removeEventListener("mousedown", onMouseDown);
       document.removeEventListener("mouseup", onMouseUp);
   };

   const onMouseMove = (e) => {
       setPosition({mouseX: e.clientX, mouseY: e.clientY});
   };

   const onMouseDown = () => {
       setClicked(true);
   }

   const onMouseUp = () => {
       setClicked(false);
   }

   const handleLinkHoverEvents = () => {
        document.querySelectorAll("a").forEach(el => {
            el.addEventListener("mouseover", () => setLinkHovered(true));
            el.addEventListener("mouseout", () => setLinkHovered(false));
        });
    };

   return (
       <div>
       <CursorPointer style={{left: `${position.mouseX}px`, top: `${position.mouseY}px`}} linkHovered={linkHovered} clicked={clicked}></CursorPointer>
       </div>
   )
}

const CursorPointer = styled.div`
    width: 40px;
    height: 40px;
    border: 1px solid #fefefe;
    border-radius: 100%;
    display : block;
    position: fixed;
    transition: all 150ms ease;
    transition-property:  opacity, background-color, transform, mix-blend-mode;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;

    ${props =>
    props.linkHovered === true &&
    css`
        transform: translate(-50%, -50%) scale(1.5);
        background-color: #fefefe;
    `}

    ${props =>
    props.clicked === true &&
    css`
        transform: translate(-50%, -50%) scale(0.9);
        background-color: #fefefe;
    `}
`

// const CursorFollower = styled.div`
//     width: 40px;
//     height: 40px;
//     border: 1px solid black;
//     border-radius: 100%;
//     position: fixed;
//     transform: translate(-50%, -50%);
//     pointer-events: none;
//     z-index: 9999;
// `

export default CustomCursorSample;