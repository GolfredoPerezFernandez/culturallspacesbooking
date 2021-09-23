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

import SimpleMenu1, { MenuItem } from '../controls/SimpleMenu1';
import { Colors, Fonts, FontSizes, } from '../app/Styles';

const _styles = {
    background: RX.Styles.createViewStyle({
        height: 75,
        borderBottomWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        flexDirection: 'row',
    }),
    logoContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        marginLeft: 5,
        alignItems: 'flex-start',
    }),
    barControlsContainer: RX.Styles.createViewStyle({
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }),
    logoImage: RX.Styles.createImageStyle({
        height: 24,
        width: 26,
    }),
    logoText: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size20,
        marginLeft: 10,
        color: Colors.logoColor,
    }),
    logoText2: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size20,
        marginLeft: 0,
        color: '#FF296D',
    }),
    linkText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.menuItem,
        marginHorizontal: 8,
        color: Colors.menuText,
    }),
    linkTextHover: RX.Styles.createTextStyle({
        color: Colors.menuTextHover,
    }),
    backButtonContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
    }),
    backText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size16,
        color: Colors.menuText,
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size14,
        color: 'white'
    })
}
interface AccountMenuButtonState {
    currentUserName: string;
    isHovering: boolean;
}

interface AccountMenuButtonProps {
    isStackNav: boolean;
    onPress: (todoId: string) => void;
    csbBalance: number;
}
const _menuPopupId = 'accountMenu';


const Moralis = require('moralis');
Moralis.initialize("PC9sjzcgnGto97ClFJBPT1x6Bm6KzUF7qcu6UOZy");
Moralis.serverURL = 'https://taplosgd39au.usemoralis.com:2053/server'

import * as UI from '@sproutch/ui';
import NavContextStore from '../stores/NavContextStore';
import CurrentUserStore from '../stores/CurrentUserStore';
export default class AccountMenuButton4 extends ComponentBase<AccountMenuButtonProps, AccountMenuButtonState> {
    private _mountedButton: any;

    protected _buildState(props: AccountMenuButtonProps, initState: boolean): Partial<AccountMenuButtonState> | undefined {
        const partialState: Partial<AccountMenuButtonState> = {

        };

        return partialState;
    }

    render(): JSX.Element | null {
        return (
            <UI.Button ref={this._onMountButton} onPress={this._onPress} style={{ root: [{}], content: [{ width: this.props.isStackNav ? 50 : 100, backgroundColor: 'purple', borderRadius: 11, }], label: _styles.label }
            } elevation={4} variant={"outlined"} label={this.props.isStackNav ? this.props.csbBalance.toString() : this.props.csbBalance + ' CSB'} />
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
                    command: 'Recargar',
                    text: 'Recargar',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'Retirar',
                    text: 'Retirar',
                }];

                return (
                    <SimpleMenu1
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
            case 'Retirar':
                return NavContextStore.navigateToTodoList(undefined, false, true, false, false, false, false, false, false)
            case 'Recargar':
                console.log('recargar')
                return NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, false, false, false, false, true)

            case 'Log Out':
                return Moralis.User.logOut().then(() => {
                    CurrentUserStore.setConnect(false)

                    CurrentUserStore.setLogin(false)


                    CurrentUserStore.setUser('', '', '', '', '', '', 0, 0)
                });


            default:
                return NavContextStore.navigateToTodoList(undefined, false, true, false, false, false, false, false, false)
        }

        // TODO - need to implement
    };
}
