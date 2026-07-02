import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { store } from './store';
import { theme } from './theme';
import { Layout } from './components/Layout';
import { VacanciesPage } from './pages/VacanciesPage';
import { VacancyDetailPage } from './pages/VacancyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/vacancies/all" replace />} />
              <Route path="vacancies">
                <Route path=":city" element={<VacanciesPage />} />
                <Route path=":city/:id" element={<VacancyDetailPage />} />
              </Route>
              <Route path="about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/404" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </MantineProvider>
    </Provider>
  );
}

export default App;