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

import SimpleMenu2, { MenuItem } from '../controls/SimpleMenu2';
import { Colors, Fonts, FontSizes, } from '../app/Styles';

const _styles = {
    background: RX.Styles.createViewStyle({
        height: 75,
        borderBottomWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
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
        color: Colors.menuText,
        textAlign: 'center',
        alignSelf: 'center',
    })
}
interface AccountMenuButtonState {
    currentUserName: string;
    isHovering: boolean;
}

interface AccountMenuButtonProps {
    username: string;
    avatar: any;
    isStackNav: boolean;
    onPress: (todoId: string) => void;
}
const _menuPopupId = 'accountMenu';


const Moralis = require('moralis');
Moralis.initialize("gusFz0f11qYPoyrwXeIBr8OnIwOgkNZxiF8W83KJ");
Moralis.serverURL = 'https://y8zeuawsmxmx.usemoralis.com:2053/server'

import * as UI from '@sproutch/ui';
import NavContextStore from '../stores/NavContextStore';
import CurrentUserStore from '../stores/CurrentUserStore';

export default class AccountMenuButton2 extends ComponentBase<AccountMenuButtonProps, AccountMenuButtonState> {
    private _mountedButton: any;

    protected _buildState(props: AccountMenuButtonProps, initState: boolean): Partial<AccountMenuButtonState> | undefined {
        const partialState: Partial<AccountMenuButtonState> = {

        };
        return partialState;
    }

    render(): JSX.Element | null {
        let str = ''
        if (this.props.username.length > 8) {
            str = '..'
        }
        return (
            <UI.Button ref={this._onMountButton} onPress={this._onPress} iconSlot={iconStyle => (<RX.View style={{ width: 35, height: 35, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', borderRadius: 50, }}>
                <RX.Image style={{ width: 35, backgroundColor: 'black', borderRadius: 50, height: 35, alignSelf: 'center' }} source={this.props.avatar} />
            </RX.View>
            )} style={{ content: [{ width: 134, height: 40, borderRadius: 50, }], label: [_styles.label, { width: this.props.isStackNav ? 90 : 90, }] }
            } elevation={4} variant={"outlined"} label={this.props.username.slice(0, 8) + str} />


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
                    command: 'Edit Setting',
                    text: 'Edit Setting',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'Log Out',
                    text: 'Log Out',
                }];

                return (
                    <SimpleMenu2
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
            case 'Edit Setting':
                return NavContextStore.navigateToTodoList(undefined, false, true, false, false, false, false, false, false)

            case 'Log Out':
                return Moralis.User.logOut().then(() => {
                    CurrentUserStore.setConnect(false)

                    CurrentUserStore.setLogin(false)
                    NavContextStore.navigateToTodoList()

                    CurrentUserStore.setUser('', '', '', '', '', '', 0, 0)
                });


            default:
                return NavContextStore.navigateToTodoList(undefined, false, true, false, false, false, false, false, false)
        }

    };
}
