import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid'; 

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
            const updatedCards = [];
            
            for (const card of cards) {
                const response = await axios.get('https://luckyhotto.shop/api/lotto');
                const newCard = {
                    ...card,
                    id: uuidv4(),
                    numbers: response.data.numbers,
                    registered: formatDate(new Date()),
                };
                updatedCards.push(newCard);
            }
    
            setCards(updatedCards); // 최종적으로 업데이트
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

    // 로컬스토리지에 저장된 배열 가져오기
    const getStoredLottoNumbers = () => {
        const storedData = localStorage.getItem("myLottoNumbers");
        return storedData ? JSON.parse(storedData) : []; 
    };

    // 로컬 스토리지 번호 저장
    const saveLottoNumbersToLocalStorage = (cardId, numbers) => {
        const registered = formatDate(new Date()); 

        const existingData = getStoredLottoNumbers();

        const isDuplicate = existingData.some(
            (card) =>
                JSON.stringify(card.numbers) === JSON.stringify(numbers) 
        );
    
        if (isDuplicate) {
            alert("이미 저장된 번호입니다!");
            return false; 
        }
    
        const cardData = {
            id: cardId,
            numbers: numbers,
            registered: registered,
        };

        const updatedData = [...existingData, cardData];
        localStorage.setItem("myLottoNumbers", JSON.stringify(updatedData)); 
        return true;
    };

    // 단일 저장 버튼 handler
    const handleSave = (cardId, numbers) => {
        if (numbers.includes("?")) {
            alert("번호를 추첨해야만 저장할 수 있습니다.");
            return;
        }

        const success = saveLottoNumbersToLocalStorage(cardId, numbers); 
        if (success) {
            alert(`카드 ${numbers} 번호가 저장되었습니다!`);
        }
    };

    // 전체 저장 버튼 handler
    const handleSaveAll = () => {
        let savedCount = 0; 
        const existingData = getStoredLottoNumbers();
    
        const updatedData = [...existingData]; 
    
        for (const card of cards) {
            if (card.numbers.includes("?")) {
                alert("번호를 추첨해야만 저장할 수 있습니다.");
                return; 
            }
    
            const isDuplicate = existingData.some(
                (existingCard) =>
                    JSON.stringify(existingCard.numbers) === JSON.stringify(card.numbers)
            );
    
            if (isDuplicate) {
                continue;
            }
    
            const cardData = {
                id: card.id,
                numbers: card.numbers,
                registered: formatDate(new Date()),
            };
    
            updatedData.push(cardData);
            savedCount++;
        }
    
        localStorage.setItem("myLottoNumbers", JSON.stringify(updatedData));
    
        if (savedCount > 0) {
            alert(`${savedCount}개의 카드가 저장되었습니다.`);
        }
    };

    const getColorForNumber = (number) => {
        if (number <= 10) return "#fbc400"; // 1~10: Red
        if (number <= 20) return "#69c8f2"; // 11~20: Blue
        if (number <= 30) return "#ff7272"; // 21~30: Coral
        if (number <= 40) return "#aaa"; // 31~40: Gray
        return "#b0d840"; // 41~45: Green
    };
    
    return (
        <Container>
            <Header>
                <Title>행운의 번호</Title>
                <div>
                    {cards.length < 5 && (
                        <DefaultButton onClick={addCard}>추가</DefaultButton>
                    )}
                    <DrawButton onClick={fetchLottoNumbers}>추첨</DrawButton>
                    <SaveButton onClick={() => handleSaveAll()}>저장</SaveButton> {/* 상단 저장 버튼 추가 */}
                </div>
            </Header>
            {cards.map((card, index) => (
                <CardContainer key={card.id}>
                    <Card>
                        {card.numbers.map((number, idx) => (
                            <Ball key={idx} color={getColorForNumber(number)}>{number}</Ball>
                        ))}
                    </Card>
                    {index > 0 && ( 
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
    overflow: hidden; 
    margin-bottom: 26px;
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
    flex-direction: row; 
    align-items: center; 
    justify-content: space-between; 


    @media (max-width: 768px) { /* 태블릿 */
        justify-content: center;
    }
`;

const Card = styled.div`
    display: flex;
    width: 100%;
    align-items: center;

    @media (max-width: 480px) { /* 모바일 */
        gap: 2px;
    }
`;

const Ball = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${({ color }) => color };
    margin: 0 5px;
    font-size: 18px;
    font-weight: bold;
    box-sizing: border-box;

    @media (max-width: 768px) { /* 태블릿 */
        width: 36px;
        height: 36px;
        font-size: 16px;
        margin: 0 4px;
    }

    @media (max-width: 480px) { /* 모바일 */
        width: 32px;
        height: 32px;
        font-size: 14px;
        margin: 0 3px;
    }
`;
