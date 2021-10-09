// Libraries
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { FullscreenButton } from './FullscreenButton';

describe('fullscreen button', () => {
  document.documentElement.requestFullscreen = jest.fn();
  document.documentElement.requestFullscreen = jest.fn();
  document.exitFullscreen = jest.fn();
  const fullcreenEvent = new CustomEvent('fullscreenchange', {
    detail: {
      target: window.document,
    },
  });

  it('should render', () => {
    render(<FullscreenButton />);

    const expandButton = document.getElementsByClassName('fa-expand');
    expect(expandButton).toHaveLength(1);
  });

  it('should activates fullscreen on click', () => {
    render(<FullscreenButton />);

    const fullscreenButton = document.getElementById('fullscreen-btn');
    userEvent.click(fullscreenButton!);
    expect(document.documentElement.requestFullscreen).toHaveBeenCalledTimes(1);
    expect(document.exitFullscreen).toHaveBeenCalledTimes(0);
  });

  it('should leaves fullscreen on double click', () => {
    render(<FullscreenButton />);

    // @ts-ignore
    document.fullscreenElement = true;
    const fullscreenButton = document.getElementById('fullscreen-btn');
    userEvent.click(fullscreenButton!);
    expect(document.documentElement.requestFullscreen).toHaveBeenCalledTimes(0);
    expect(document.exitFullscreen).toHaveBeenCalledTimes(1);
    act(() => {
      document.dispatchEvent(fullcreenEvent);
    });
    const expandButton = document.getElementsByClassName('fa-compress');
    expect(expandButton).toHaveLength(1);
  });
});

export {};
