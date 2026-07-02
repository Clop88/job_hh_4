import styles from './AboutPage.module.css';
import { useNavigate } from 'react-router-dom';


export const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <button 
          onClick={() => navigate('/vacancies/all')} 
          className={styles.button}>
          На главную
        </button>
        
          <div className={styles.info}>
            <h1 className={styles.prof}>Frontend-разработчик</h1>
            <h2 className={styles.name}>Михайлов Константин</h2>
          </div>
      </div>
      
            <div className={styles.description}>
              <p>
              Привет! Я юрист-практик со стажем более 15 лет,
              решивший кардинально изменить профессию на Frontend-разработчика.</p>
              <ul>
              <li>Есть опыт создания современных веб-приложений.</li>
              <li>Использую современный стек при написании вэб-приложений.</li>
              <li>Специализируюсь на React, TypeScript и экосистеме JavaScript.</li>
              </ul>
    </div>
    </div>
  );
};