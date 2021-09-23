/*
* TodoListItem.tsx
* Copyright: Microsoft 2018
*
* Renders a list item that represents a todo item.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import HoverButton from '../controls/HoverButton';
import { Fonts, FontSizes } from '../app/Styles';
import { Todo } from '../models/TodoModels';

interface TodoListItemProps extends RX.CommonProps {
    height: number;
    todo: Todo;
    isSelected: boolean;
    lenguage: string;
    showSideMenu: boolean;
    searchString?: string;
    onPress: (todoId: string) => void;
}

interface TodoListItemState {
    heightStyle: RX.Types.ViewStyleRuleSet;
}

const _itemBorderWidth = 1;

const _styles = {
    container: RX.Styles.createButtonStyle({
        alignSelf: 'stretch',
        borderBottomWidth: _itemBorderWidth,
        borderColor: '#2B2B2B',
        backgroundColor: '#181818',
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }),
    todoNameText: RX.Styles.createTextStyle({
        flex: -1,
        fontSize: FontSizes.size16,
        font: Fonts.displayBold,
        color: '#F5F3F4',
        margin: 8,
    }),
    todoNameTextSelected: RX.Styles.createTextStyle({
        font: Fonts.displaySemibold,
        color: '#181818',
    }),
    todoImage: RX.Styles.createImageStyle({
        marginLeft: 16,
        marginRight: 4,
        height: 20,
        width: 24,
    }),
    hovering: RX.Styles.createButtonStyle({
        backgroundColor: '#434040',
    }),
    selected: RX.Styles.createButtonStyle({
        backgroundColor: '#434040',
    }),
};

import { GiThreeFriends } from "@react-icons/all-files/gi/GiThreeFriends";
import { GiBookmark } from "@react-icons/all-files/gi/GiBookmark";
import { AiFillHome } from "@react-icons/all-files/ai/AiFillHome";
import { GiRoad } from "@react-icons/all-files/gi/GiRoad";
import { FaHandshake } from "@react-icons/all-files/fa/FaHandshake";
import { ImVideoCamera } from "@react-icons/all-files/im/ImVideoCamera";
import NavContextStore from '../stores/NavContextStore';


import { translate } from './translate';

export default class TodoListItem2 extends ComponentBase<TodoListItemProps, TodoListItemState> {
    protected _buildState(props: TodoListItemProps, initState: boolean): Partial<TodoListItemState> | undefined {
        const partialState: Partial<TodoListItemState> = {
            heightStyle: RX.Styles.createViewStyle({
                height: props.height,
            }, false),
        };
        return partialState;
    }

    render(): JSX.Element | null {
        return (
            <HoverButton
                onRenderChild={this._onRenderItem}
                onPress={this._onPress} />
        );
    }

    private _onPress = (e: RX.Types.SyntheticEvent) => {
        // Prevent VirtualListView.onItemSelected from
        // being triggering in the web app.
        e.stopPropagation();
        console.log(this.props.todo.id)
        if (this.props.todo.text === 'Home') {
            NavContextStore.navigateToTodoList(undefined, false, true)
        } else if (this.props.todo.text === 'Sobre CSB') {
            NavContextStore.navigateToTodoList(undefined, false, false, false, true, false, false, false, false, false)
        } else if (this.props.todo.text === 'Involucrate') {
            NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, true, false)
        } else if (this.props.todo.text === 'Trayectoria') {
            NavContextStore.navigateToTodoList(undefined, false, false, false, false, true)
        } else if (this.props.todo.text === 'Partner') {
            NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, true)
        } else if (this.props.todo.text === 'Socios') {
            NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, true)
        } else if (this.props.todo.text === 'Documentacion') {
            NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, true)
        } else {
            this.props.onPress(this.props.todo.id);
        }
    };
    private _onRenderItem = (isHovering: boolean) => {
        const buttonStyles = [_styles.container, this.state.heightStyle];
        if (this.props.isSelected) {
            buttonStyles.push(_styles.selected);
        } else if (isHovering) {
            buttonStyles.push(_styles.hovering);
        }

        let nameText: JSX.Element;
        const searchString = this.props.searchString ? this.props.searchString.trim().toLowerCase() : '';
        let searchSubstrIndex = -1;
        if (searchString) {
            searchSubstrIndex = this.props.todo.text.toLowerCase().indexOf(searchString);
        }

        if (searchSubstrIndex >= 0) {
            nameText = (
                <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                    <RX.Text numberOfLines={1}>
                        {this.props.todo.text.substr(0, searchSubstrIndex)}
                    </RX.Text>
                    <RX.Text style={_styles.todoNameTextSelected} numberOfLines={1}>
                        {this.props.todo.text.substr(searchSubstrIndex, searchString.length)}
                    </RX.Text>
                    <RX.Text numberOfLines={1}>
                        {this.props.todo.text.substr(searchSubstrIndex + searchString.length)}
                    </RX.Text>
                </RX.Text>
            );
        } else {
            nameText = (
                <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                    {this.props.todo.text === 'Home' ? this.props.lenguage === 'en' ? translate.sideBar.english.item1 : this.props.lenguage === 'es' ? translate.sideBar.español.item1 : translate.sideBar.french.item1 : ''}
                    {this.props.todo.text === 'Sobre CSB' ? this.props.lenguage === 'en' ? translate.sideBar.english.item2 : this.props.lenguage === 'es' ? translate.sideBar.español.item2 : translate.sideBar.french.item2 : ''}
                    {this.props.todo.text === 'Involucrate' ? this.props.lenguage === 'en' ? translate.sideBar.english.item3 : this.props.lenguage === 'es' ? translate.sideBar.español.item3 : translate.sideBar.french.item3 : ''}
                    {this.props.todo.text === 'Trayectoria' ? this.props.lenguage === 'en' ? translate.sideBar.english.item4 : this.props.lenguage === 'es' ? translate.sideBar.español.item4 : translate.sideBar.french.item4 : ''}
                    {this.props.todo.text === 'Socios' ? this.props.lenguage === 'en' ? translate.sideBar.english.item5 : this.props.lenguage === 'es' ? translate.sideBar.español.item5 : translate.sideBar.french.item5 : ''}
                    {this.props.todo.text === 'Documentacion' ? this.props.lenguage === 'en' ? translate.sideBar.english.item6 : this.props.lenguage === 'es' ? translate.sideBar.español.item6 : translate.sideBar.french.item6 : ''}

                </RX.Text>
            );
        }

        return (
            <RX.View style={buttonStyles}>
                {this.props.todo.text === 'Home' ? <AiFillHome color={'white'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.todo.text === 'Sobre CSB' ? <ImVideoCamera color={'white'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.todo.text === 'Involucrate' ? <FaHandshake color={'white'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.todo.text === 'Trayectoria' ? <GiRoad color={'white'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.todo.text === 'Socios' ? <GiThreeFriends color={'white'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.todo.text === 'Documentacion' ? <GiBookmark color={'white'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.showSideMenu ? nameText : null}
            </RX.View>
        );
    };
}
