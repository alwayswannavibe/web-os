// Libraries
import React from 'react';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// Features
import { BackgroundImage } from '@Features/theme/types/backgroundImage';

// Enums
import { App } from '@Enums/app.enum';

// Components
import * as Terminal from '@Terminal/Terminal';
import * as Settings from '@Settings/Settings';
import * as Calculator from '@Calculator/Calculator';
import * as ToDo from '@ToDo/ToDo';
import * as Chat from '@Chat/Chat';
import * as Simon from '@Simon/Simon';
import * as Minesweeper from '@Minesweeper/Minesweeper';
import * as MessageAlert from '@Components/MessageAlert/MessageAlert';
import { Main } from './Main';

describe('main component', () => {
  const mockState = '';
  const mockSetState = jest.fn();
  jest.spyOn(React, 'useState').mockReturnValue([mockState, mockSetState]);
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];

  beforeEach(() => {
    jest.spyOn(Terminal, 'Terminal').mockReturnValue(<div data-testid="Terminal" />);
    jest.spyOn(Settings, 'Settings').mockReturnValue(<div data-testid="Settings" />);
    jest.spyOn(Calculator, 'Calculator').mockReturnValue(<div data-testid="Calculator" />);
    jest.spyOn(ToDo, 'ToDo').mockReturnValue(<div data-testid="ToDoList" />);
    jest.spyOn(Chat, 'Chat').mockReturnValue(<div data-testid="Chat" />);
    jest.spyOn(Simon, 'Simon').mockReturnValue(<div data-testid="Simon" />);
    jest.spyOn(Minesweeper, 'Minesweeper').mockReturnValue(<div data-testid="Minesweeper" />);
    jest.spyOn(MessageAlert, 'MessageAlert').mockReturnValue(<div data-testid="MessageAlert" />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('correct render all components', () => {
    const mockStore = configureStore(middlewares);
    const initialState = {
      theme: {
        theme: BackgroundImage.Planet,
      },
      apps: {
        appsState: {
          [App.Chat]: {
            isOpened: true,
          },
        },
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <Main />
      </Provider>,
    );

    const terminal = screen.queryByTestId('Terminal');
    const calculator = screen.queryByTestId('Calculator');
    const toDo = screen.queryByTestId('ToDoList');
    const settings = screen.queryByTestId('Settings');
    const chat = screen.queryByTestId('Chat');
    const simon = screen.queryByTestId('Simon');
    const messageAlert = screen.queryByTestId('MessageAlert');

    expect(terminal).toBeInTheDocument();
    expect(calculator).toBeInTheDocument();
    expect(toDo).toBeInTheDocument();
    expect(settings).toBeInTheDocument();
    expect(chat).toBeInTheDocument();
    expect(simon).toBeInTheDocument();
    expect(messageAlert).toBeInTheDocument();
  });

  describe('should render themes', () => {
    it('should render planet theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Planet,
        },
        apps: {
          appsState: {
            [App.Chat]: {
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <Main />
        </Provider>,
      );

      const el = document.getElementById('main-container');
      expect(el!.style.backgroundImage).toBe('url(darkPlanet.webp)');
    });

    it('should render sea theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Sea,
        },
        apps: {
          appsState: {
            [App.Chat]: {
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <Main />
        </Provider>,
      );

      const el = document.getElementById('main-container');
      expect(el!.style.backgroundImage).toBe('url(sea.webp)');
    });

    it('should correct render tree theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Tree,
        },
        apps: {
          appsState: {
            [App.Chat]: {
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <Main />
        </Provider>,
      );

      const el = document.getElementById('main-container');
      expect(el!.style.backgroundImage).toBe('url(tree.webp)');
    });

    it('should correct render fog theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Fog,
        },
        apps: {
          appsState: {
            [App.Chat]: {
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <Main />
        </Provider>,
      );

      const el = document.getElementById('main-container');
      expect(el!.style.backgroundImage).toBe('url(fog.webp)');
    });

    it('should correct render car theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Car,
        },
        apps: {
          appsState: {
            [App.Chat]: {
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <Main />
        </Provider>,
      );

      const el = document.getElementById('main-container');
      expect(el!.style.backgroundImage).toBe('url(car.webp)');
    });

    it('should correct render dynamic theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Dynamic,
        },
        apps: {
          appsState: {
            [App.Chat]: {
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <Main />
        </Provider>,
      );

      const el = document.getElementById('main-container');
      expect(el!.style.backgroundImage).toBe('url(dynamic.gif)');
    });

    it('should correct render dynamic2 theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Dynamic2,
        },
        apps: {
          appsState: {
            [App.Chat]: {
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <Main />
        </Provider>,
      );

      const el = document.getElementById('main-container');
      expect(el!.style.backgroundImage).toBe('url(dynamic2.gif)');
    });
  });
});

export {};
