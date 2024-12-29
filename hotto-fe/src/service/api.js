import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const getLottoNumbers = async () => {
    const response = await axios.get(`${API_BASE_URL}/lotto`);
    return response.data;
};
