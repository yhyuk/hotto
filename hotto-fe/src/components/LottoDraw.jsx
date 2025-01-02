import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid'; // uuid 생성 라이브러리

const LottoCard = () => {
    const [cards, setCards] = useState([{ numbers: Array(6).fill('?'), id: uuidv4(), registered: new Date().toISOString() }]); // 초기 1개의 카드
    const [error, setError] = useState(null);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // 모든 카드의 번호 생성 함수
    const fetchLottoNumbers = async () => {
        try {
            const newCards = await Promise.all(
                cards.map(async (card) => {
                    const response = await axios.get('http://localhost:8080/lotto');
                    // 새로 번호를 받으면, 새로운 uuid를 생성하여 저장
                    return { 
                        ...card, 
                        id: uuidv4(), // 새로운 uuid로 업데이트
                        numbers: response.data.numbers, // 추첨된 번호로 업데이트
                        registered: formatDate(new Date()) // 등록 시간을 새로 업데이트
                    };
                })
            );
            setCards(newCards); // 모든 카드 업데이트
            setError(null);
        } catch (err) {
            setError('Failed to fetch lotto numbers');
        }
    };

    // 카드 추가 함수
    const addCard = () => {
        if (cards.length < 5) {
            setCards((prevCards) => [
                ...prevCards,
                { numbers: Array(6).fill('?'), id: uuidv4(), registered: new Date().toISOString() },
            ]);
        } else {
            alert('최대 5개까지만 생성할 수 있습니다.');
        }
    };

    // 카드 삭제 함수
    const removeCard = (id) => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    };    

    // 로컬 스토리지에 카드 번호 저장
    const saveLottoNumbersToLocalStorage = (cardId, numbers) => {
        const registered = formatDate(new Date()); // 현재 시간을 yyyy-mm-dd HH:MM:ss 형식으로 저장
        const cardData = {
            id: cardId,
            numbers: numbers,
            registered: registered,
        };
        localStorage.setItem(`lottoCard-${cardId}`, JSON.stringify(cardData)); // cardId를 키로 사용하여 로컬스토리지에 저장
    };

    // 저장 버튼 클릭 시 호출되는 함수
    const handleSave = (cardId, numbers) => {
        if (numbers.includes('?')) {
            alert('번호를 추첨해야만 저장할 수 있습니다.');
            return;
        }
    
        saveLottoNumbersToLocalStorage(cardId, numbers); // 해당 카드 번호만 저장
        alert(`카드 ${cardId} 번호가 저장되었습니다!`);
    };

    return (
        <Container>
            <Header>
                <Title>행운의 번호 추첨</Title>
                <div>
                    <DefaultButton onClick={addCard}>추가</DefaultButton>
                    <DrawButton onClick={fetchLottoNumbers}>추첨</DrawButton>
                </div>
            </Header>
            {cards.map((card, index) => (
                <CardContainer key={card.id}>
                    <Card>
                        {card.numbers.map((number, idx) => (
                            <Ball key={idx}>{number}</Ball>
                        ))}
                    </Card>
                    {index > 0 && ( // 첫 번째 카드는 삭제 버튼 표시하지 않음
                        <DeleteButton onClick={() => removeCard(card.id)}>삭제</DeleteButton>
                    )}
                    <SaveButton onClick={() => handleSave(card.id, card.numbers)}>저장</SaveButton>
                </CardContainer>
            ))}
            {error && <p className="error">{error}</p>}
        </Container>
    );
};

export default LottoCard;

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

const DrawButton = styled.button`
    font-size: 14px;
    padding: 8px 8px;
    margin-left: 8px;
    color: #fff;

    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;
    
    &:hover {
        background-color: blue;
    }
`;

const SaveButton = styled.button`
    font-size: 14px;
    padding: 8px 8px;
    margin-left: 8px;
    color: #fff;
    background-color: forestgreen;

    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;
    
    &:hover {
        background-color: darkgreen;
    }
`;

const DefaultButton = styled.button`
    font-size: 14px;
    padding: 8px 8px;
    margin-left: 8px;
    color: #fff;
    background-color: gray;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;
    
    &:hover {
        background-color: black;
    }
`;

const DeleteButton = styled.button`
    font-size: 14px;
    padding: 8px 8px;
    margin-left: 12px;
    // margin-bottom: 12px;
    color: #fff;
    background-color: orange;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;
    
    &:hover {
        background-color: coral;
    }
`;

const Title = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`;

const CardContainer = styled.div`
    margin-bottom: 12px;
    display: flex;
    flex-direction: row; /* 카드와 삭제 버튼을 가로로 배치 */
    align-items: center;  /* 카드와 버튼을 세로로 중앙 정렬 */
    justify-content: space-between; /* 공간을 양옆으로 분배 */
`;

const Card = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    // justify-content: center;
    // padding: 15px;
    // border-radius: 8px;
    // box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    // box-sizing: border-box;
`;

const Ball = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #f0f0fe;
    margin: 0 5px;
    font-size: 18px;
    font-weight: bold;
    box-sizing: border-box;
`;
