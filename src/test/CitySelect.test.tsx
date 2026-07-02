import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CitySelect } from '../components/CitySelect';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('CitySelect', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
    mockOnChange.mockClear();
  });

  const renderWithRouter = (component: React.ReactNode) => {
    return render(
      <MemoryRouter>
        {component}
      </MemoryRouter>
    );
  };

  it('отображает все опции городов', () => {
    renderWithRouter(<CitySelect value="moscow" onChange={mockOnChange} />);
    
    expect(screen.getByText('Все города')).toBeInTheDocument();
    expect(screen.getByText('Москва')).toBeInTheDocument();
    expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument();
    expect(screen.getByText('Барнаул')).toBeInTheDocument();
  });

  it('правильно отображает выбранный город', () => {
    renderWithRouter(<CitySelect value="moscow" onChange={mockOnChange} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('1');
  });

  it('отображает "Все города" когда value === null', () => {
    renderWithRouter(<CitySelect value={null} onChange={mockOnChange} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('');
  });

  it('вызывает onChange и navigate при выборе города', () => {
    renderWithRouter(<CitySelect value="moscow" onChange={mockOnChange} />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: '2' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('2');
    expect(mockNavigate).toHaveBeenCalledWith('/vacancies/petersburg');
  });

  it('вызывает onChange с null при выборе "Все города"', () => {
    renderWithRouter(<CitySelect value="moscow" onChange={mockOnChange} />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: '' } });
    
    expect(mockOnChange).toHaveBeenCalledWith(null);
    expect(mockNavigate).toHaveBeenCalledWith('/vacancies/all');
  });

  it('имеет правильный aria-label', () => {
    renderWithRouter(<CitySelect value="moscow" onChange={mockOnChange} />);
    const select = screen.getByLabelText('Выбор города');
    expect(select).toBeInTheDocument();
  });
});