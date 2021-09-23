/**
* TodoListPanel.tsx
* Copyright: Microsoft 2018
*
* Display first screen of the Todo application.
*/

import * as _ from 'lodash';
import * as RX from 'reactxp';
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';
import { VirtualListCellRenderDetails } from 'reactxp-virtuallistview/dist/VirtualListCell';
import { ComponentBase } from 'resub';

import AppConfig from '../app/AppConfig';
import { Colors, Fonts, FontSizes } from '../app/Styles';


import TodoListItem3 from './TodoListItem3';

interface TodoListItemInfo extends VirtualListViewItemInfo {
    todo: Item;
}
interface Item {
    description: string;
    name: string;
    owner: string;
    price: number;
    ownerEmail: string;
    uri: string;
    id: string;
    forSale: boolean;
    type: string;
}


const Moralis = require('moralis');
Moralis.initialize("gusFz0f11qYPoyrwXeIBr8OnIwOgkNZxiF8W83KJ");
Moralis.serverURL = 'https://y8zeuawsmxmx.usemoralis.com:2053/server'

export interface TodoListPanelProps extends RX.CommonProps {
    selectedTodoId?: string;
    user: userMoralis;
    len: string;
    onSelect: (selectedId: string) => void;
    onCreateNew: () => void;
}
interface userMoralis {
    username: string;
    email: string;
    createdAt: string;
    sessionToken: string;
    emailVerified: boolean;
    updatedAt: string;
    avatar: string;
    objectId: string;
}

interface TodoListPanelState {
    todos: TodoListItemInfo[];
    filteredTodoList: TodoListItemInfo[];
    searchString: string;
}

const _listItemHeight = 80;

const _styles = {
    listScroll: RX.Styles.createViewStyle({
        flexDirection: 'column',
        alignSelf: 'stretch',
        backgroundColor: "#181818",
    }),
    todoListHeader: RX.Styles.createViewStyle({
        height: 60,
        borderBottomWidth: 1,
        borderColor: Colors.borderSeparator,
        flexDirection: 'row',
        alignItems: 'center',
    }),
    searchBox: RX.Styles.createTextInputStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size14,
        borderWidth: 1,
        backgroundColor: '#434040',
        borderColor: Colors.borderSeparator,
        flex: 1,
        padding: 4,
        marginHorizontal: 12,
    }),
    container: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: "#181818",
    }),
    addTodoButton: RX.Styles.createViewStyle({
        margin: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: 'row'
    }),
    buttonText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size32,
        lineHeight: 32,
        color: Colors.buttonTextColor,
    }),
    buttonTextHover: RX.Styles.createTextStyle({
        color: Colors.buttonTextHover,
    }),
    titleStyle: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: 24,
        textAlign: 'center',
        color: '#F5F3F4',
        marginTop: 10,
        alignSelf: 'flex-start'
    }),
    titleStyle2: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: 16,
        textAlign: 'center',
        color: '#F5F3F4',
        alignSelf: 'center'
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size14,
        color: 'white',
    })
};

import { translate } from './translate';

import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import * as UI from '@sproutch/ui';
import CurrentUserStore from '../stores/CurrentUserStore';

export default class TodoListPanel3 extends ComponentBase<TodoListPanelProps, TodoListPanelState> {
    protected _buildState(props: TodoListPanelProps, initState: boolean): Partial<TodoListPanelState> | undefined {
        const partialState: Partial<TodoListPanelState> = {

        };

        partialState.todos = CurrentUserStore.getAllItems().map((todo, i) => ({
            key: i.toString(),
            height: _listItemHeight,
            template: 'todo',
            todo,
        }));

        if (initState) {
            partialState.searchString = '';
            partialState.filteredTodoList = partialState.todos;
        } else {
            const filter = _.trim(partialState.searchString);
            if (filter) {
                partialState.filteredTodoList = this._filterTodoList(partialState.todos, filter);
            } else {
                partialState.filteredTodoList = partialState.todos;
            }
        }

        return partialState;
    }

    render() {
        return (
            <RX.View useSafeInsets={true} style={_styles.container}>

                <RX.View style={_styles.todoListHeader}>

                    <RX.Text style={[_styles.titleStyle, { width: 200 }]}>{this.props.len === 'en' ? translate.todolist.english.title2 : this.props.len === 'es' ? translate.todolist.español.title2 : translate.todolist.french.title2}</RX.Text>
                    <UI.Button onPress={this._onPressCreateNewTodo} iconSlot={iconStyle => (
                        <AiOutlinePlus color={'white'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
                    )} style={{ content: [{ width: 160, borderRadius: 11, }], label: _styles.label }
                    } elevation={4} variant={"outlined"} label={this.props.len === 'en' ? translate.todolist.english.ButtomNew : this.props.len === 'es' ? translate.todolist.español.ButtomNew : translate.todolist.french.ButtomNew} />

                </RX.View>
                <RX.View style={_styles.todoListHeader}>

                    <RX.TextInput
                        style={_styles.searchBox}
                        value={this.state.searchString}
                        autoFocus={!AppConfig.isTouchInterface()}
                        placeholder={this.props.len === 'en' ? translate.todolist.english.search : this.props.len === 'es' ? translate.todolist.español.search : translate.todolist.french.search}
                        onChangeText={this._onChangeTextSearch}
                        autoCapitalize={'none'}
                    />
                </RX.View>

                <VirtualListView
                    itemList={this.state.filteredTodoList}
                    renderItem={this._renderItem}
                    style={_styles.listScroll}
                />
            </RX.View>
        );
    }

    private _onChangeTextSearch = (newValue: string) => {
        const filteredTodoList = this._filterTodoList(this.state.todos, newValue.trim());
        this.setState({
            filteredTodoList,
            searchString: newValue,
        });
    };

    private _filterTodoList(sortedTodos: TodoListItemInfo[], searchString: string): TodoListItemInfo[] {
        const lowerSearchString = searchString.toLowerCase();

        return _.filter(sortedTodos, item => {
            const todoLower = item.todo.name.toLowerCase();
            return todoLower.search(lowerSearchString) >= 0;
        });
    }

    private _renderItem = (details: VirtualListCellRenderDetails<TodoListItemInfo>) => {
        const item = details.item;
        return (
            <TodoListItem3
                todo={item.todo}
                height={_listItemHeight}
                isSelected={item.todo.id === this.props.selectedTodoId}
                searchString={this.state.searchString}
                onPress={this._onPressTodo}
            />
        );
    };

    private _onPressTodo = (todoId: string) => {
        this.props.onSelect(todoId);
        this.setState({
            searchString: '',
            filteredTodoList: this.state.todos,
        });
    };

    private _onPressCreateNewTodo = () => {
        this.props.onCreateNew();
        this.setState({
            searchString: '',
            filteredTodoList: this.state.todos,
        });
    };
}
