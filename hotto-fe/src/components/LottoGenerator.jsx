import React, { useState } from 'react';
import styled from "styled-components";
import LottoCard from './LottoDraw';
import LottoResults from './LottoResults';

const LottoGenerator = () => {
    return (
        <Container>
            <LottoResults />
            <LottoCard/>
        </Container>
    )
}

export default LottoGenerator;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    max-width: 450px; 
    width: 100%; 
    box-sizing: border-box;

    @media (max-width: 625px) {
        max-width: 425px;
    }
`;
