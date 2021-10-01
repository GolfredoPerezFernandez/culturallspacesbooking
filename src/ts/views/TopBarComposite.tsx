/*
* TopBarComposite.tsx
* Copyright: Microsoft 2018
*
* Horizontal bar that appears on the top of every view within the app
* when it's using composite layout (as opposed to stack-based layout).
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import HoverButton from '../controls/HoverButton';
import { Colors, Fonts, FontSizes } from '../app/Styles';

import * as UI from '@sproutch/ui';

const _styles = {
    background: RX.Styles.createViewStyle({
        height: 75,
        borderBottomWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        borderColor: Colors.gray66,
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

import ImageSource from 'modules/images';

interface userMoralis {
    username: string;
    email: string;
    createdAt: string;
    sessionToken: string;
    emailVerified: boolean;
    updatedAt: string;
    avatar: string;
    csbBalance: number;
    objectId: string;
}
export interface TopBarCompositeProps extends RX.CommonProps {
    showBackButton: boolean;
    showSideMenu: boolean;
    width: number;
    user: userMoralis;
    len: string;
    onBack?: () => void;
}

interface TopBarCompositeState {
    isLogin: boolean;
    isRegister: boolean
}
import { AiOutlineMenuFold } from "@react-icons/all-files/ai/AiOutlineMenuFold";

import { AiOutlineMenuUnfold } from "@react-icons/all-files/ai/AiOutlineMenuUnfold";
import { SiOpenaccess } from "@react-icons/all-files/si/SiOpenaccess";
import CurrentUserStore from '../stores/CurrentUserStore';
// import { GiWhiteBook } from "@react-icons/all-files/gi/GiWhiteBook";

import SimpleDialog from '../controls/SimpleDialog';
import AccountMenuButton2 from './AccountMenuButton2';
import AccountMenuButton4 from './AccountMenuButton4';

import AccountMenuButton5 from './AccountMenuButton5';


import AccountMenuButton3 from './AccountMenuButton3';
import NavContextStore from '../stores/NavContextStore';
const _confirmDeleteDialogId = 'delete';


export default class TopBarComposite extends ComponentBase<TopBarCompositeProps, TopBarCompositeState> {
    protected _buildState(props: TopBarCompositeProps, initState: boolean): Partial<TopBarCompositeState> | undefined {
        const partialState: Partial<TopBarCompositeState> = {
            isRegister: CurrentUserStore.getRegister(),
            isLogin: CurrentUserStore.getLogin(),
        };
        this.login()
        return partialState;
    }
    async componentDidMount() {
    }

    setSideMenu(params: boolean) {
        CurrentUserStore.setSideMenu(params)
    }

    async login() {


    }
    render(): JSX.Element | null {
        let leftContents: JSX.Element | undefined;

        if (this.props.showBackButton) {
            leftContents = (
                <HoverButton onPress={this._onPressBack} onRenderChild={this._renderBackButton} />
            );
        } else {
            leftContents = (
                <RX.View style={{ justifyContent: 'center', marginRight: this.props.width * 0.04, marginLeft: this.props.width * 0.04, alignItems: 'flex-start' }} >
                    <RX.Button>{this.props.showSideMenu ?


                        <AiOutlineMenuFold onClick={() => this.setSideMenu(false)} style={{ width: 25, height: 25 }} />
                        :
                        <AiOutlineMenuUnfold onClick={() => this.setSideMenu(true)} style={{ width: 25, height: 25 }} />}
                    </RX.Button>

                </RX.View>
            );
        }
        return (
            <RX.View style={[_styles.background, { width: this.props.width }]}>
                <RX.View style={[{ height: 80, width: this.props.width * 0.30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }]}>
                    {leftContents}
                    {this.state.isLogin === false ?
                        null
                        :
                        <AccountMenuButton4 isStackNav={false} csbBalance={this.props.user.csbBalance} onPress={this._onPressTodo} />
                    }

                    <RX.View style={{ width: 20 }} />
                    {this.state.isLogin === true ?
                        <AccountMenuButton5 isStackNav={false} onPress={this._onPressTodo} />
                        :
                        null
                    }
                </RX.View>
                <RX.View style={[_styles.barControlsContainer, { width: this.props.width * 0.40, }]}>
                    <RX.View onPress={() => NavContextStore.navigateToTodoList(undefined, false, true)} style={{ width: 350, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <RX.Image style={{ width: 30, height: 30, }} source={ImageSource.logo} />
                        <RX.Text style={_styles.logoText}>

                            {'Cultural Spaces '}
                        </RX.Text> <RX.Text style={_styles.logoText2}>

                            {'Booking '}
                        </RX.Text>
                    </RX.View>


                </RX.View>
                <RX.View style={{ height: 75, width: this.props.width * 0.30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <AccountMenuButton3 len={this.props.len} onPress={this._onPressTodo} />
                    <RX.View style={{ height: 75, flexDirection: 'row', marginLeft: 20, justifyContent: 'center', alignItems: 'center', }}>


                        <RX.View style={{ width: 20 }} />
                        {this.state.isLogin === false ?
                            <UI.Button onPress={this._onPressModal} iconSlot={iconStyle => (
                                <SiOpenaccess color={'#FF296D'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
                            )} style={{ content: [{ width: 160, borderRadius: 11, }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label="Access" />
                            :
                            <AccountMenuButton2 isStackNav={false} username={this.props.user.username} avatar={this.props.user.avatar} onPress={this._onPressTodo} />
                        }
                    </RX.View>
                </RX.View>
            </RX.View >
        );
    }

    private _onPressTodo = (todoId: string) => {
    };
    private _onPressModal = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        const dialog = (
            <SimpleDialog
                dialogId={_confirmDeleteDialogId}
                text={''}
                containerStyle={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
                maxHeight={600}
                maxWidth={400}
                isRegister={this.state.isRegister}

                buttons={[{
                    text: 'Login',
                    onPress: () => {
                        SimpleDialog.dismissAnimated(_confirmDeleteDialogId);

                    },
                }, {
                    text: 'Register',
                    isCancel: false,
                    onPress: () => {

                        CurrentUserStore.setRegister(true)
                    },
                }]}
            />
        );

        RX.Modal.show(dialog, _confirmDeleteDialogId);
    };
    private _onPressBack = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        if (this.props.onBack) {
            this.props.onBack();
        }
    };

    private _renderBackButton = (isHovering: boolean) => (
        <RX.View style={_styles.backButtonContainer}>
            <RX.Text style={[_styles.backText, isHovering ? _styles.linkTextHover : undefined]}>
                {'Back'}
            </RX.Text>
        </RX.View>
    );


}

// {this.state.isLogin === true ?
//     <UI.Button onPress={() => RX.Linking.openUrl('https://res.cloudinary.com/dwuk3500t/raw/upload/v1629322659/white_paper_vintage_csb.odt')} iconSlot={iconStyle => (
//         <GiWhiteBook color={'#FF296D'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
//     )} style={{ content: [{ width: 160, borderRadius: 11, }], label: _styles.label }
//     } elevation={4} variant={"outlined"} label="Whitepaper" />
//     :
//     null
// }