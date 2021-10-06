/**
* ViewTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import ReactAudioPlayer from 'react-audio-player';
import VideoPlayer from 'react-video-player-extended';
import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import { Colors, Fonts, FontSizes } from '../app/Styles';
import CurrentUserStore from '../stores/CurrentUserStore';
import NavContextStore from '../stores/NavContextStore';

export interface ViewTodoPanelProps extends RX.CommonProps {
    todoId: string;
}

interface userMoralis {
    username: string;
    email: string;
    createdAt: string;
    sessionToken: string;
    emailVerified: boolean;
    updatedAt: string;
    avatar: string;
    userId: number;
    csbBalance: number;
}
interface ViewTodoPanelState {
    todo: Item;
    onError: boolean;
    user: userMoralis;
    elError: string;
}

interface Item {
    id: string;
    forSale: boolean;
    type: string;
    description: string;
    name: string;
    owner: string;
    ownerEmail: string;
    ownerId: number;
    price: number;
    uri: string;
}


interface Autor {
    id: number,
    name: string,
    isTyping: boolean,
    lastSeenMessageId: number,
    bgImageUrl: string
}
const _styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        margin: 16,
    }),
    todoText: RX.Styles.createTextStyle({
        margin: 8,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
    }),
    buttonContainer: RX.Styles.createViewStyle({
        margin: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size14,
        color: Colors.menuText,
    })
};


import * as UI from '@sproutch/ui';
import { GrSend } from "@react-icons/all-files/gr/GrSend";
const Moralis = require('moralis');
Moralis.initialize("gusFz0f11qYPoyrwXeIBr8OnIwOgkNZxiF8W83KJ");
Moralis.serverURL = 'https://y8zeuawsmxmx.usemoralis.com:2053/server'

export default class ViewTodoPanel extends ComponentBase<ViewTodoPanelProps, ViewTodoPanelState> {
    protected _buildState(props: ViewTodoPanelProps, initState: boolean): Partial<ViewTodoPanelState> {
        const newState: Partial<ViewTodoPanelState> = {
            todo: CurrentUserStore.getActive() === 'all' ? CurrentUserStore.getTodoById2(props.todoId) : CurrentUserStore.getActive() === 'My' ? CurrentUserStore.getTodoById(props.todoId) : undefined,
            user: CurrentUserStore.getUser(),

        };
        return newState;
    }
    volume = 0
    isPlaying = false

    handlePlay = () => {
        this.isPlaying = true
    };
    setChatId = async () => {

        var authors: Autor[] = [
            {
                id: this.state.user.userId,
                name: this.state.user.username,
                isTyping: false,
                lastSeenMessageId: 1,
                bgImageUrl: '',
            },
            {
                id: this.state.todo.ownerId,
                name: this.state.todo.owner,
                isTyping: false,
                lastSeenMessageId: 2,
                bgImageUrl: ''
            }
        ]
        CurrentUserStore.setAutores(authors);
        const chatExists = await Moralis.Cloud.run('getUserChats', { username: this.state.user.username, owner: this.state.todo.owner })
        if (chatExists.length > 0) {
            if (chatExists[0].messages === undefined) {

                CurrentUserStore.setMensajes([])
            } else {
                CurrentUserStore.setMensajes(chatExists[0].messages)
            }
        } else {
            CurrentUserStore.setMensajes([])

        }
        CurrentUserStore.setUserName(this.state.user.username)
        CurrentUserStore.setOwner(this.state.todo.owner)
        CurrentUserStore.setOwnerId(this.state.todo.ownerId)
        NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, false, false, true)



    }
    elError = ''
    onError = false
    comprar = async () => {

        this.onError = false

        let user = Moralis.User.current()
        if (user) {
            var bal = user.get('csbBalance')
            if (bal >= this.state.todo.price) {

                user.set('csbBalance', bal - this.state.todo.price)
                await user.save()
                let username = user.get('username')
                let email = user.get('email')
                let createdAt = user.get('createdAt')
                let sessionToken = user.get('sessionToken')
                let updatedAt = user.get('updatedAt')
                let photo = user.get('avatar')
                let objId = user.get('userId')


                let newBalance = user.get('csbBalance')
                CurrentUserStore.setUser(username, email, createdAt, sessionToken, updatedAt, photo, newBalance, objId)

                NavContextStore.navigateToTodoList(undefined, false, true, false, false, false, false, false, false, false)

            } else {
                this.onError = true
                this.elError = 'Sin Fondos'

            }
        } else {

            this.onError = true
            this.elError = 'Inicie Session'

        }

    }
    handlePause = () => {

        this.isPlaying = true
    };


    handleVolume(value: any) {
        this.volume = value
    };


    render() {
        return (
            <RX.View useSafeInsets={true} style={_styles.container}>
                <RX.View style={{ flex: 35 }}>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? this.state.todo.name : ''}
                    </RX.Text>
                    {this.state.todo?.type === 'image' ? <RX.Image style={{ height: 200, width: 400 }} source={this.state.todo?.uri} /> : this.state.todo?.type === 'video' ?
                        <VideoPlayer
                            url={this.state.todo.uri}
                            isPlaying={this.isPlaying}
                            volume={this.volume}
                            onPlay={this.handlePlay}
                            onPause={this.handlePause}
                            onVolume={this.handleVolume}
                            height={'200px'}
                            width={'400px'}
                        /> : this.state.todo.type === 'audio' ?
                            <ReactAudioPlayer
                                src={this.state.todo.uri}
                                autoPlay={false}
                                controls={true}
                            /> : <RX.Text style={_styles.todoText}>
                                {'No compatible'}
                            </RX.Text>
                    }

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? this.state.todo.type : ''}
                    </RX.Text>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? this.state.todo.owner : ''}
                    </RX.Text>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? this.state.todo.ownerEmail : ''}
                    </RX.Text>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? this.state.todo.price : ''}
                    </RX.Text>    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "For Sale " + this.state.todo.forSale : ''}
                    </RX.Text>
                    <RX.View style={_styles.buttonContainer}>
                    </RX.View>
                    {this.state.todo.owner === this.state.user.username ? null : <UI.Button onPress={this.setChatId} iconSlot={iconStyle => (
                        <GrSend color={'#FF296D'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
                    )} style={{ content: [{ width: 200, borderRadius: 11, }], label: _styles.label }
                    } elevation={4} variant={"outlined"} label="Send a message" />
                    }
                    {this.state.todo.forSale === false && this.state.todo.owner === this.state.user.username ? null : <UI.Button onPress={this.comprar} iconSlot={iconStyle => (
                        <GrSend color={'#FF296D'} style={{ marginRight: 5, width: 16, height: 16 }} />
                    )} style={{ root: [{ marginTop: 20, }], content: [{ width: 200, borderRadius: 11, }], label: _styles.label }
                    } elevation={4} variant={"outlined"} label={"Comprar por " + this.state.todo.price + " csb"} />
                    }
                    <RX.Text style={_styles.todoText}>
                        {this.onError ? "Error " + this.elError : ''}
                    </RX.Text>

                </RX.View>

            </RX.View>
        );
    }

}
