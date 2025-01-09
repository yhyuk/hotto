import axios from 'axios';

const API_BASE_URL = 'https://luckyhotto.shop/api';

export const getLottoNumbers = async () => {
    const response = await axios.get(`${API_BASE_URL}/lotto`);
    return response.data;
};
