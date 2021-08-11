import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Apps } from 'src/types/apps';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import * as useApp from 'src/hooks/useApp';
import * as useDragNDrop from 'src/hooks/useDragNDrop';
import userEvent from '@testing-library/user-event';
import { Window } from '.';

describe('Window', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    apps: {
      apps: [Apps.Calculator],
      appsState: {
        [Apps.Calculator]: {
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
        <Window type={Apps.Calculator} />
      </Provider>,
    );

    expect(document.getElementsByTagName('button')).toHaveLength(3);
    expect(screen.queryByText(Apps.Calculator)).toBeInTheDocument();
  });

  it('should set window active on click', () => {
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
    render(
      <Provider store={mockStoreWithState}>
        <Window type={Apps.Calculator} />
      </Provider>,
    );

    const title = screen.queryByText(Apps.Calculator);

    userEvent.click(title!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: Apps.Calculator,
      type: 'apps/setWindowActive',
    });
  });
});
