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
                                    <Td>
                                        <Card>
                                            {lotto.numbers.map((number, idx) => (
                                                <Ball key={idx}>{number}</Ball>
                                            ))}
                                        </Card>
                                    </Td>
                                    <Td>{lotto.registered}</Td>
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
