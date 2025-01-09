import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, p {
        font-family: 'Nunito', sans-serif;
        font-weight: 400;
        line-height: 1.6;
    }

    h1, h2, h3 {
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
    }

    .App {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;

        @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
            padding: 15px;
        }

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            padding: 10px;
        }
    }
`;

export default GlobalStyle;
