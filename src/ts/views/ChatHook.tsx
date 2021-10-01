
import * as UI from '@sproutch/ui';
import React = require('react');
import {
  ChatFeed,
  Message,
  Author,
  ChatBubbleProps,
  ChatBubbleStyles,
  LastSeenAvatarStyles,
  AvatarStyles,
} from 'react-bell-chat'

const Moralis = require('moralis');
Moralis.initialize("gusFz0f11qYPoyrwXeIBr8OnIwOgkNZxiF8W83KJ");
Moralis.serverURL = 'https://y8zeuawsmxmx.usemoralis.com:2053/server'

//import { Chat } from '../models/IdentityModels';
interface ChatState {
  authors: Author<string>[];
  messages: any[];
  useCustomBubble: boolean;
  currentUser: number;
  messageText: string;
  simulateTyping: boolean;
  showAvatar: boolean;
  showLastSeen: boolean;
  showDateRow: boolean;
  showIsTyping: boolean;
  showLoadingMessages: boolean;
  hasOldMessages: boolean;
  firstAuthorTimer: number | undefined;
  secondAuthorTimer: number | undefined;
  useCustomStyles: boolean;
  useAvatarBg: boolean;
  useCustomIsTyping: boolean;
  showMsgProgress: boolean;
}
import { useDebouncedCallback } from 'use-debounce';

interface Autor {
  id: number,
  name: string,
  isTyping: boolean,
  lastSeenMessageId: number,
  bgImageUrl: string
}
export const ChatHook = ({
  len, isLogin,
  isStackNav,
  mensajes,
  autores,
  username,
  userId,
  ownerId,
  owner,
}: {
  len: string;
  mensajes: any;
  isLogin: boolean,
  autores: Autor[];
  userId: number;
  isStackNav: boolean,
  ownerId: number;
  username: string;
  owner: string;
}) => {

  const style: React.CSSProperties = {
    backgroundColor: 'white',
    width: 400,
    height: 500,

  };

  const lastSeenAvatarStyles: LastSeenAvatarStyles = {
    container: {
      boxShadow: '#cacaca 0px 0px 10px 0px, rgb(187 187 187) 0px 0px 2px 0',
      backgroundColor: 'white',
      overflow: 'hidden',
    },
  };

  const avatarStyles: AvatarStyles = {
    container: {
      boxShadow: '#cacaca 0px 0px 20px 0px, rgb(187 187 187) 0px 0px 2px 0',
      backgroundColor: 'white',
      overflow: 'hidden',
    },
  };


  const chatBubbleStyles: ChatBubbleStyles = {
    chatBubble: {
      boxShadow: 'rgb(187 187 187) 0px 0px 2px 0',
    },
    recipientChatBubble: {
      backgroundColor: 'white',
    },
    userChatBubble: {
      color: 'white',
      backgroundColor: 'rgb(0, 132, 255)',
    },
  };

  const [
    {
      messageText,
      authors,
      currentUser,
      hasOldMessages,
      showAvatar,
      messages,
      showDateRow,
      showIsTyping,
      showLastSeen,
      showLoadingMessages,
      useCustomBubble,

      useCustomStyles,
      showMsgProgress,
    },
    setState,
  ] = React.useState<ChatState>({
    authors: autores,
    messages: mensajes,
    useCustomBubble: false,
    currentUser: userId,
    messageText: '',
    simulateTyping: false,
    showAvatar: true,
    showDateRow: true,
    showLastSeen: true,
    showIsTyping: true,
    showLoadingMessages: true,
    hasOldMessages: true,
    firstAuthorTimer: undefined,
    secondAuthorTimer: undefined,
    useCustomStyles: true,
    useAvatarBg: true,
    useCustomIsTyping: true,
    showMsgProgress: false,
  });

  const [isdisable, setDisable] = React.useState(false)
  const chat: any = React.useRef();
  const handleIsCurrentTyping = React.useCallback(() => {
    if (currentUser !== 0) {
      setState(prev => ({
        ...prev,

      }));
    }
  }, [currentUser]);

  const handleIsTypingDebounced = React.useCallback(
    useDebouncedCallback(handleIsCurrentTyping, 700, {
      leading: true,
      trailing: true,
    }),
    [handleIsCurrentTyping]
  );
  const onMessageChange = React.useCallback(
    (e: string) => {
      const newMessage = e;
      setState(prev => ({
        ...prev,
        messageText: newMessage,
        authors: showMsgProgress
          ? prev.authors
            .slice(0)
            .map((a, i) =>
              i === currentUser ? a : { ...a, isTypingMessage: newMessage }
            )
          : prev.authors,
      }));
      handleIsTypingDebounced();
    },
    [handleIsTypingDebounced, currentUser, showMsgProgress]
  );

  useEffect(() => {
    setState(prev => ({
      ...prev,

      messageText: '',
      messages: mensajes,
    }));

    chat.current?.onMessageSend?.();

  }, [mensajes.length])

  useEffect(() => {
    if (!isLogin) {
      NavContextStore.navigateToTodoList(undefined, false, true)
    }
  }, [])

  const onMessageSubmit = React.useCallback(
    async (e: RX.Types.SyntheticEvent) => {
      setDisable(true)
      if (messageText !== '') {
        const id = Number(new Date());
        const newMessage: Message = {
          id,
          authorId: currentUser,
          message: messageText,
          createdOn: new Date(),
          isSend: true,
        };
        var oldMenssages = [...mensajes]

        if (mensajes.length == 0) {

          var oldMenssages2 = mensajes.concat(newMessage)
          const Chat = Moralis.Object.extend("Chat")
          const chat = new Chat()
          chat.set("messages", oldMenssages2)
          chat.set("sender", username)
          chat.set("receiver", owner)
          chat.set("receiverId", ownerId.toString())
          chat.set("senderId", userId)
          const now = Date.now().valueOf();
          chat.set("chatId", now.toString())

          await chat.save().then(async (chat: any) => {
            // Execute any logic that should take place after the object is saved.
            setDisable(false)

          }, (error: any) => {
            // Execute any logic that should take place if the save fails.
            // error is a Moralis.Error with an error code and message.
            console.log('Failed to create new object, with error code: ' + error.message);
          });
        } else {
          setState(previousState => ({
            ...previousState,
            messageText: '',
          }));

          await Moralis.Cloud.run('addMessage', { username: username, owner: owner, ownerId, userId, newMessage, oldMenssages })
          setDisable(false)


        }
      }
      e.preventDefault();
      return true;
    },
    [messageText, currentUser]
  );

  return (<RX.View style={{ flex: 1, backgroundColor: '#434040', alignItems: 'center', justifyContent: 'center' }}>
    <UI.Paper elevation={10} style={{ root: { justifyContent: 'center', alignItems: 'center', borderRadius: 18, width: isStackNav ? 400 : 700, height: isStackNav ? 500 : 600, } }} >
      <ChatFeed
        ref={chat}
        yourAuthorId={userId}
        messages={messages}
        authors={authors}
        style={useCustomStyles ? style : undefined}
        avatarStyles={useCustomStyles ? avatarStyles : undefined}
        lastSeenAvatarStyles={
          useCustomStyles ? lastSeenAvatarStyles : undefined
        }
        chatBubbleStyles={useCustomStyles ? chatBubbleStyles : undefined}
        maxHeight={550}
        CustomChatBubble={useCustomBubble ? customBubble : undefined}

        showRecipientAvatar={showAvatar}
        showIsTyping={showIsTyping}
        showRecipientLastSeenMessage={showLastSeen}
        showDateRow={showDateRow}
        showLoadingMessages={showLoadingMessages}
        hasOldMessages={hasOldMessages}
      />
      <RX.View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <RX.TextInput value={messageText} onChangeText={onMessageChange} placeholder="Type a message..."
          style={{ width: 400, height: 47, borderRadius: 11, borderWidth: 1 }}></RX.TextInput>
        <RX.Button disabled={isdisable} onPress={onMessageSubmit} style={{ backgroundColor: 'lightblue', marginLeft: 10, marginTop: 10, marginBottom: 10, borderRadius: 11, width: 80, justifyContent: 'center', alignItems: 'center', height: 40 }}>{'send'}</RX.Button>
      </RX.View>
    </UI.Paper>
  </RX.View >);

};

const customBubble: React.FC<ChatBubbleProps<string>> = props => (
  <div className="mb-2">
    <span>
      {props.author &&
        props.author.name +
        ' ' +
        (props.message.authorId !== props.yourAuthorId ? 'says' : 'said') +
        ': '}
    </span>
    <span className={props.classes?.text}>{props.message.message}</span>
  </div>
);
import * as RX from 'reactxp'
import { useEffect } from 'react';
import NavContextStore from '../stores/NavContextStore';
//import CurrentUserStore from '../stores/CurrentUserStore';

