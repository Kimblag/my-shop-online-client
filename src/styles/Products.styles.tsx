import styled from 'styled-components';

export const Container = styled.div`
    margin: 2rem;
    display: grid;
    gap: 1rem;
    /* grid-template-columns: repeat(4, 1fr);
    justify-content: center; */
    grid-template-columns: repeat(auto-fit, 20rem);
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 600px){
        grid-template-columns: repeat((auto-fit, minmax(14rem, 16rem)));

    }
`
