

import { Fonts, } from '../app/Styles';

const _styles = {

  buttomStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  searchBox: RX.Styles.createTextInputStyle({
    font: Fonts.displayRegular,
    fontSize: 14,
    color: 'white',
    borderWidth: 1,
    borderColor: '#252568',
    backgroundColor: '#252568',
    flex: 1,
    padding: 4,
    marginHorizontal: 24,
    borderRadius: 11,
    paddingLeft: 15,
  }),
  TextBtn3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 17,
    color: 'white',
  }),
  todoListHeader: RX.Styles.createViewStyle({
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  container: RX.Styles.createViewStyle({
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#01012A',
  }),
  listScroll: RX.Styles.createViewStyle({
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  }),
};



import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

import { VirtualListCellRenderDetails } from 'reactxp-virtuallistview/dist/VirtualListCell';
export const ChatQuery = ({
  filterChat,
  _listItemHeight,
  height,
  width,
  userId,
  isLogin,
  ownerId,
  username,
}: {
  filterChat: TodoListItemInfo[];
  _listItemHeight: number,
  height: number,
  userId: number,
  ownerId: number,
  isLogin: boolean,
  username: string,
  width: number,
}) => {

  const _renderItem = useCallback((details: VirtualListCellRenderDetails<TodoListItemInfo>) => {
    console.log('ownerId ' + ownerId)
    return <ChatListItem
      noread={0}
      username={username}
      todo={details?.item.todo ?? {}}
      width={500}
      senderId={userId}
      receiverId={ownerId}
      height={90}
      isSelected={false}
      searchString={''}
      onPress={(todoId: number) => {
      }} />

  }, [])


  useEffect(() => {
    if (!isLogin) {
      NavContextStore.navigateToTodoList(undefined, false, true)
    }
  }, [])
  return (<RX.View useSafeInsets={true} style={_styles.container}>
    {filterChat.length === 0 ?
      <RX.Text style={[_styles.buttomStyle, [{
        marginTop: 200,
      }]]}>{"Aun no has comenzado un chat"}</RX.Text> :
      <VirtualListView
        itemList={filterChat}
        renderItem={_renderItem}
        style={[_styles.listScroll,
        ]}
      />}

  </RX.View>
  )

};



import * as IdentityModels from '../models/IdentityModels';
interface TodoListItemInfo extends VirtualListViewItemInfo {
  todo: IdentityModels.Chat;
}

import * as RX from 'reactxp'

import { useCallback, useEffect } from 'react';
import { ChatListItem } from './ChatListItem';
import NavContextStore from '../stores/NavContextStore';

