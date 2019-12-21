import { transformArray } from '../../lib/helpers'
import { CHATS_PAGE_SIZE } from '../../lib/constants'

const paginationOptions = (options = {}) => ({
  total: options.total || 0,
  current: options.page,
  pageSize: CHATS_PAGE_SIZE
})

const initSelectedChat = () => ({
  byIds: [],
  all: {},
  isLoadingChat: false,
  pagination: paginationOptions(),
  isViewing: false,
  messageBeingTyped: '',
  hash: null,
  messageUuid: null,
  typingWhisperDirection: null
})

const INITIAL_STATE = {
  isShowingChatForm: false,
  isLoadingChatUsers: false,
  recipient: {},
  chats: {
    byIds: [],
    all: {},
    isLoadingChats: false,
    pagination: paginationOptions()
  },
  chatThreads: {},
  selectedChat: initSelectedChat(),
  selectedBroadcast: {},
  broadcasts: {
    byIds: [],
    all: {},
    isLoadingBroadcasts: false,
    pagination: paginationOptions()
  },
  users: {
    byIds: [],
    all: {}
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CHAT_FORM_VISIBILITY': {
      return {
        ...state,
        isShowingChatForm: action.payload
      }
    }
    case 'SET_CHAT_RECIPIENT': {
      const payload = action.payload.id === state.recipient.id ? {} : action.payload

      return {
        ...state,
        recipient: {
          ...payload
        }
      }
    }
    case 'SET_LOADING_CHAT_USERS': {
      return {
        ...state,
        isLoadingChatUsers: action.payload
      }
    }
    case 'SET_LOADING_CHATS': {
      return {
        ...state,
        chats: {
          ...state.chats,
          isLoadingChats: action.payload
        }
      }
    }
    case 'SET_LOADING_CHAT': {
      const selectedChat = {
        ...state.selectedChat,
        isLoadingChat: action.payload
      }
      return {
        ...state,
        selectedChat
      }
    }
    case 'SET_LOADING_BROADCAST': {
      const selectedBroadcast = {
        ...state.selectedBroadcast,
        isLoading: action.payload,
        isViewing: false
      }
      return {
        ...state,
        selectedBroadcast
      }
    }
    case 'SET_LOADING_BROADCASTS': {
      return {
        ...state,
        broadcasts: {
          ...state.broadcasts,
          isLoadingBroadcasts: action.payload
        }
      }
    }
    case 'SET_CHATS': {
      return {
        ...state,
        chats: {
          ...state.chats,
          ...transformArray(action.payload.data, 'messageUuid'),
          pagination: paginationOptions({
            page: action.payload.page,
            pageSize: action.payload.pageSize,
            total: action.payload.data.total
          })
        }
      }
    }
    case 'SET_CACHED_SELECTED_CHAT': {
      return {
        ...state,
        selectedChat: {
          ...state.selectedChat,
          ...(state.chatThreads[action.payload.messageUuid] || initSelectedChat())
        }
      }
    }
    case 'START_NEW_CHAT': {
      const chats = { ...state.chats }

      const chatMsgMock = {
        sender: action.payload.sender,
        receiver: action.payload.receiver,
        id: null,
        messageUuid: null,
        sender_id: action.payload.sender.id,
        receiver_id: action.payload.receiver.id,
        hash: action.payload.hash,
        message: null,
        title: null,
        message_type: 'chat',
        read: 0,
        created_at: null,
        updated_at: null,
        formatted_date: null
      }

      chats.byIds = [action.payload.hash, ...chats.byIds]

      chats.all[action.payload.hash] = chatMsgMock

      return {
        ...state,
        chats,
        selectedChat: {
          ...initSelectedChat(),
          isViewing: true,
          hash: action.payload.hash
        },
        chatThreads: {
          ...state.chatThreads,
          [action.payload.hash]: {
            ...initSelectedChat(),
            hash: action.payload.hash
          }
        }
      }
    }
    case 'SET_MESSAGE_BEING_TYPED': {
      // console.log(action.payload);
      const selectedChat = {
        ...state.selectedChat,
        messageBeingTyped: action.payload
      }
      // TODO: update the chatthreads
      return {
        ...state,
        selectedChat
        // chatThreads: {
        //   ...state.chatThreads
        // }
      }
    }
    case 'SET_SELECTED_CHAT_TYPING_WHISPER_DIRECTION': {
      const selectedChat = {
        ...state.selectedChat,
        typingWhisperDirection: action.payload
      }
      return {
        ...state,
        selectedChat
        // chatThreads: {
        //   ...state.chatThreads,
        //   [messageUuid]: {
        //     ...(state.chatThreads[messageUuid] || {}),
        //     ...selectedChat
        //   }
        // }
      }
    }
    case 'SET_SELECTED_CHAT': {
      const { byIds, all } = transformArray(action.payload.data)
      const { messageUuid } = action.payload
      const selectedChat = {
        ...state.selectedChat,
        all,
        messageUuid,
        byIds: byIds.reverse(),
        isViewing: true,
        pagination: paginationOptions({
          page: action.payload.page,
          pageSize: action.payload.pageSize,
          total: action.payload.data.total
        })
      }

      return {
        ...state,
        selectedChat,
        chatThreads: {
          ...state.chatThreads,
          [messageUuid]: {
            ...(state.chatThreads[messageUuid] || {}),
            ...selectedChat
          }
        }
      }
    }
    case 'SET_SELECTED_BROADCAST': {
      // const { byIds, all } = transformArray(action.payload.data)
      const selectedBroadcastData = (action.payload.data || [{}])[0]
      // const { messageUuid } = action.payload
      const selectedBroadcast = {
        ...state.selectedBroadcast,
        ...selectedBroadcastData,
        // all,
        // messageUuid,
        // byIds: byIds.reverse(),
        isViewing: true,
        pagination: paginationOptions({
          page: action.payload.page,
          pageSize: action.payload.pageSize,
          total: action.payload.data.total
        })
      }

      return {
        ...state,
        selectedBroadcast
        // chatThreads: {
        //   ...state.chatThreads,
        //   [messageUuid]: {
        //     ...(state.chatThreads[messageUuid] || {}),
        //     ...selectedChat
        //   }
        // }
      }
    }
    case 'CLEAR_MESSAGE_BEING_TYPED': {
      // TODO: also clear/set chat thresds
      return {
        ...state,
        selectedChat: {
          ...state.selectedChat,
          messageBeingTyped: '',
          typingWhisperDirection: null
        }
      }
    }
    case 'SET_SENDING_CHAT': {
      // update the byids of the selected chat
      const byIds = Array.from(new Set([...state.selectedChat.byIds, action.payload.hash]))
      // update the all key with the hash of the new chat
      const all = {
        ...state.selectedChat.all,
        [action.payload.hash]: action.payload
      }

      // store the selectedChat in the chatthreads

      const selectedChat = {
        ...state.selectedChat,
        byIds,
        all,
        isViewing: true
      }

      return {
        ...state,
        selectedChat,
        chatThreads: {
          ...state.chatThreads,
          [action.payload.hash]: {
            ...(state.chatThreads[action.payload.hash] || {}),
            ...selectedChat
          }
        }
      }
    }
    case 'UPDATE_SENT_CHAT': {
      const firstSelectedChatMsg = state.selectedChat.byIds[0]
      const chats = { ...state.chats }
      // TODO: handle state update for new chats/threads
      if (
        firstSelectedChatMsg &&
        state.selectedChat.all[firstSelectedChatMsg].messageUuid === action.payload.messageUuid
      ) {
        // if the message uuid of the selected chat is sams as action.payload.messageUuid
        // then update the all key, deleting the 'hash' and adding the id from payload.id
        // p.splice(p.indexOf('438'), 1)
        let byIds = [...state.selectedChat.byIds]
        const all = { ...state.selectedChat.all }

        // if message uuid exist already, no need
        if (all[action.payload.id]) return state

        // uodate thw ids
        if (byIds.indexOf(+action.payload.hash) > -1) {
          byIds.splice(byIds.indexOf(+action.payload.hash), 1)
        }

        byIds = Array.from(new Set([...byIds, action.payload.id]))

        // update the all object
        delete all[action.payload.hash]
        all[action.payload.id] = action.payload

        const selectedChat = {
          ...state.selectedChat,
          byIds,
          all,
          typingWhisperDirection: null
          // isViewing: true,
        }

        // delete prev chatthread taht was using hash
        delete state.chatThreads[action.payload.hash]
        chats.all[action.payload.messageUuid] = action.payload
        chats.byIds = Array.from(new Set([action.payload.messageUuid, ...chats.byIds]))

        return {
          ...state,
          selectedChat,
          chats,
          chatThreads: {
            ...state.chatThreads,
            [action.payload.messageUuid]: {
              ...selectedChat
            }
          }
        }
      }
      // if (
      //   firstSelectedChatMsg &&
      //   state.selectedChat.all[firstSelectedChatMsg].messageUuid !== action.payload.messageUuid
      // ) {
      const chatThreads = { ...state.chatThreads }
      let selectedChat = { ...state.selectedChat }

      if (chatThreads[action.payload.messageUuid]) {
        const chatThread = {
          ...chatThreads[action.payload.messageUuid]
        }

        let byIds = [...chatThread.byIds]
        const all = { ...chatThread.all }

        // uodate thw ids
        if (byIds.indexOf(+action.payload.hash) > -1) {
          byIds.splice(byIds.indexOf(+action.payload.hash), 1)
        }
        byIds = Array.from(new Set([...byIds, action.payload.id]))

        // update the all object
        delete all[action.payload.hash]
        all[action.payload.id] = action.payload

        chats.all[action.payload.messageUuid] = action.payload
        chats.byIds = Array.from(new Set([action.payload.messageUuid, ...chats.byIds]))

        return {
          ...state,
          chats,
          chatThreads: {
            ...state.chatThreads,
            [action.payload.messageUuid]: {
              ...chatThread,
              all,
              byIds,
              typingWhisperDirection: null
            }
          }
        }
      }

      // If there's no chat thread its probaly a new chat,
      // so try using the hash and uodating it rto messageUuid
      if (!chatThreads[action.payload.messageUuid]) {
        const { byIds, all } = transformArray([action.payload])
        let newSelectedChat
        selectedChat = {
          ...selectedChat,
          byIds,
          all,
          typingWhisperDirection: null
        }
        chatThreads[action.payload.messageUuid] = selectedChat
        // dlete the hash from the chat theads
        delete chatThreads[action.payload.hash]
        const index = chats.byIds.indexOf(action.payload.hash)
        if (index >= 0) {
          chats.byIds.splice(index, 1)
        }

        chats.all[action.payload.messageUuid] = action.payload
        chats.byIds = Array.from(new Set([action.payload.messageUuid, ...chats.byIds]))
        if (
          action.payload.messageUuid === state.selectedChat.messageUuid ||
            action.payload.hash === state.selectedChat.hash
        ) {
          newSelectedChat = { ...selectedChat }
        } else {
          newSelectedChat = { ...state.selectedChat }
        }
        return {
          ...state,
          chats,
          selectedChat: newSelectedChat,
          chatThreads
        }
      }
      // }
      return state
    }
    case 'CLEAR_SELECTED_CHAT': {
      return {
        ...state,
        selectedChat: initSelectedChat()
      }
    }
    case 'SET_BROADCASTS': {
      return {
        ...state,
        broadcasts: {
          ...state.broadcasts,
          ...transformArray(action.payload.data, 'messageUuid'),
          pagination: paginationOptions({
            page: action.payload.page,
            pageSize: action.payload.pageSize,
            total: action.payload.data.total
          })
        }
      }
    }
    case 'SET_CHAT_USERS': {
      return {
        ...state,
        users: {
          ...transformArray(action.payload.data)
        }
      }
    }
    default:
      return state
  }
}

export const getChatUsers = state => state.chat.users.byIds.map(id => state.chat.users.all[id])

export const getAllChats = state => state.chat.chats.byIds.map(id => state.chat.chats.all[id])

export const getAllBroadcasts = state =>
  state.chat.broadcasts.byIds.map(id => state.chat.broadcasts.all[id])

export const getSelectedChatThread = state =>
  state.chat.selectedChat.byIds.map(id => {
    const chat = state.chat.selectedChat.all[id]
    // console.log(chat, id);
    return {
      ...chat,
      msg: chat.message,
      time: chat.created_at ? chat.created_at.split(' ')[1] : chat.sendingStatus,
      origin: state.user.id === chat.sender.id ? 'to' : 'from'
    }
  })
