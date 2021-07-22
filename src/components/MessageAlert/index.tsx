// React, redux
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { RootState } from 'src/redux/store';

// Components
import { MessageAlertItem } from 'src/components/MessageAlertItem';

// Styles
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable react-hooks/exhaustive-deps */

export const MessageAlert = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const username = useSelector((state: RootState) => state.user.username);
  const numberOfRender = useSelector((state: RootState) => state.chat.numberOfRender);
  const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);
  const isChatCollapsed = useSelector((state: RootState) => state.chat.isChatCollapsed);
  const message = messages[messages.length - 1];

  useEffect(() => {
    if (message?.text && username !== message.username && numberOfRender > 1 && (!isChatOpen || isChatCollapsed)) {
      toast.dark(<MessageAlertItem message={message} />, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        toastId: message.id,
      });
    }
  }, [message]);

  return (
    <ToastContainer />
  );
};
