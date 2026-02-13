'use client';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Select = styled.select`
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.text};
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primary};
    }
`;

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <Select onChange={changeLanguage} value={i18n.language}>
            <option value="ru">Русский</option>
            <option value="en">English</option>
        </Select>
    );
};

export default LanguageSwitcher;
