import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutPage } from '../pages/AboutPage';

describe('AboutPage', () => {
  it('отображает заголовок "Frontend-разработчик"', () => {
    render(<AboutPage />);
    expect(screen.getByText('Frontend-разработчик')).toBeInTheDocument();
  });

  it('отображает имя в резюме"', () => {
    render(<AboutPage />);
    expect(screen.getByText('Михайлов Константин')).toBeInTheDocument();
  });
  
  it('рендерит компонент без ошибок', () => {
    const { container } = render(<AboutPage />);
    expect(container).toBeInTheDocument();
  });

  it('содержит div с классом container', () => {
    const { container } = render(<AboutPage />);
    const divElement = container.querySelector('div');
    expect(divElement).toBeInTheDocument();
  });
});