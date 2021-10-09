// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

// Enums
import { App } from '@Enums/app.enum';

// Hooks
import * as useApp from '@Hooks/useApp/useApp';
import * as useDragNDrop from '@Hooks/useDragNDrop/useDragNDrop';

// Components
import { Window } from './Window';

describe('Window', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    apps: {
      apps: [App.Calculator],
      appsState: {
        [App.Calculator]: {
          isOpened: true,
          isCollapsed: false,
          windowPos: {
            top: '1rem',
            left: '1rem',
          },
        },
      },
    },
  };
  const mockStoreWithState = mockStore(initialState);

  beforeEach(() => {
    jest.spyOn(useApp, 'useApp').mockReturnValue({
      getAppIndex: jest.fn().mockReturnValue(1),
      handleClose: jest.fn(),
      handleToggleCollapse: jest.fn(),
      handleOpen: jest.fn(),
      isIncludeApp: jest.fn(),
    });
    jest.spyOn(useDragNDrop, 'useDragNDrop').mockReturnValue({
      startDrag: jest.fn(),
      newCoords: {
        top: '1rem',
        left: '1rem',
      },
    });
  });

  it('should render', () => {
    render(
      <Provider store={mockStoreWithState}>
        <Window type={App.Calculator} />
      </Provider>,
    );

    expect(document.getElementsByTagName('button')).toHaveLength(3);
    expect(screen.queryByText(App.Calculator)).toBeInTheDocument();
  });

  it('should set window active on click', () => {
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
    render(
      <Provider store={mockStoreWithState}>
        <Window type={App.Calculator} />
      </Provider>,
    );

    const title = screen.queryByText(App.Calculator);

    userEvent.click(title!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: App.Calculator,
      type: 'apps/setWindowActive',
    });
  });
});
