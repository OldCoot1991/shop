'use client';

import styled from 'styled-components';
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import LanguageSwitcher from '../../ui/LanguageSwitcher/LanguageSwitcher';

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid ${({ theme }) => theme.text};
    transition: all 0.25s linear;
`;

const ControlsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <h1>My Shop</h1>
            <ControlsContainer>
                <LanguageSwitcher />
                <ThemeToggle />
            </ControlsContainer>
        </HeaderContainer>
    );
};

export default Header;
