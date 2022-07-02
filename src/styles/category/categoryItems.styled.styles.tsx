import styled from "styled-components";

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(60%);
`
export const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const Title = styled.h1`
    color: #ffffff;
    margin-bottom: 20px;
    font-size: 2.8rem;
`
export const Button = styled.button`
    position: relative;
    font-size: 17px;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1em 2.5em;
    display: inline-block;
    border-radius: 6em;
    transition: all .2s;
    border: none;
    font-family: inherit;
    font-weight: 500;
    color: gray;
    background-color: white;
    cursor: pointer;
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    &:active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
    &::after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: 100px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: all .4s;
    }
    &::after {
        background-color: #fff;
    }
    &:hover::after {
        transform: scaleX(1.4) scaleY(1.6);
        opacity: 0;
    }
`