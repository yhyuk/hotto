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

    const getColorForNumber = (number) => {
        if (number <= 10) return "#ffcccb"; // 1~10: Red
        if (number <= 20) return "#add8e6"; // 11~20: Blue
        if (number <= 30) return "#90ee90"; // 21~30: Green
        return "#ffd700"; // 31~45: Yellow
    };

    return (
        <Container>
            <Header>
                <Title>수동 선택</Title>
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
                    <Ball key={i}>
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

const NumberGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 1fr); /* 9개씩 나열 */
    gap: 10px;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
`;

const NumberBall = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${({ selected, color }) =>
        selected ? "darkgray" : color}; /* 선택된 경우 색상 변경 */
    color: ${({ selected }) => (selected ? "white" : "black")};
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        transform: scale(1.1); /* 마우스 올릴 때 크기 증가 */
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
    background-color: #FF7F00;
    margin: 0 5px;
    font-size: 18px;
    font-weight: bold;
`;
