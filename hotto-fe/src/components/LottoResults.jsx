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
      
    return (
        <Container>
            <Header>
                <Title>
                    {drawNumber}회 당첨 번호
                    <Subtitle>추첨일: {drawDate}</Subtitle>
                </Title>
            </Header>
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
    width: 100%; 
    margin: 0 auto;
    padding: 20px;
`;

const Header = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    margin: 0 0 5px 0;
`;

const Subtitle = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0;
`;

const Numbers = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%; /* 부모 컨테이너와 동일한 너비 */
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
`;

const BonusBall = styled(Ball)`
    background-color: #ffcc00;
`;

const PlusSign = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin: 0 10px;
    color: #333;
`;


const Message = styled.div`
    text-align: center;
    font-size: 18px;
`;
