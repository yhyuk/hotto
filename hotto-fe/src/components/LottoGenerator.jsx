import React, { useState } from 'react';
import axios from 'axios';
import LottoCard from './LottoCard';

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
        <div className="lotto-generator">
            <h1>Lotto 추첨생성기</h1>
            <button onClick={fetchLottoNumbers}>생성하기</button>
            {error && <p className="error">{error}</p>}
            {numbers.length > 0 && <LottoCard numbers={numbers} />}
        </div>
    )
}

export default LottoGenerator;