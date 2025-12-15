import { routes } from '@constants';
import { NavLink } from 'react-router-dom';
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
            <NavLink exact to={routes.MAIN} className="nav-icon-link">
              <HomeButton />
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.ABOUT} className="nav-icon-link">
              <AboutButton />
            </NavLink>
          </li>
          <li>
            <AuthButton />
          </li>
        </ul>
      </div>
    </div>
  );
};