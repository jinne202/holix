import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import ColorPicker from './ColorPicker';
import ImageButton from './ImageButton';

export default class TextEditorMenu extends Component {
    constructor(props) {
        super(props);
        this.colorPickerRef = React.createRef();
        this.alignRef = React.createRef();
        this.verticalRef = React.createRef();
        console.log(props)
        this.index = props.index;
        this.fontList = [
            {title : '제목 1', size:7},
            {title : '제목 2', size:5},
            {title : '제목 3', size:4},
            {title : '본문체', size:3}
        ]
        this.selection = null;
        this.changeVertical = props.changeVertical;
    }

    state = {
        isForeColor : true,
        isShowColor : false,
        foreColor : "#000",
        textBackColor : "#fff",
        showLinkText: false,
        linkUrl : 'http://',
        currentAlign : 'editor_align_left',
        showFontList : false,
        currentFont : '본문체',
        y : 0,
        x : 0,
        visible : false
    }

    componentDidMount = () => {

    }

    eventPrevent = (e) => {
        e.preventDefault();
    }

    changeFontBold = () => {
        document.execCommand('bold', false, null);
    }

    addUnderline = () => {
        console.log("unsederline")
        document.execCommand('underline', false, null);
    }

    handleShowFontList = () => {
        this.setState(prevState => ({
            showFontList : !prevState.showFontList
        }))
    }

    changeFontSize = (index) => {
        this.setState({
            currentFont : this.fontList[index].title,
            showFontList: false
        })
        document.execCommand("fontSize", false, this.fontList[index].size);
    }

    changeAlignImage = () => {
        let current = document.queryCommandState('justifyRight') ? 'editor_align_right' : document.queryCommandState('justifyCenter') ? 'editor_align_center' : 'editor_align_left';
        this.setState({
            currentAlign : current
        })
        this.alignRef.current.setState({
            name : current
        })
    }

    changeAlign = () => {
        let align = document.queryCommandState('justifyLeft') ? 'justifyCenter' : document.queryCommandState('justifyCenter') ? 'justifyRight' : 'justifyLeft';
        document.execCommand(align, false, null);
        this.changeAlignImage()
    }

    showColorPicker = (isFore) => {
        this.setState({
            isForeColor : isFore
        })
        this.colorPickerRef.current.visible = true;
        this.colorPickerRef.current.forceUpdate();
    }
    
    handleChangeColor = (color) => {
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(this.selection);
        console.log("handlechangeoclor")
        console.log(this.selection);
        console.log(window.getSelection());
        if (this.state.isForeColor) {
            document.execCommand("foreColor", false, color.hex);
            this.setState({
                foreColor : color.hex
            })
        } else {
            document.execCommand("backColor", false, color.hex);
            this.setState({
                textBackColor : color.hex
            })
        }
        this.colorPickerRef.current.background = color.hex;
    }

    showLinkText = () => {
        this.setState(prevState => ({
            showLinkText : !prevState.showLinkText
        }))
    }

    addLink = () => {
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(this.selection);
        document.execCommand("CreateLink", false, this.state.linkUrl);
        this.setState({linkUrl : 'http://'});
    }

    onChangeLink = (e) => {
        this.setState({linkUrl : e.target.value});
    }
    render() {
        const fontList = this.fontList.map((f, index) => <FontListItem onMouseDown={this.eventPrevent} onClick={() => this.changeFontSize(index)}>{f.title}</FontListItem>);
        if (this.state.visible) {
            return (
                <Fragment>
                    <TextEditorMenuWrapper style={{top:this.state.y, left:this.state.x}}>
                    <ColorPicker ref={this.colorPickerRef} onChangeComplete={this.handleChangeColor} background={this.state.foreColor }/>
                    <TextEditorList>
                        <TextEditorListItem style={{width:'auto'}}onMouseDown={this.eventPrevent} onClick={this.handleShowFontList}>{this.state.currentFont}</TextEditorListItem>
                        <TextEditorListItem onMouseDown={this.eventPrevent} onClick={this.changeFontBold}><ImageButton name="bold"/></TextEditorListItem>
                        <TextEditorListItem onMouseDown={this.eventPrevent} onClick={this.addUnderline}><ImageButton name="underline"/></TextEditorListItem>
                        <TextEditorListItem onMouseDown={this.eventPrevent} onClick={() => this.showColorPicker(true)}><ImageButton name="textcolor"/></TextEditorListItem>
                        <TextEditorListItem onMouseDown={this.eventPrevent} onClick={() => this.showColorPicker(false)}><ImageButton name="textbackground"/></TextEditorListItem>
                        <TextEditorListItem onMouseDown={this.eventPrevent} onClick={this.showLinkText}><ImageButton name="link"/></TextEditorListItem>
                        <TextEditorListItem onMouseDown={this.eventPrevent} onClick={this.changeAlign}><ImageButton ref={this.alignRef} name={this.state.currentAlign}/></TextEditorListItem>
                        <TextEditorListItem onMouseDown={this.eventPrevent} onClick={this.changeVertical}><ImageButton ref={this.verticalRef} name="alignTop"/></TextEditorListItem>
                    </TextEditorList>
                    {this.state.showLinkText ?
                        <div>
                            <input type="text" value={this.state.linkUrl} onChange={this.onChangeLink}/><button onClick={this.addLink}>확인</button>
                        </div>  : <></>
                    }
                    { this.state.showFontList  ?
                    <FontList>
                        {fontList}
                    </FontList>
                    : <></> }
                    </TextEditorMenuWrapper>
                </Fragment>
            )
        } else {
            return <></>;
        }
    }
}
const TextEditorMenuWrapper = styled.div`
    position: absolute;
    border: 1px solid #BEBEBE;
    box-sizing: border-box;
    border-radius: 5px;
    color:#5f5f5f;
`


const TextEditorList = styled.ul`
    position: absolute;
    margin-top: -35px;
    background: white;
    width: 100%;
    z-index:99;
    width:300px;

`

const TextEditorListItem = styled.li`
    float:left;
    margin-right:5px;
    width:30px;
    height:30px;
    background: white;
`

const FontList = styled.ul`
    position:relative;
    width:100%;
    height:auto;
`

const FontListItem = styled.li`
    float:none;
    background: white;

`