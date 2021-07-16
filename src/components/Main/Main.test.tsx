// React, redux
import React from 'react';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Themes } from 'src/types/themes';

// Components
import * as Terminal from 'src/apps/Terminal';
import * as Settings from 'src/apps/Settings';
import * as Calculator from 'src/apps/Calculator';
import * as ToDoList from 'src/apps/ToDoList';
import * as Chat from 'src/apps/Chat';
import { Main } from '.';

describe('main component', () => {
  const mockState = '';
  const mockSetState = jest.fn();
  jest.spyOn(React, 'useState').mockReturnValue([mockState, mockSetState]);
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];

  beforeEach(() => {
    jest.spyOn(Terminal, 'Terminal').mockReturnValue(null);
    jest.spyOn(Settings, 'Settings').mockReturnValue(null);
    jest.spyOn(Calculator, 'Calculator').mockReturnValue(null);
    jest.spyOn(ToDoList, 'ToDoList').mockReturnValue(null);
    jest.spyOn(Chat, 'Chat').mockReturnValue(null);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('correct render themes', () => {
    it('correct render planet theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          theme: Themes.Planet,
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

    it('correct render sea theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          theme: Themes.Sea,
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

    it('correct render tree theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          theme: Themes.Tree,
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

    it('correct render road theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          theme: Themes.Road,
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <Main />
        </Provider>,
      );

      const el = document.getElementById('main-container');
      expect(el!.style.backgroundImage).toBe('url(road.jpg)');
    });

    it('correct render car theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          theme: Themes.Car,
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

    it('correct render dynamic theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          theme: Themes.Dynamic,
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

    it('correct render dynamic2 theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          theme: Themes.Dynamic2,
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

    it('render default theme', () => {
      const mockStore = configureStore(middlewares);
      const initialState = {
        theme: {
          theme: '',
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
  });
});

export {};
