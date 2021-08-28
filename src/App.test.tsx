import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as LoginForm from 'src/components/LoginForm';
import * as RegistrationForm from 'src/components/RegistrationForm';
import * as TopBar from 'src/components/TopBar';
import * as Main from 'src/components/Main';
import * as BottomPanel from 'src/components/BottomPanel';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(LoginForm, 'LoginForm').mockReturnValue(<div data-testid="LoginForm" />);
    jest.spyOn(RegistrationForm, 'RegistrationForm').mockReturnValue(<div data-testid="RegistrationForm" />);
    jest.spyOn(TopBar, 'TopBar').mockReturnValue(<div data-testid="TopBar" />);
    jest.spyOn(Main, 'Main').mockReturnValue(<div data-testid="Main" />);
    jest.spyOn(BottomPanel, 'BottomPanel').mockReturnValue(<div data-testid="BottomPanel" />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('routing should work correctly', () => {
    it('login route should work correctly', () => {
      window.history.pushState({}, 'Test page', '/login');
      render(<App />, { wrapper: MemoryRouter });

      const loginForm = screen.queryByTestId('LoginForm');
      const registrationForm = screen.queryByTestId('RegistrationForm');
      const topBar = screen.queryByTestId('TopBar');
      const main = screen.queryByTestId('Main');
      const bottomPanel = screen.queryByTestId('BottomPanel');

      expect(loginForm).toBeInTheDocument();
      expect(registrationForm).not.toBeInTheDocument();
      expect(topBar).not.toBeInTheDocument();
      expect(main).not.toBeInTheDocument();
      expect(bottomPanel).not.toBeInTheDocument();
    });

    it('registration route should work correctly', () => {
      window.history.pushState({}, 'Test page', '/registration');
      render(<App />, { wrapper: MemoryRouter });

      const loginForm = screen.queryByTestId('LoginForm');
      const registrationForm = screen.queryByTestId('RegistrationForm');
      const topBar = screen.queryByTestId('TopBar');
      const main = screen.queryByTestId('Main');
      const bottomPanel = screen.queryByTestId('BottomPanel');

      expect(loginForm).not.toBeInTheDocument();
      expect(registrationForm).toBeInTheDocument();
      expect(topBar).not.toBeInTheDocument();
      expect(main).not.toBeInTheDocument();
      expect(bottomPanel).not.toBeInTheDocument();
    });

    it('empty route should work correctly', () => {
      window.history.pushState({}, 'Test page', '/');
      render(<App />, { wrapper: MemoryRouter });

      const loginForm = screen.queryByTestId('LoginForm');
      const registrationForm = screen.queryByTestId('RegistrationForm');
      const topBar = screen.queryByTestId('TopBar');
      const main = screen.queryByTestId('Main');
      const bottomPanel = screen.queryByTestId('BottomPanel');

      expect(loginForm).not.toBeInTheDocument();
      expect(registrationForm).not.toBeInTheDocument();
      expect(topBar).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(bottomPanel).toBeInTheDocument();
    });
  });
});
