import { act, render } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { FullscreenButton } from './index';

describe('fullscreen button', () => {
  document.documentElement.requestFullscreen = jest.fn();
  document.documentElement.requestFullscreen = jest.fn();
  document.exitFullscreen = jest.fn();
  const fullcreenEvent = new CustomEvent('fullscreenchange', {
    detail: {
      target: window.document,
    },
  });

  it('correct render', () => {
    render(<FullscreenButton />);

    const expandButton = document.getElementsByClassName('fa-expand');
    expect(expandButton).toHaveLength(1);
  });

  it('click on button activates fullscreen', () => {
    render(<FullscreenButton />);

    const fullscreenButton = document.getElementById('fullscreen-btn');
    userEvent.click(fullscreenButton!);
    expect(document.documentElement.requestFullscreen).toHaveBeenCalledTimes(1);
    expect(document.exitFullscreen).toHaveBeenCalledTimes(0);
  });

  it('click twice on button leaves fullscreen', () => {
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
