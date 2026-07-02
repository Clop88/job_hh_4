import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Layout } from '../components/Layout';
import vacanciesReducer from '../store/vacanciesSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      vacancies: vacanciesReducer,
    },
  });
};

describe('Layout', () => {
  const renderWithProviders = (component: React.ReactNode) => {
    const store = createTestStore();
    return render(
      <Provider store={store}>
        <MemoryRouter>
          {component}
        </MemoryRouter>
      </Provider>
    );
  };

  it('отображает Header', () => {
    renderWithProviders(<Layout />);
    expect(screen.getByText('hh')).toBeInTheDocument();
    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
  });

  it('отображает ссылку "Вакансии FE"', () => {
    renderWithProviders(<Layout />);
    expect(screen.getByText('Вакансии FE')).toBeInTheDocument();
  });

  it('отображает ссылку "Обо мне"', () => {
    renderWithProviders(<Layout />);
    expect(screen.getByText('Обо мне')).toBeInTheDocument();
  });

  it('рендерит main элемент', () => {
    renderWithProviders(<Layout />);
    const mainElement = document.querySelector('main');
    expect(mainElement).toBeInTheDocument();
  });
});
