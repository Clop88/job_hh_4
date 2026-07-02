import { useNavigate } from 'react-router-dom';
import styles from './CitySelect.module.css';

interface CitySelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const cityMap: Record<string, string> = {
  'all': '',
  'moscow': '1',
  'petersburg': '2',
  'barnaul': '3',
};


const reverseCityMap: Record<string, string> = {
  '': 'all',
  '1': 'moscow',
  '2': 'petersburg',
  '3': 'barnaul',
};

const cities = [
  { value: '', label: 'Все города' },
  { value: '1', label: 'Москва' },
  { value: '2', label: 'Санкт-Петербург' },
  { value: '3', label: 'Барнаул' },
];

export const CitySelect = ({ value, onChange }: CitySelectProps) => {
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    
    onChange(newValue === '' ? null : newValue);
    
    const citySlug = reverseCityMap[newValue];
    if (citySlug) {
      navigate(`/vacancies/${citySlug}`);
    }
  };

  
  const selectValue = value === null ? '' : cityMap[value] || '';

  return (
    <div className={styles.wrapper}>
      <select 
        className={styles.select} 
        value={selectValue} 
        onChange={handleChange}
        aria-label="Выбор города"
      >
        {cities.map((city) => (
          <option key={city.value} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
    </div>
  );
};