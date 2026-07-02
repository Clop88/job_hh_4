import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Container } from '@mantine/core';
import { 
  fetchVacancies, 
  setCurrentPage, 
  setSearchText, 
  setSelectedCity, 
  setSkills,
  selectVacancies,
  selectLoading,
  selectTotalPages,
  selectCurrentPage,
  selectSearchText,
  selectSelectedCity,
  selectSkills,
} from '../store/vacanciesSlice';
import { SearchBar } from '../components/SearchBar';
import { CitySelect } from '../components/CitySelect';
import { SkillsFilter } from '../components/SkillsFilter';
import { VacancyCard } from '../components/VacancyCard';
import { Pagination } from '../components/Pagination';
import styles from './VacanciesPage.module.css';

export const VacanciesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { city } = useParams<{ city: string }>();
  const isInitialized = useRef(false);
  const defaultSkillsSet = localStorage.getItem('defaultSkillsSet') === 'true';
  const vacancies = useAppSelector(selectVacancies);
  const loading = useAppSelector(selectLoading);
  const totalPages = useAppSelector(selectTotalPages);
  const currentPage = useAppSelector(selectCurrentPage);
  const searchText = useAppSelector(selectSearchText);
  const selectedCity = useAppSelector(selectSelectedCity);
  const skills = useAppSelector(selectSkills);

  const getCitySlug = (cityName: string | null): string => {
    if (!cityName) return 'all';
    const cityMap: Record<string, string> = {
      'Москва': 'moscow',
      'Санкт-Петербург': 'petersburg',
      'Барнаул': 'barnaul',
    };
    return cityMap[cityName] || 'all';
  };

  const getCityName = (slug: string): string | null => {
    const cityMap: Record<string, string> = {
      'moscow': 'Москва',
      'petersburg': 'Санкт-Петербург',
      'barnaul': 'Барнаул',
    };
    return cityMap[slug] || null;
  };


  useEffect(() => {
    if (city) {
    const cityName = getCityName(city);
      dispatch(setSelectedCity(cityName));
    }
  }, [city, dispatch]);
   

  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    
    const params: Record<string, string> = {};
    queryString.split('&').forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key) {
        params[key] = decodeURIComponent(value || '');
      }
    });
    
    const urlSearch = params['search'] || null;
    const urlSkills = params['skills'] || null;
    const urlPage = params['page'] || null;

    const pathParts = window.location.hash.replace('#', '').split('/');
    const urlCity = pathParts[1] || 'all';

    const cityName = getCityName(urlCity);
    dispatch(setSelectedCity(cityName));

    if (urlSearch !== null) dispatch(setSearchText(urlSearch));
    
    if (urlSkills !== null) {
      const skillsArray = urlSkills === '' ? [] : urlSkills.split(',');
      dispatch(setSkills(skillsArray));
      if (!defaultSkillsSet) {
        localStorage.setItem('defaultSkillsSet', 'true');
      }
    } else {
      if (!defaultSkillsSet && skills.length === 0) {
        const defaultSkills = ['JavaScript', 'React', 'Redux', 'ReduxToolkit', 'Nextjs'];
        dispatch(setSkills(defaultSkills));
        localStorage.setItem('defaultSkillsSet', 'true');
      }
    }
      
    if (urlPage !== null) {
      const pageNumber = parseInt(urlPage, 10);
      if (!isNaN(pageNumber) && pageNumber > 0) {
        dispatch(setCurrentPage(pageNumber));
      }
    }
    
    isInitialized.current = true;
  }, [defaultSkillsSet]);

  useEffect(() => {
    if (!isInitialized.current) return;

    const validCities = ['all', 'moscow', 'petersburg', 'barnaul'];
    if (city && !validCities.includes(city)) {
      navigate('/404', { replace: true });
      return;
    }

    dispatch(fetchVacancies());

    const newParams = new URLSearchParams();
    if (searchText) newParams.set('search', searchText);
    newParams.set('skills', skills.join(','));
    if (currentPage > 1) newParams.set('page', currentPage.toString());
    
    const queryString = newParams.toString();
    const finalQuery = queryString || 'skills=';
    
    const citySlug = selectedCity ? getCitySlug(selectedCity) : 'all';
    const newUrl = `/vacancies/${citySlug}?${finalQuery}`;
    const currentHash = window.location.hash.replace('#', '');
    
    if (currentHash === newUrl) return;
    
    navigate(newUrl, { replace: true });
  }, [searchText, skills, currentPage, dispatch, navigate, selectedCity, city]);

  const handleCityChange = (value: string | null) => {
    if (value === null) {
      dispatch(setSelectedCity(null));
     } else {
      const cityMap: Record<string, string> = {
        '1': 'Москва',
        '2': 'Санкт-Петербург',
        '3': 'Барнаул',
      };
      dispatch(setSelectedCity(cityMap[value]));
    }
  };  

  const handleSearchChange = (value: string) => {
    dispatch(setSearchText(value));
  };

  const handleSkillsChange = (newSkills: string[]) => {
    dispatch(setSkills(newSkills));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.app}>
     <div className={styles.divider}></div>
      <Container className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            <h1 className={styles.title}>Список вакансий</h1>
            <p className={styles.subtitle}>по профессии Frontend-разработчик</p>
          </div>
          <div className={styles.filtersRow}>
            <SearchBar value={searchText} onChange={handleSearchChange} />
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.leftsection}>
           
            <div className={styles.moduleskills}>
              <SkillsFilter skills={skills} onSkillsChange={handleSkillsChange} />
            </div>
            <div className={styles.modulecity}>
              <CitySelect value={city || 'moscow'} onChange={handleCityChange} />
            </div>

          </div>

          <div className={styles.rightsection}>
            {loading ? (
              <div className={styles.loaderWrapper}>
                <div className={styles.loader} />
              </div>
            ) : vacancies.length === 0 ? (
              <div className={styles.emptyWrapper}>
                <p className={styles.emptyText}>Вакансии не найдены</p>
                <p className={styles.emptySubtext}>Попробуйте изменить параметры поиска</p>
              </div>
            ) : (
              <>
                <div className={styles.vacanciesList}>
                  {vacancies.map((vacancy) => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <Pagination total={totalPages} current={currentPage} onChange={handlePageChange} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};