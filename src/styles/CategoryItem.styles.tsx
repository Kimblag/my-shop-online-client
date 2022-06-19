import styled from 'styled-components'

export const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`
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
    font-size: 3.5rem;
`
export const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: #fff;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`