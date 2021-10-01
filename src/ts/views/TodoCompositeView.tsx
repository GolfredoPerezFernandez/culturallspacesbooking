/*
* TodoCompositeView.tsx
* Copyright: Microsoft 2018
*
* Main view that provides a composite view of todos on the left and
* details of the selected todo on the right.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import NavContextStore from '../stores/NavContextStore';
import * as NavModels from '../models/NavModels';
import { Colors, Fonts, FontSizes } from '../app/Styles';

import CreateTodoPanel from './CreateTodoPanel';
import TodoListPanel from './TodoListPanel';
import TodoListPanel2 from './TodoListPanel2';
import ViewTodoPanel from './ViewTodoPanel';
import { HomeHook } from './HomeHook';
import { PartnerHook } from './PartnerHook';
import { ChatHook } from './ChatHook';

import { InvolveHook } from './InvolveHook';
import { AboutHook } from './AboutHook';

import * as UI from '@sproutch/ui';
import TodoListPanel3 from './TodoListPanel3';
import CurrentUserStore from '../stores/CurrentUserStore';
import { RoadHook } from './RoadHook';
import { DocsHook } from './DocsHook';

interface Entries {
    img: string;
    imgText: string;
    title: string;
    content: string;
}


interface userMoralis {
    username: string;
    email: string;
    createdAt: string;
    sessionToken: string;
    userId: number;
    emailVerified: boolean;
    updatedAt: string;
    avatar: string;
    objectId: string;
}

export interface TodoCompositeViewProps extends RX.CommonProps {
    navContext: NavModels.TodoRootNavContext;
    entries: Entries[];
    isStackNav: boolean;
    user: userMoralis;
    isLogin: boolean;
    width: number;
    ownerId: number;
    username: string;
    owner: string;
    mensajes: any;
    autores: any;
    isConnect: boolean;
    showSideMenu: boolean;
    lenguage: string;
}

interface TodoCompositeViewState {
    activeId: string;
}

const _styles = {
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size14,
        color: 'white',
    }),
    viewContainer: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
    }),
    leftPanelContainer: RX.Styles.createViewStyle({

        flexDirection: 'column',
    }),
    leftPanelContainer2: RX.Styles.createViewStyle({
        width: 400,
        flexDirection: 'column',
    }),
    rightPanelContainer: RX.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.grayF8,
    }),
};

import { translate } from './translate';
import { TermsHook } from './TermsHook';
import ChatPanel from './ChatPanel';
import { RechargeHook } from './RechargeHook';
import { StripeHook } from './StripeHook';

export default class TodoCompositeView extends ComponentBase<TodoCompositeViewProps, TodoCompositeViewState> {
    protected _buildState(props: TodoCompositeViewProps, initState: boolean): Partial<TodoCompositeViewState> | undefined {
        const partialState: Partial<TodoCompositeViewState> = {
            activeId: CurrentUserStore.getActive(),

        };
        return partialState;
    }
    render(): JSX.Element | null {
        return (
            <RX.View style={_styles.viewContainer}>
                <RX.View style={[_styles.leftPanelContainer, { width: this.props.showSideMenu ? 260 : 60 }]}>
                    <TodoListPanel2
                        len={this.props.lenguage}
                        showSideMenu={this.props.showSideMenu}
                        selectedTodoId={this.props.navContext.todoList.selectedTodoId || ''}
                        onSelect={this._onSelectTodo}
                        onCreateNew={this._onCreateNewTodo}
                    />

                </RX.View>

                <RX.View style={_styles.rightPanelContainer}>
                    {this._renderRightPanel()}
                </RX.View>
                {this.props.isConnect ? <RX.View style={_styles.leftPanelContainer2}>
                    <RX.View style={{ flexDirection: 'row', backgroundColor: '#434040', justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.activeId === 'all' ?
                            <UI.Button onPress={() => this.goToAll()} palette='primary' style={{ root: [{}], content: [{ borderRadius: 0, borderWidth: 0, width: 200, backgroundColor: '#434040' }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label={this.props.lenguage === 'en' ? translate.todolist.english.title1 : this.props.lenguage === 'es' ? translate.todolist.español.title1 : translate.todolist.french.title1} /> :
                            <UI.Button onPress={() => this.goToAll()} style={{ content: [{ borderRadius: 0, borderWidth: 0, width: 200, backgroundColor: '181818' }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label={this.props.lenguage === 'en' ? translate.todolist.english.title1 : this.props.lenguage === 'es' ? translate.todolist.español.title1 : translate.todolist.french.title1} />}

                        {this.state.activeId === 'My' ?
                            <UI.Button onPress={() => this.goToMy()} palette={'primary'} style={{ content: [{ borderRadius: 0, borderWidth: 0, width: 200, backgroundColor: '#434040' }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label={this.props.lenguage === 'en' ? translate.todolist1.english.title2 : this.props.lenguage === 'es' ? translate.todolist1.español.title2 : translate.todolist1.french.title2} /> :
                            <UI.Button onPress={() => this.goToMy()} style={{ content: [{ borderRadius: 0, width: 200, borderWidth: 0, backgroundColor: '181818', }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label={this.props.lenguage === 'en' ? translate.todolist1.english.title2 : this.props.lenguage === 'es' ? translate.todolist1.español.title2 : translate.todolist1.french.title2} />}
                    </RX.View>

                    {this.state.activeId === 'My' ?

                        <TodoListPanel
                            len={this.props.lenguage}
                            user={this.props.user}
                            selectedTodoId={this.props.navContext.todoList.selectedTodoId || ''}
                            onSelect={this._onSelectTodo}
                            onCreateNew={this._onCreateNewTodo}
                        /> : this.state.activeId === 'all' ?
                            <TodoListPanel3

                                user={this.props.user}
                                len={this.props.lenguage}
                                selectedTodoId={this.props.navContext.todoList.selectedTodoId || ''}
                                onSelect={this._onSelectTodo}
                                onCreateNew={this._onCreateNewTodo}
                            /> : null
                    }
                </RX.View> : null
                }
            </RX.View>
        );
    }

    private _renderRightPanel() {
        if (this.props.navContext.showNewTodoPanel) {
            return (
                <CreateTodoPanel len={this.props.lenguage} user={this.props.user} />
            );
        } else if (this.props.navContext.showHomePanel) {
            return (
                <HomeHook len={this.props.lenguage} width={this.props.width} isStackNav={this.props.isStackNav} entries={this.props.entries} />
            );
        } else if (this.props.navContext.todoList.selectedTodoId) {
            return (
                <ViewTodoPanel todoId={this.props.navContext.todoList.selectedTodoId} />
            );
        } else if (this.props.navContext.showAbout) {
            return (
                <AboutHook isStackNav={this.props.isStackNav} len={this.props.lenguage} />
            );
        } else if (this.props.navContext.showInvolve) {
            return (
                <InvolveHook isStackNav={this.props.isStackNav} len={this.props.lenguage} />
            );
        } else if (this.props.navContext.showRoad) {
            return (
                <RoadHook isStackNav={this.props.isStackNav} len={this.props.lenguage} />
            );
        } else if (this.props.navContext.showInvolve) {
            return (
                <PartnerHook isStackNav={this.props.isStackNav} len={this.props.lenguage} />
            );
        } else if (this.props.navContext.showTerms) {
            return (
                <TermsHook len={this.props.lenguage} />
            );
        } else if (this.props.navContext.showDocs) {
            return (
                <DocsHook isStackNav={this.props.isStackNav} len={this.props.lenguage} />
            );
        } else if (this.props.navContext.showChat) {
            return (
                <ChatHook isLogin={this.props.isLogin} isStackNav={this.props.isStackNav} ownerId={this.props.ownerId} userId={this.props.user.userId} username={this.props.username} owner={this.props.owner} mensajes={this.props.mensajes} autores={this.props.autores} len={this.props.lenguage} />
            );
        } else if (this.props.navContext.showRecharge) {
            return (
                <RechargeHook isStackNav={this.props.isStackNav} len={this.props.lenguage} />
            );
        } else if (this.props.navContext.showStripe) {
            return (
                <StripeHook isLogin={this.props.isLogin} isStackNav={this.props.isStackNav} len={this.props.lenguage} />
            );
        } else if (this.props.navContext.showChats) {
            return (
                <ChatPanel isLogin={this.props.isLogin} ownerId={this.props.ownerId} userId={this.props.user.userId} />
            );
        } else {
            return <HomeHook len={this.props.lenguage} width={this.props.width} isStackNav={this.props.isStackNav} entries={this.props.entries} />;
        }
    }

    private _onSelectTodo = (todoId: string) => {
        NavContextStore.navigateToTodoList(todoId, false);
    };

    private goToAll() {
        CurrentUserStore.setActive('all')
        NavContextStore.navigateToTodoList()
    };
    private goToMy() {
        CurrentUserStore.setActive('My')
        NavContextStore.navigateToTodoList()
    };

    private _onCreateNewTodo = () => {
        NavContextStore.navigateToTodoList('', true);
    };
}
