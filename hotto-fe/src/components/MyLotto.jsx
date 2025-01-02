import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const MyLotto = () => {
    const [lottoData, setLottoData] = useState([]); // 로컬스토리지에서 불러온 로또 번호

    // 로컬스토리지에서 로또 데이터를 불러오는 함수
    useEffect(() => {
        const storedLottoData = [];
        // 로컬스토리지의 모든 키를 순회합니다.
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i); // 키를 가져옴
            const data = JSON.parse(localStorage.getItem(key)); // 해당 키에 대한 데이터
            if (data) {
                storedLottoData.push(data); // 데이터가 있으면 배열에 추가
            }
        }
        setLottoData(storedLottoData); // 상태에 데이터 저장
    }, []);

    const removeCard = (cardId) => {
        // 로컬스토리지에서 해당 아이템 삭제
        localStorage.removeItem(cardId);

        // 삭제 후 로컬스토리지에서 최신 데이터 불러오기
        const updatedLottoData = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const data = JSON.parse(localStorage.getItem(key));
            if (data) {
                updatedLottoData.push(data);
            }
        }

        // 상태 업데이트
        setLottoData(updatedLottoData);
    };

    return (
        <Container>
            <h2>마이로또</h2>
            {lottoData.length === 0 ? (
                <p>저장된 로또 번호가 없습니다.</p>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>행운의 공</Th>
                            <Th>저장일</Th>
                            <Th>삭제</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {lottoData.map((lotto) => (
                            <Tr key={lotto.id}>
                                <Card>
                                    {lotto.numbers.map((number, idx) => (
                                        <Ball key={idx}>{number}</Ball>
                                    ))}
                                </Card>
                                <Td>{lotto.registered}</Td> {/* 저장일 */}
                                <Td>
                                    <DeleteButton onClick={() => removeCard(lotto.id)}>삭제</DeleteButton>
                                </Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
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

const Table = styled.table`
    width: 100%; /* 테이블 너비를 설정 */
    border-collapse: collapse; /* 테이블 셀의 경계선이 겹치지 않도록 설정 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 테이블에 그림자 추가 */
`;

const Th = styled.th`
    padding: 10px;
    text-align: left;
    background-color: #f4f4f4;
    font-weight: bold;
    border-bottom: 2px solid #ddd;
    white-space: nowrap;
`;

const Td = styled.td`
    padding: 5px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    white-space: nowrap;
`;

const Tr = styled.tr`
    &:hover {
        background-color: #f9f9f9;
    }
`;

const Card = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
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
