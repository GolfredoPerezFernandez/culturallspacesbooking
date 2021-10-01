/*
* AccountMenuButton.tsx
* Copyright: Microsoft 2018
*
* Button that displays the currently-signed-in user and provides
* a popup menu that allows the user to sign out, adjust account
* settings, etc.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import SimpleMenu, { MenuItem } from '../controls/SimpleMenu';

interface AccountMenuButtonState {
    currentUserName: string;
    isHovering: boolean;
}

interface AccountMenuButtonProps {
    onPress: (todoId: string) => void;
}
const _menuPopupId = 'accountMenu';

import { AiOutlineMenuFold } from "@react-icons/all-files/ai/AiOutlineMenuFold";

import NavContextStore from '../stores/NavContextStore';
export default class AccountMenuButton extends ComponentBase<AccountMenuButtonProps, AccountMenuButtonState> {
    private _mountedButton: any;

    protected _buildState(props: AccountMenuButtonProps, initState: boolean): Partial<AccountMenuButtonState> | undefined {
        const partialState: Partial<AccountMenuButtonState> = {

        };

        return partialState;
    }

    render(): JSX.Element | null {
        return (
            <RX.View ref={this._onMountButton} onPress={this._onPress}>
                <AiOutlineMenuFold style={{ width: 25, height: 25 }} />
            </RX.View>

        );
    }

    private _onMountButton = (elem: any) => {
        this._mountedButton = elem;
    };

    private _onPress = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        RX.Popup.show({
            getAnchor: () => this._mountedButton,
            getElementTriggeringPopup: () => this._mountedButton,
            renderPopup: (anchorPosition: RX.Types.PopupPosition, anchorOffset: number, popupWidth: number, popupHeight: number) => {
                const items: MenuItem[] = [{
                    command: 'home',
                    text: 'Home',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'About',
                    text: 'Sobre CSB',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'Get',
                    text: 'Involucrate',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'Road',
                    text: 'Trayectoria',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'Partners',
                    text: 'Socios',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'Documentation',
                    text: 'Documentacion',
                }];

                return (
                    <SimpleMenu
                        menuItems={items}
                        onSelectItem={this._onSelectMenuItem}
                    />
                );
            },
            dismissIfShown: true,
        }, _menuPopupId);
    };

    private _onSelectMenuItem = (command: string) => {
        RX.Popup.dismiss(_menuPopupId);
        switch (command) {
            case 'home':
                return NavContextStore.navigateToTodoList(undefined, false, true);

            case 'About':
                return NavContextStore.navigateToTodoList(undefined, false, false, false, true, false, false, false, false);

            case 'Get':
                return NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, true, false);
            case 'Road':
                return NavContextStore.navigateToTodoList(undefined, false, false, false, false, true, false)
            case 'Partners':
                return NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, true)
            case 'Documentation':
                return NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, true)

            default:
                return NavContextStore.navigateToTodoList(undefined, false, true, false, false, false, false, false, false)
        }

        // TODO - need to implement
    };
}
