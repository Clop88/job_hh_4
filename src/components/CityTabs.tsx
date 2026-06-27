import { Tabs } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import styles from './CityTabs.module.css';

interface CityTabsProps {
  value: string | null;
  onChange: (value: string | null) => void;
}


export const CityTabs = ({ value, onChange }: CityTabsProps) => {
  const navigate = useNavigate();
  
  const handleTabChange = (tabValue: string | null) => {
    onChange(tabValue);
    navigate(`/vacancies/${tabValue}`);
  };

  return (
    <div className={styles.tabsWrapper}>
    <Tabs value={value || 'moscow'} onChange={handleTabChange} variant="default">
      <Tabs.List>
        <Tabs.Tab value="moscow">Москва</Tabs.Tab>
        <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
      </Tabs.List>
    </Tabs>
    </div>
  );
};