import React, { useState } from 'react';
import styled from "styled-components";


const LottoManual = () => {
    const [selectedNumbers, setSelectedNumbers] = useState([]);

    const toggleNumber = (number) => {
        setSelectedNumbers((prev) => {
            if (prev.includes(number)) {
                // 이미 선택된 번호는 제거
                return prev.filter((n) => n !== number);
            } else if (prev.length < 6) {
                // 6개 이하일 때만 추가
                return [...prev, number].sort((a, b) => a - b); // 오름차순 정렬
            } else {
                alert('공이 가득 찼습니다.')
                return prev;
            }
        });
    };

    // 선택 초기화
    const resetSelection = () => {
        setSelectedNumbers([]);
    };

    // 개별 번호 제거
    const removeNumber = (number) => {
        setSelectedNumbers((prev) => prev.filter((n) => n !== number));
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
                <Title>수동 선택</Title>
                <ResetButton onClick={resetSelection}>초기화</ResetButton>
            </Header>
            <NumberGrid>
                {Array.from({ length: 45 }, (_, i) => i + 1).map((number) => (
                    <NumberBall
                        key={number}
                        onClick={() => toggleNumber(number)}
                        selected={selectedNumbers.includes(number)}
                        color={getColorForNumber(number)}
                    >
                        {number}
                    </NumberBall>
                ))}
            </NumberGrid>
            <Card>
                {Array.from({ length: 6 }, (_, i) => (
                    <Ball
                        key={i}
                        onClick={() =>
                            selectedNumbers[i] !== undefined && removeNumber(selectedNumbers[i])
                        }
                    >
                        {selectedNumbers[i] !== undefined ? selectedNumbers[i] : "?"}
                    </Ball>
                ))}
            </Card>
        </Container>
    );
};

export default LottoManual;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const ResetButton = styled.button`
    background-color: gray;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: black;
    }
`;

const NumberGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr); 
    gap: 10px;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
`;

const NumberBall = styled.div`
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${({ selected, color }) =>
        selected ? "black" : color}; 
    color: ${({ selected }) => (selected ? "white" : "black")};
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        transform: scale(1.1); 
    }

    @media (max-width: 480px) { 
        width: 32px;
        height: 32px;
        font-size: 14px; 
    }
`;

const Card = styled.div`
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
    background-color: #50C878;
    margin: 0 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.1);
    }

`;
