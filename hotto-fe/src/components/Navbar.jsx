import React from 'react';
import { NavLink } from 'react-router-dom'; // react-router-dom에서 NavLink 사용
import styled from 'styled-components'; // styled-components 사용

const Navbar = () => {
    return (
        <Nav>
            <NavHotto to="/" exact activeClassName="active">HOTTO</NavHotto>
            <NavItem to="/" exact activeClassName="active">추첨하기</NavItem>
            <NavItem to="/mylotto" exact activeClassName="active">마이로또</NavItem>
            <NavItem to="/posts" exact activeClassName="active">커뮤니티 </NavItem>
        </Nav>
    );
};

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 auto;
    max-width: 450px;
    width: 100%;
    box-sizing: border-box;
    font-size: 18px;
    padding: 12px 24px;
    margin-bottom: 16px;
`;

const NavHotto = styled.div`
    padding: 8px 14px;
    font-size: 20px;
    margin-right: 30px;
    font-weight: bold;
`;

const NavItem = styled(NavLink)`
    color: gray;
    cursor: pointer;
    padding: 8px 14px;
    text-decoration: auto;

    &:hover {
        border-radius: 5px;
    }

    &.active {
        color: black; // 현재 페이지에 해당하는 항목은 검정색
    }
`;

export default Navbar;
