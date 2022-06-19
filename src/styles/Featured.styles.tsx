import styled from "styled-components"

export const Container = styled.div`
    width: calc(100% - 66px);
    max-width: 1366px;
    margin: auto auto 40px;
    padding: 0 33px;
`

export const Title = styled.h2`
    font-weight: 600;
    font-size: 25px;
    padding-top: 48px;
`

export const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const Card = styled.div`
    width: calc(50% - 19px);
    position: relative;
    margin-top: 25px;
    border: 2px solid #d1d1d1;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 20px;
`

export const CardContent = styled.div`
    padding: 9% 0 0 7%;
`
export const ImageContainer = styled.div`
    text-align: center;
`
export const Text = styled.h3`
    font-weight: 600;
    font-size: 25px;
`
export const Paragraph = styled.p`
    padding-top: 17px;
    font-size: 18px;
    color: #2e2e2e;
`
export const ImageCard = styled.div`
    margin-top: 42px;
    margin-right: 42px;
`
export const ImageCardInner = styled.div`
    overflow: hidden;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    width: 230px;
    height: 264px;
`
export const Image = styled.img`
    position: absolute;
    inset: 0px;
    box-sizing: border-box;
    padding: 0px;
    border: none;
    margin: auto;
    display: block;
    /* width: 0px;
    height: 0px; */
    min-width: 100%;
    max-width: 100%;
    /* min-height: 100%;
    max-height: 100%; */
`

// export const Button = styled.a`
//     height: 48px;
//     border: 2px solid #000;
//     padding: 10px;
//     -webkit-justify-content: center;
//     -moz-box-pack: center;
//     justify-content: center;
//     -webkit-align-items: center;
//     -moz-box-align: center;
//     align-items: center;
//     text-decoration: none;
//     color: #000;
//     font-weight: 500;
//     -webkit-transition: all .2s ease-in-out;
//     transition: all .2s ease-in-out;
//     border-radius: 10px;

//     &:hover{
//         background-color: #000;
//         color: #fff;
//     }
// `

export const Button = styled.button`
    --color: #ffffff;
    --color2: rgb(10, 25, 30);
    padding: 0.8em 1.75em;
    background-color: transparent;
    border-radius: 6px;
    border: .3px solid rgb(10, 25, 30);
    transition: .5s;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    z-index: 1;
    font-weight: 300;
    font-size: 17px;
    font-family: 'Roboto', 'Segoe UI', sans-serif;
    text-transform: uppercase;
    color: rgb(10, 25, 30);

    &::after, &::before{
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        transform: skew(90deg) translate(-50%, -50%);
        position: absolute;
        inset: 50%;
        left: 25%;
        z-index: -1;
        transition: .5s ease-out;
        background-color: rgb(10, 25, 30);
    }

    &::before{
        top: -50%;
        left: -25%;
        transform: skew(90deg) rotate(180deg) translate(-50%, -50%);
    }

    &:hover::before{
        transform: skew(45deg) rotate(180deg) translate(-50%, -50%);
    }
    &:hover::after{
        transform: skew(45deg) translate(-50%, -50%);
    }
    &:hover{
        color: #ffffff
    }
    &:active {
    filter: brightness(.7);
    transform: scale(.98);
   }
`