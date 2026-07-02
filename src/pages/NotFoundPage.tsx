import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div>
    
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Упс! Такой страницы не существует</h1>
        <p className={styles.message}>Давайте перейдём к началу</p>
      </div>
        <button 
          onClick={() => navigate('/vacancies/all')} 
          className={styles.button}
        >
          На главную
        </button>
        <img src="./img/cat.gif" alt="notfound" className={styles.img} />
      </div>
    </div>
  );
};