import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AboutPage } from '../pages/AboutPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import vacanciesReducer from '../store/vacanciesSlice';

vi.mock('../pages/VacanciesPage', () => ({
  VacanciesPage: () => <div data-testid="vacancies-page">Список вакансий</div>,
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      vacancies: vacanciesReducer,
    },
  });
};

describe('Routing', () => {
  const renderWithRouter = (initialRoute: string) => {
    const store = createTestStore();
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="about" element={<AboutPage />} />
              <Route path="vacancies/:city" element={<div data-testid="vacancies-page">Список вакансий</div>} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it('отображает AboutPage на роуте /about', () => {
    renderWithRouter('/about');
    expect(screen.getByText('Frontend-разработчик')).toBeInTheDocument();
    expect(screen.getByText('Михайлов Константин')).toBeInTheDocument();
  });

  it('отображает VacanciesPage на роуте /vacancies/all', () => {
    renderWithRouter('/vacancies/all');
    expect(screen.getByText('Список вакансий')).toBeInTheDocument();
  });

  it('отображает NotFoundPage на несуществующем роуте', () => {
    renderWithRouter('/nonexistent');
    expect(screen.getByText('Упс! Такой страницы не существует')).toBeInTheDocument();
  });
});