import React from 'react';

const LottoCard = ({ numbers }) => {
    return (
        <div className="lotto-card">
            <ul>
                {numbers.map((number, index) => (
                    <li key={index}>{number}</li>
                ))}
            </ul>
        </div>
    );
};

export default LottoCard;
