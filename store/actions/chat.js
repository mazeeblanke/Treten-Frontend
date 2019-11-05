import hashit from "hash-it";
import { CHATS_PAGE_SIZE, BROADCASTS_PAGE_SIZE } from "../../lib/constants";

export const setChartFormVisibility = (payload = true) => {
  return {
    type: "SET_CHAT_FORM_VISIBILITY",
    payload
  };
};

export const setRecipient = payload => {
  return {
    type: "SET_CHAT_RECIPIENT",
    payload
  };
};

export const clearSelectedChat = payload => {
  return {
    type: "CLEAR_SELECTED_CHAT",
    payload
  };
};

export const startNewChat = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_NEW_CHAT",
      payload: {
        hash: hashit(Date.now()),
        sender: getState().user,
        receiver: getState().chat.recipient
      }
    });
  };
};

export const setMessageBeingTyped = payload => {
  return {
    type: "SET_MESSAGE_BEING_TYPED",
    payload
  };
};

export const setTypingWhisperDirection = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_SELECTED_CHAT_TYPING_WHISPER_DIRECTION",
      payload: getState().user.id === payload.user ? null : "from"
    });
  };
};

export const fetchChatUsers = ({ q }) => {
  return (dispatch, getState, api) => {
    dispatch({
      type: "SET_LOADING_CHAT_USERS",
      payload: true
    });

    return api
      .get("/api/users?with_muuid=true&q=" + q)
      .then(res => {
        dispatch({
          type: "SET_LOADING_CHAT_USERS",
          payload: false
        });

        dispatch({
          type: "SET_CHAT_USERS",
          payload: res.data
        });
      })
      .catch(() => {
        dispatch({
          type: "SET_LOADING_CHAT_USERS",
          payload: false
        });
      });
  };
};

export const fetchChats = ({ page = 1, pageSize = CHATS_PAGE_SIZE } = {}) => {
  return (dispatch, getState, api) => {
    dispatch({
      type: "SET_LOADING_CHATS",
      payload: true
    });

    return api
      .get(`/api/messagethread?type=chat&page=${page}&pageSize=${pageSize}`)
      .then(res => {
        dispatch({
          type: "SET_LOADING_CHATS",
          payload: false
        });

        dispatch({
          type: "SET_CHATS",
          payload: res.data
        });
      })
      .catch(() => {
        dispatch({
          type: "SET_LOADING_CHATS",
          payload: false
        });
      });
  };
};
export const updateSentChat = message => {
  return {
    type: "UPDATE_SENT_CHAT",
    payload: {
      ...message
      // sendingStatus: "success"
    }
  };
};

export const sendChat = receiver => {
  const receiver_id = receiver.id;
  return (dispatch, getState, api) => {
    const selectedChat = getState().chat.selectedChat;
    const message = selectedChat.messageBeingTyped.replace(/\s\s+/g, " ")
      .replace(/\&nbsp;+/g, "")
      .trim("");
    // iF the message uuid is null, it's probably a new chat altogether
    // so use the hash that was generated initailly
    const hash = selectedChat.message_uuid 
      ? hashit(`${message} ${Date.now()}`)
      : selectedChat.hash;
    const messageMock = {
      created_at: null,
      message,
      receiver_id,
      sender_id: getState().user.id,
      sender: {
        ...getState().user
      },
      receiver,
      hash
    };

    dispatch({
      type: "SET_SENDING_CHAT",
      payload: {
        ...messageMock,
        sendingStatus: "sending"
      }
    });
    dispatch({ type: "CLEAR_MESSAGE_BEING_TYPED" });
    return api
      .post(`/api/messages`, {
        receiver_id,
        message,
        hash
      })
      .then(res => {
        dispatch({
          type: "UPDATE_SENT_CHAT",
          payload: {
            ...messageMock,
            ...res.data.message_data,
            sendingStatus: "success"
          }
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "SET_SENDING_CHAT",
          payload: {
            ...messageMock,
            sendingStatus: "failed"
          }
        });
      });
  };
};

export const fetchChat = ({ page = 1, pageSize = 1000, message_uuid } = {}) => {
  return (dispatch, getState, api) => {
    dispatch({
      type: "SET_CACHED_SELECTED_CHAT",
      payload: {
        message_uuid
      }
    });

    dispatch({
      type: "SET_LOADING_CHAT",
      payload: true
    });

    return api
      .get(
        `/api/messagethread/${message_uuid}?page=${page}&pageSize=${pageSize}`
      )
      .then(res => {
        dispatch({
          type: "SET_LOADING_CHAT",
          payload: false
        });

        dispatch({
          type: "SET_SELECTED_CHAT",
          payload: {
            ...res.data,
            message_uuid
          }
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "SET_LOADING_CHAT",
          payload: false
        });
      });
  };
};

export const fetchBroadcasts = ({
  page = 1,
  pageSize = BROADCASTS_PAGE_SIZE
} = {}) => {
  return (dispatch, getState, api) => {
    dispatch({
      type: "SET_LOADING_BROADCASTS",
      payload: true
    });

    return api
      .get(
        `/api/messagethread?type=broadcast&page=${page}&pageSize=${pageSize}`
      )
      .then(res => {
        dispatch({
          type: "SET_LOADING_BROADCASTS",
          payload: false
        });

        dispatch({
          type: "SET_BROADCASTS",
          payload: res.data
        });
      })
      .catch(() => {
        dispatch({
          type: "SET_LOADING_BROADCASTS",
          payload: false
        });
      });
  };
};
