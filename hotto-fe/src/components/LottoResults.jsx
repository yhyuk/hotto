import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const LottoResults = () => {
    const [lottoData, setLottoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // API 호출
        const fetchLottoData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/lotto/previous");
                setLottoData(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch lotto data.");
                setLoading(false);
            }
        };

        fetchLottoData();
    }, []);

    if (loading) return <Message>Loading...</Message>;
    if (error) return <Message>{error}</Message>;

    const {
        drwNo: drawNumber,
        drwNoDate: drawDate,
        drwtNo1: number1,
        drwtNo2: number2,
        drwtNo3: number3,
        drwtNo4: number4,
        drwtNo5: number5,
        drwtNo6: number6,
        bnusNo: bonusNumber
      } = lottoData;
      
    console.log(lottoData);
    return (
        <Container>
            <Title>{drawNumber}회 당첨 번호</Title>
            <Subtitle>추첨일: {drawDate} 오후 8시 30분</Subtitle>
            <Numbers>
                <Ball>{number1}</Ball>
                <Ball>{number2}</Ball>
                <Ball>{number3}</Ball>
                <Ball>{number4}</Ball>
                <Ball>{number5}</Ball>
                <Ball>{number6}</Ball>
                <PlusSign>+</PlusSign>
                <BonusBall>{bonusNumber}</BonusBall>
            </Numbers>
        </Container>
    );
};

export default LottoResults;

const Container = styled.div`
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
`;

const Subtitle = styled.p`
    font-size: 16px;
    margin-bottom: 20px;
    color: #666;
`;

const Numbers = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
`;

const Ball = styled.span`
    width: 40px;
    height: 40px;
    background-color: #ffd700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    color: #333;
`;

const PlusSign = styled.div`
    font-size: 24px; 
    font-weight: bold; 
    display: flex; 
    align-items: center;
    justify-content: center;
    margin: 0 10px; 
    color: #333; 
`;

const BonusBall = styled(Ball)`
    background-color: #ff6f61;
    color: #fff;
`;

const Message = styled.div`
    text-align: center;
    font-size: 18px;
`;
