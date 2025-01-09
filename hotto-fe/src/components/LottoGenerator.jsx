import React, { useState } from 'react';
import styled from "styled-components";
import LottoCard from './draw/LottoDraw';
import LottoResults from './draw/LottoResults';
import LottoManual from './draw/LottoManual';

const LottoGenerator = () => {
    return (
        <Container>
            <LottoResults />
            <LottoCard />
            <LottoManual />
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
