import React, { useState } from 'react';
import axios from 'axios';
import LottoCard from './LottoCard';
import LottoResults from './LottoResults';

const LottoGenerator = () => {
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
        <>
        <div className="lotto-generator">
            <h1>Lotto 추첨생성기</h1>
            {error && <p className="error">{error}</p>}
            {numbers.length > 0 && <LottoCard numbers={numbers} />}
            <div>
                <button onClick={fetchLottoNumbers}>생성하기</button>
            </div>
        </div>
        <div>
            <h1>이전 회차 로또 당첨 번호</h1>
            <LottoResults />
        </div>
        </>
    )
}

export default LottoGenerator;