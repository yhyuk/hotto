import React from 'react';
import { NavLink } from 'react-router-dom'; // react-router-dom에서 NavLink 사용
import styled from 'styled-components'; // styled-components 사용

const Navbar = () => {
    return (
        <Nav>
            <NavHeader>
                <NavHotto to="/" exact activeClassName="active">HOTTO</NavHotto>
            </NavHeader>
            <NavMenu>
                <NavItem to="/" exact activeClassName="active">추첨하기</NavItem>
                <NavItem to="/mylotto" exact activeClassName="active">마이로또</NavItem>
                <NavItem to="/posts" exact activeClassName="active">커뮤니티</NavItem>
            </NavMenu>
        </Nav>
    );
};

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

const NavHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
`;

const NavHotto = styled(NavLink)`
    font-size: 24px;
    font-weight: bold;
    color: black;
    text-decoration: none;

    &:hover {
        color: #007BFF;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const NavMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;

    @media (max-width: 768px) {
        gap: 16px;
    }

    @media (max-width: 480px) {
        gap: 12px;
        flex-wrap: wrap; /* 모바일에서 항목이 줄 바꿈될 수 있도록 설정 */
    }
`;

const NavItem = styled(NavLink)`
    font-size: 20px;
    color: gray;
    cursor: pointer;
    padding: 8px 14px;
    text-decoration: none;
    transition: color 0.3s, background-color 0.3s;

    &:hover {
        border-radius: 5px;
        background-color: #f0f0f0;
    }

    &.active {
        color: black; 
        font-weight: bold;
    }
`;

export default Navbar;
