import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const MyLotto = () => {
    const [lottoData, setLottoData] = useState([]); // 로컬스토리지에서 불러온 로또 번호

    // 로컬스토리지에서 로또 데이터를 불러오는 함수
    useEffect(() => {
        const storedData = localStorage.getItem("myLottoNumbers"); // myLottoNumbers 키에서 가져옴
        if (storedData) {
            setLottoData(JSON.parse(storedData)); // 파싱 후 상태에 저장
        }
    }, []);

    // 카드 삭제 함수
    const removeCard = (cardId) => {
        const updatedData = lottoData.filter((lotto) => lotto.id !== cardId); // 해당 ID 제거
        setLottoData(updatedData); // 상태 업데이트
        localStorage.setItem("myLottoNumbers", JSON.stringify(updatedData)); // 로컬스토리지 갱신
    };

    return (
        <Container>
            <Title>마이로또</Title>
            {lottoData.length === 0 ? (
                <p>저장된 로또 번호가 없습니다.</p>
            ) : (
                <CardList>
                    {lottoData.map((lotto,index) => (
                        <Card key={lotto.id}>
                            <CardHeader>
                                <CardTitle>행운의 번호</CardTitle>
                                <CardFooter>({lotto.registered})</CardFooter>
                            </CardHeader>
                            <CardNumberContainer>
                                <CardNumbers>
                                    {lotto.numbers.map((number, idx) => (
                                        <Ball key={idx}>{number}</Ball>
                                    ))}
                                </CardNumbers>
                                <DeleteButton onClick={() => removeCard(lotto.id)}>삭제</DeleteButton>
                            </CardNumberContainer>
                        
                        </Card>
                    ))}
                </CardList>
            )}
        </Container>
    );
};

export default MyLotto;

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

const Title = styled.h2`
    text-align: left;
    cursor: pointer;
    margin: 0;
    margin-bottom: 6px;

    &:hover {
        color: #0073e6;
    }
`;

const CardList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px; /* 카드 간격 */
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

    @media (max-width: 480px) {
        padding: 12px;
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

const CardTitle = styled.h3`
    font-size: 18px;
    margin: 0;
    color: #333;
    margin-right: 6px;

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

const CardNumberContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CardNumbers = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 8px;
`;

const Ball = styled.div`
    width: 42px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #f0f0fe;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    box-sizing: border-box;

    @media (max-width: 480px) {
        width: 36px;
        height: 36px;
        font-size: 16px;
    }
`;

const CardFooter = styled.div`
    font-size: 14px;
    color: #666;

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;

const DeleteButton = styled.button`
    font-size: 14px;
    padding: 10px;
    color: #fff;
    background-color: orange;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: coral;
    }

    @media (max-width: 480px) {
        padding: 8px;
    }
`;
