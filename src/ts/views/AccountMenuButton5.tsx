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
        color: Colors.menuText,
    })
}
interface AccountMenuButtonState {
    currentUserName: string;
    isHovering: boolean;
}

interface AccountMenuButtonProps {
    isStackNav: boolean;
    onPress: (todoId: string) => void;
}


const Moralis = require('moralis');
Moralis.initialize("PC9sjzcgnGto97ClFJBPT1x6Bm6KzUF7qcu6UOZy");
Moralis.serverURL = 'https://taplosgd39au.usemoralis.com:2053/server'

import { BsChatSquareDotsFill } from "@react-icons/all-files/bs/BsChatSquareDotsFill";
import * as UI from '@sproutch/ui';
import NavContextStore from '../stores/NavContextStore';
export default class AccountMenuButton5 extends ComponentBase<AccountMenuButtonProps, AccountMenuButtonState> {


    protected _buildState(props: AccountMenuButtonProps, initState: boolean): Partial<AccountMenuButtonState> | undefined {
        const partialState: Partial<AccountMenuButtonState> = {

        };

        return partialState;
    }

    render(): JSX.Element | null {
        return (
            <UI.Button onPress={this._onPress} iconSlot={iconStyle => <BsChatSquareDotsFill color={'#FF296D'} style={{ width: 20, height: 16 }} />
            } style={{ content: [{ width: this.props.isStackNav ? 50 : 100, alignSelf: 'center', borderRadius: 11, }], label: _styles.label }
            } elevation={4} variant={"outlined"} label={''} />
        );
    }


    private _onPress = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, false, false, false, true)
    };

}
