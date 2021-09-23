/*
* TodoListItem.tsx
* Copyright: Microsoft 2018
*
* Renders a list item that represents a todo item.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import VideoPlayer from 'react-video-player-extended';
import HoverButton from '../controls/HoverButton';
import { Fonts, FontSizes } from '../app/Styles';
interface Item {
    description: string;
    name: string;
    owner: string;
    ownerEmail: string;
    uri: string;
    id: string;
    type: string;
    price: number;
    forSale: boolean;
}


interface TodoListItemProps extends RX.CommonProps {
    height: number;
    todo: Item;
    isSelected: boolean;
    searchString?: string;
    onPress: (todoId: string) => void;
}

interface TodoListItemState {
    heightStyle: RX.Types.ViewStyleRuleSet;
}

const _itemBorderWidth = 1;

const _styles = {
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size14,
        color: 'white',
    }),
    container: RX.Styles.createButtonStyle({
        alignSelf: 'stretch',
        borderBottomWidth: _itemBorderWidth,
        borderColor: '#2B2B2B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#181818",
    }),
    todoNameText: RX.Styles.createTextStyle({
        flex: -1,
        width: 100,
        fontSize: FontSizes.size16,
        font: Fonts.displayRegular,
        color: 'white',
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

export default class TodoListItem extends ComponentBase<TodoListItemProps, TodoListItemState> {
    protected _buildState(props: TodoListItemProps, initState: boolean): Partial<TodoListItemState> | undefined {
        const partialState: Partial<TodoListItemState> = {
            heightStyle: RX.Styles.createViewStyle({
                height: props.height,
            }, false),
        };
        return partialState;
    }
    volume = 1
    isPlaying = false

    handlePlay = () => {
        this.isPlaying = true
    };

    handlePause = () => {

        this.isPlaying = true
    };

    handleVolume(value: any) {
        this.volume = value
    };
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
        this.props.onPress(this.props.todo.id);
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
            searchSubstrIndex = this.props.todo.name.toLowerCase().indexOf(searchString);
        }

        if (searchSubstrIndex >= 0) {
            nameText = (
                <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                    <RX.Text numberOfLines={1}>
                        {this.props.todo.name.substr(0, searchSubstrIndex)}
                    </RX.Text>
                    <RX.Text style={_styles.todoNameTextSelected} numberOfLines={1}>
                        {this.props.todo.name.substr(searchSubstrIndex, searchString.length)}
                    </RX.Text>
                    <RX.Text numberOfLines={1}>
                        {this.props.todo.name.substr(searchSubstrIndex + searchString.length)}
                    </RX.Text>
                </RX.Text>
            );
        } else {
            nameText = (
                <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                    {this.props.todo.name}
                </RX.Text>
            );
        }

        return (
            <RX.View style={buttonStyles}>
                {this.props.todo.type === 'image' ? <RX.Image style={{ paddingLeft: 30, height: 50, width: 50 }} source={this.props.todo.uri}></RX.Image> : null}
                {this.props.todo.type === 'video' ? <VideoPlayer
                    url={this.props.todo.uri}
                    isPlaying={this.isPlaying}
                    volume={0}
                    onPlay={this.handlePlay}
                    onPause={this.handlePause}
                    onVolume={this.handleVolume}
                    height={'145'}
                    width={'120'}
                    controls={[]} />
                    : null}
                {nameText}
            </RX.View>
        );
    };
}
