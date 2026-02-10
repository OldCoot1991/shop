'use client';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { toggleTheme } from '../lib/features/theme/themeSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.25rem;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.95);
  }
`;

export default function Home() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <Container>
      <Title>{t('welcome')}</Title>
      <Description>
        <span>{t('current_theme')}: <strong>{themeMode.toUpperCase()}</strong></span>
        <span>{t('current_lang')}: <strong>{i18n.language.toUpperCase()}</strong></span>
      </Description>
      <ButtonGroup>
        <Button onClick={() => dispatch(toggleTheme())}>
          {t('theme_button')}
        </Button>
        <Button onClick={toggleLanguage}>
          {i18n.language === 'en' ? 'RU' : 'EN'}
        </Button>
      </ButtonGroup>
    </Container>
  );
}
