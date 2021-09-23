/*
* TodoListItem.tsx
* Copyright: Microsoft 2018
*
* Renders a list item that represents a todo item.
*/

import { Chat } from '../models/IdentityModels';
import * as RX from 'reactxp';

import HoverButton from '../controls/HoverButton';
import { Fonts, FontSizes } from '../app/Styles';

const _styles = {
    container: RX.Styles.createButtonStyle({
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        width: 500,
        alignSelf: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 10, },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 1,
        paddingTop: 20,
        borderRadius: 13.79,
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderBottomWidth: 0
    }),
    todoNameText3: RX.Styles.createTextStyle({
        flex: -1,
        height: 40,
        marginBottom: 10,
        fontSize: FontSizes.size12,
        font: Fonts.displayBold,
        color: '#614AD3',
    }),
    todoNameText2: RX.Styles.createTextStyle({
        flex: -1,
        height: 40,
        marginBottom: 10,
        fontSize: FontSizes.size16,
        font: Fonts.displayBold,
        color: '#614AD3',
    }),
    todoNameText: RX.Styles.createTextStyle({
        flex: -1,
        height: 50,
        fontSize: 20,
        font: Fonts.displayBold,
        color: 'white',
    }),
    todoNameTextSelected: RX.Styles.createTextStyle({
        font: Fonts.displaySemibold,
        color: 'white',
    }),
    todoImage: RX.Styles.createImageStyle({
        flex: 1
    }),
    hovering: RX.Styles.createButtonStyle({
        backgroundColor: 'black',
    }),
    selected: RX.Styles.createButtonStyle({
        backgroundColor: "black"
    }),
};

import NavContextStore from '../stores/NavContextStore';
import CurrentUserStore from '../stores/CurrentUserStore';
import { useState } from 'react';


const Moralis = require('moralis');
Moralis.initialize("gusFz0f11qYPoyrwXeIBr8OnIwOgkNZxiF8W83KJ");
Moralis.serverURL = 'https://y8zeuawsmxmx.usemoralis.com:2053/server'

interface Autor {
    id: number,
    name: string,
    isTyping: boolean,
    lastSeenMessageId: number,
    bgImageUrl: string
}
export const ChatListItem = ({
    height,
    todo,
    isSelected,
    searchString,
    onPress,
    senderId,
    receiverId,
    username,
    noread,
    width
}: {
    height: number;
    width: number;
    todo: Chat;
    username: string;
    noread: number;
    senderId: number,
    receiverId: number,
    isSelected: boolean;
    searchString?: string;
    onPress: (todoId: number) => void;
}) => {

    const [name,] = useState('')


    async function _onPress(e: RX.Types.SyntheticEvent) {
        // Prevent VirtualListView.onItemSelected from
        // being triggering in the web app.



        const chatExists = await Moralis.Cloud.run('getUserChats', { username: todo.sender, owner: todo.receiver })
        console.log("exist " + JSON.stringify(chatExists))
        if (chatExists.length > 0) {
            var authors: Autor[] = [
                {
                    id: chatExists[0].receiverId,
                    name: todo.receiver,
                    isTyping: false,
                    lastSeenMessageId: 1,
                    bgImageUrl: '',
                },
                {
                    id: chatExists[0].senderId,
                    name: todo.sender,
                    isTyping: false,
                    lastSeenMessageId: 2,
                    bgImageUrl: ''
                }
            ]
            console.log
            CurrentUserStore.setAutores(authors);
            CurrentUserStore.setOwnerId(chatExists[0].receiverId)
            console.log("getOwnerId " + CurrentUserStore.getOwnerId())
            if (chatExists[0].messages === undefined) {

                CurrentUserStore.setMensajes([])
            } else {
                CurrentUserStore.setMensajes(chatExists[0].messages)

            }
        } else {
            CurrentUserStore.setMensajes([])

        }

        CurrentUserStore.setMessage(todo.messages)
        CurrentUserStore.setChatId(todo.id)

        CurrentUserStore.setUserName(todo.sender)
        CurrentUserStore.setOwner(todo.receiver)
        NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, false, false, true)



        e.stopPropagation();
    };
    function _onRenderItem(isHovering: boolean) {
        const buttonStyles = [_styles.container, { borderRadius: 13.79, margin: 10, width: width }, RX.Styles.createViewStyle({
            height: height,
        }, false)];
        if (isSelected) {
            buttonStyles.push(_styles.selected);
        } else if (isHovering) {
            buttonStyles.push(_styles.hovering);
        }
        let nombre = todo.receiver
        if (todo.receiver === username) {
            nombre = todo.sender
        }
        let msjText: JSX.Element;
        let nameText: JSX.Element;
        const searchString = name ? name.trim().toLowerCase() : '';
        let searchSubstrIndex = -1;
        if (searchString) {
            searchSubstrIndex = name.toLowerCase().indexOf(searchString);
        }

        msjText = (<RX.Text style={_styles.todoNameText3} numberOfLines={4}>
            {noread + ' Mensajes no leidos'}
        </RX.Text>
        )
        if (searchSubstrIndex >= 0) {
            nameText = (
                <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                    <RX.Text numberOfLines={1}>
                        {nombre.substr(0, searchSubstrIndex)}
                    </RX.Text>
                    <RX.Text style={_styles.todoNameTextSelected} numberOfLines={1}>
                        {nombre.substr(searchSubstrIndex, searchString.length)}
                    </RX.Text>
                    <RX.Text numberOfLines={1}>
                        {nombre.substr(searchSubstrIndex + searchString.length)}
                    </RX.Text>
                </RX.Text>
            );
        } else {
            nameText = (<RX.Text style={_styles.todoNameText} numberOfLines={4}>
                {nombre}
            </RX.Text>
            );
        }
        return (
            <RX.View style={buttonStyles}>


                <RX.View style={{ flex: 60, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                    {nameText}
                    {msjText}
                </RX.View>


            </RX.View>
        );
    };
    return <HoverButton
        onRenderChild={_onRenderItem}
        onPress={_onPress} />


};



