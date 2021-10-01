

/**
* TodoListPanel.tsx
* Copyright: Microsoft 2018
*
* Display first screen of the Todo application.
*/

import * as _ from 'lodash';
import * as RX from 'reactxp';
import { VirtualListViewItemInfo } from 'reactxp-virtuallistview';
import { ComponentBase } from 'resub';



import ResponsiveWidthStore from '../stores/ResponsiveWidthStore';
interface TodoListItemInfo extends VirtualListViewItemInfo {
    todo: Chat;
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
import { Chat } from '../models/IdentityModels';
import CurrentUserStore from '../stores/CurrentUserStore';
import { ChatQuery } from './ChatQuery';
export interface TodoListPanelProps extends RX.CommonProps {
    selectedTodoId?: number;
    ownerId: number;
    userId: number;
    isLogin: boolean;
}


interface TodoListPanelState {
    todos: TodoListItemInfo[];
    filteredTodoList: TodoListItemInfo[];
    searchString: string;
    width: number;
    height: number;
    isLogin: boolean;
    user: userMoralis;
    ownerId: number;
}

export default class ChatPanel extends ComponentBase<TodoListPanelProps, TodoListPanelState> {

    protected _buildState(props: TodoListPanelProps, initState: boolean): Partial<TodoListPanelState> {

        const partialState: Partial<TodoListPanelState> = {
            width: ResponsiveWidthStore.getWidth(),
            user: CurrentUserStore.getUser(),
            height: ResponsiveWidthStore.getHeight(),
        };
        partialState.todos = CurrentUserStore.getUserChat()?.map((todo, i) => ({
            key: i.toString(),
            height: 100,
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
            <RX.View style={{ backgroundColor: '#01012A', justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1 }}>
                <ChatQuery isLogin={this.props.isLogin} username={this.state.user.username} ownerId={this.props.ownerId} userId={this.props.userId} height={this.state.height} width={this.state.width} _listItemHeight={100} filterChat={this.state.filteredTodoList} />

            </RX.View>
        );

    }


    private _filterTodoList(sortedTodos: TodoListItemInfo[], searchString: string): TodoListItemInfo[] {
        const lowerSearchString = searchString.toLowerCase();

        return _.filter(sortedTodos, item => {
            const todoLower = item.todo.sender.toLowerCase();
            return todoLower.search(lowerSearchString) >= 0;
        });
    }

}
