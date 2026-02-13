'use client';

import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { toggleTheme } from '../../../lib/features/theme/themeSlice';

const ToggleContainer = styled.button`
    background: ${({ theme }) => theme.text};
    border: 2px solid ${({ theme }) => theme.body};
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    font-size: 0.5rem;
    justify-content: space-between;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.5rem;
    position: relative;
    width: 4rem;
    height: 2rem;

    svg {
        height: auto;
        width: 1.5rem;
        transition: all 0.3s linear;
        
        &:first-child {
            transform: ${({ theme }) => theme.body === '#121212' ? 'translateY(100px)' : 'translateY(0)'};
        }
        
        &:nth-child(2) {
            transform: ${({ theme }) => theme.body === '#121212' ? 'translateY(0)' : 'translateY(-100px)'};
        }
    }
`;

const ThemeToggle = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.theme.mode);
    const isDark = mode === 'dark';

    return (
        <ToggleContainer onClick={() => dispatch(toggleTheme())}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FDB813" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FEFCD7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto' }}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </ToggleContainer>
    );
};

export default ThemeToggle;
