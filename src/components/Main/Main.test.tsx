// Libraries
import React from 'react';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// Types
import { BackgroundImage } from 'src/features/theme/types/backgroundImage';
import { Apps } from 'src/types/apps';

// Components
import * as Terminal from 'src/apps/Terminal';
import * as Settings from 'src/apps/Settings';
import * as Calculator from 'src/apps/Calculator';
import * as ToDoList from 'src/apps/ToDoList';
import * as Chat from 'src/apps/Chat';
import * as Simon from 'src/apps/Simon';
import * as MessageAlert from 'src/components/MessageAlert';
import { Main } from '.';

describe('main component', () => {
  const mockState = '';
  const mockSetState = jest.fn();
  jest.spyOn(React, 'useState').mockReturnValue([mockState, mockSetState]);
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];

  beforeEach(() => {
    jest.spyOn(Terminal, 'Terminal').mockReturnValue(<div data-testid="Terminal" />);
    jest.spyOn(Settings, 'Settings').mockReturnValue(<div data-testid="Settings" />);
    jest.spyOn(Calculator, 'Calculator').mockReturnValue(<div data-testid="Calculator" />);
    jest.spyOn(ToDoList, 'ToDoList').mockReturnValue(<div data-testid="ToDoList" />);
    jest.spyOn(Chat, 'Chat').mockReturnValue(<div data-testid="Chat" />);
    jest.spyOn(Simon, 'Simon').mockReturnValue(<div data-testid="Simon" />);
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
          [Apps.Chat]: {
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
            [Apps.Chat]: {
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
      expect(el!.style.backgroundImage).toBe('url(darkPlanet.jpg)');
    });

    it('should render sea theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Sea,
        },
        apps: {
          appsState: {
            [Apps.Chat]: {
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
      expect(el!.style.backgroundImage).toBe('url(sea.jpg)');
    });

    it('should correct render tree theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Tree,
        },
        apps: {
          appsState: {
            [Apps.Chat]: {
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
      expect(el!.style.backgroundImage).toBe('url(tree.jpg)');
    });

    it('should correct render fog theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Fog,
        },
        apps: {
          appsState: {
            [Apps.Chat]: {
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
      expect(el!.style.backgroundImage).toBe('url(fog.jpg)');
    });

    it('should correct render car theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Car,
        },
        apps: {
          appsState: {
            [Apps.Chat]: {
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
      expect(el!.style.backgroundImage).toBe('url(car.jpg)');
    });

    it('should correct render dynamic theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          backgroundImage: BackgroundImage.Dynamic,
        },
        apps: {
          appsState: {
            [Apps.Chat]: {
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
            [Apps.Chat]: {
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
