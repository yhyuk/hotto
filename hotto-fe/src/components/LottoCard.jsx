import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";

const LottoCard = () => {
    const [numbers, setNumebers] = useState([]);
    const [error, setError] = useState(null);

    const fetchLottoNumbers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/lotto')
            setNumebers(response.data.numbers);
            setError(null);
        } catch (err) {
            setError('Faild to fetch lotto numbers');
        }
    };


    return (
        <Container>
            <Header>
                <Title>행운의 번호 추첨</Title>
                <button onClick={fetchLottoNumbers}>생성하기</button>  
            </Header>
            {numbers.length > 0 && 
                    <Numbers>
                        {numbers.map((number, index) => (
                            <Ball key={index}>{number}</Ball>
                        ))}
                    </Numbers>
            }
            {error && <p className="error">{error}</p>}
        </Container>
    );
};

export default LottoCard;

// Styled Components
const Container = styled.div`
    width: 100%; 
    margin: 0 auto;
    padding: 20px;
    overflow: hidden; /* 튀어나오는 요소 제거 */
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%; 
    margin-bottom: 20px;
    box-sizing: border-box;
`;

const Title = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`;

const Numbers = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    box-sizing: border-box;
`;

const Ball = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #f0f0f0;
    margin: 0 5px;
    font-size: 18px;
    font-weight: bold;
    box-sizing: border-box;
`;
