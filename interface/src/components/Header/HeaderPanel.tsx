<<<<<<< HEAD
import AuthButton from './AuthButton';
import HomeButton from './HomeButton';
import AboutButton from './AboutButton';

export const HeaderPanel = () => {
  return (
    <div className="header">
      <h1 className="header-logo-text">NIKA</h1>
      
      <div className="nav-container">
        <ul className="nav">
          <li>
            <HomeButton />
          </li>
          <li>
            <AboutButton />
          </li>
          <li>
            <AuthButton />
          </li>
        </ul>
      </div>
    </div>
  );
};
=======
import { routes } from '@constants';
import { NavLink } from 'react-router-dom';
import YandexAuthButton from './YandexAuthButton';

export const HeaderPanel = () => {
    return (
        <div className="header">
            <h1 className="header-logo-text">NIKA</h1>
            <YandexAuthButton/>
            <div className="nav-container">
                <ul className="nav">
                    <li>
                        <NavLink exact to={routes.MAIN}>Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to={routes.ABOUT}>О нас</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
>>>>>>> maxim/feat/yandex_disc
