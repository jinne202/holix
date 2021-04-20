import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import TextEditorMenu from './TextEditorMenu';
import {imageHost} from 'api/apiConfig';
/**
 * Component that alerts if you click outside of it
 */
export default class ContentBox extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.myRef = React.createRef();
        this.fileUploadRef = React.createRef();
        this.textEditorRef = React.createRef();
        this.inputTxtRef = React.createRef();
        this.index = props.index;
        this.groupIndex = props.groupIndex;
        this.txtBoxVal = !props.isImage && props.val ? props.val : '';
        this.file = props.file;
        this.viewMode = props.viewMode;
        this.postingNumber = window.location.href.split('/');
        this.postingNumber = this.postingNumber[this.postingNumber.length - 1]

        this.state = {
            isImage : this.props.isImage,
            imgSrc: this.getImgSrc(),
            perWidth: this.props.perWidth + "%",
            height: this.props.height,
            marginLeft:'0',
            marginRight:this.props.marginRight,
            isFull: this.props.isFull,
            vertical : this.props.vertical ? this.props.vertical :'flex-start'
        }
    }

    getCurrentPostingNumber = () => {
        var url = window.location.href;
        url = url.split('/');
        let type  = url[url.length - 2];
        url = url[url.length - 1];
        if (url.includes('edit')) {
            return type + "/" + url.split('=')[1];
        } else
            return type + "/" + url;

    }

    getImgSrc = () => {
        console.log('getImgSrc')
        console.log(this.file)
        if (this.file) {
            this.handleShowImage(this.file)
        } else if (this.props.isImage && this.props.val) {
            return imageHost + this.getCurrentPostingNumber() + "/" + this.props.val;
        } else {
            return '';
        }
    }
 
    getImgSrcForUpload = () => {
        let url = this.state.imgSrc.split('/');
        return url[url.length - 1]
    }
   
    transferForUpload(isPreview) {
        console.log("this.file" +this.file )
        const json = {
            isImage : this.state.isImage,
            val : this.state.isImage ? (this.file ? this.file.name : this.getImgSrcForUpload()) : this.txtBoxVal,
            isFull : this.state.isFull,
            vertical : this.state.vertical,
            file : isPreview ? this.file : null
        }
        return json;
    }

    componentDidMount = () => {

    }

    handleChange = (e) => {
        this.txtBoxVal = e.target.innerHTML;
    }

    handleClickImg = (e) => {
        if (this.viewMode) return;
        this.fileUploadRef.current.click();
    }

    handleShowImage = (f) => {
        let reader = new FileReader();
        Object.defineProperty(f, 'name', {
            writable: true,
            value: this.groupIndex + "_img_" + this.index + f.name.substring(f.name.lastIndexOf('.'))
          });
        this.file = f
        reader.onloadend = () => {
            this.setState({imgSrc:reader.result})
        }
        reader.readAsDataURL(f);
    }

    handleFileUpload = (e) => {
        if (e.target.files.length == 0) {
            return;
        }
        let reader = new FileReader();
        let f = e.target.files[0];
        this.handleShowImage(f);
    }
    
    handleMouseUp = (e) => {
        if (this.viewMode) return;  
        let bounds = this.myRef.current.getBoundingClientRect();
        let x = e.clientX - bounds.left;
        let y = e.clientY - bounds.top;
        this.textEditorRef.current.selection = window.getSelection().getRangeAt(0).cloneRange();
        this.textEditorRef.current.setState({
            y : y - 10,
            x : x - 35,
            visible : window.getSelection().toString() != ''
        })
    }

    changeVertical = () => {
        let prevVertical = this.state.vertical;
        this.setState({
            vertical : prevVertical == 'flex-start' ? 'center' : prevVertical == 'center' ? 'flex-end' : 'flex-start' 
        })
        this.textEditorRef.current.verticalRef.current.setState({
            name : prevVertical == 'flex-start' ? 'alignCenter' : prevVertical == 'center' ? 'alignBottom' : 'alignTop' 
        })
    }

    onFocusInputText = () => {
        this.inputTxtRef.current.focus();
    }
    render() {
        return (
           
            <> { this.state.isImage ?
                    <ContentsBox style={{minHeight:'100px', border: this.state.imgSrc ? '' : '1px dashed gray' , width : this.state.perWidth, height: this.state.height, marginLeft : this.state.marginLeft, marginRight : this.state.marginRight}}>
                        <input type="file" className="image_upload" ref={this.fileUploadRef}  accept="image/*" onChange={this.handleFileUpload} style={{display:'none'}}/>
                        {this.viewMode || this.state.imgSrc ? 
                            this.state.isFull ?
                                <ContentsImg src = {this.state.imgSrc } onClick={this.handleClickImg} />
                            :
                                <ContentsImg style = {{background:'url(' + this.state.imgSrc + ') center center / cover'}} onClick={this.handleClickImg} />
                        :
                            <div onClick={this.handleClickImg} style={{height:'100%'}}>이미지를 넣어주세요.</div>
                        }
                    </ContentsBox>
                :
                    <>
                    
                    <ContentsBox ref={this.myRef} style={{border: this.txtBoxVal !== '' ? '' : '1px dashed gray' , width : this.state.perWidth, marginLeft : this.state.marginLeft, marginRight : this.state.marginRight
                                        , display : 'flex', alignItems : this.state.vertical}} onClick={this.onFocusInputText}>
                        <TextEditorMenu index={this.groupIndex} ref={this.textEditorRef} changeVertical = {this.changeVertical}/>
                        <InPutText contentEditable={!this.viewMode}
                        ref={this.inputTxtRef}
                        onMouseUp={this.handleMouseUp}
                        onInput={this.handleChange} 
                        dangerouslySetInnerHTML={{__html:this.txtBoxVal}}
                        >
                            
                        </InPutText>
                     </ContentsBox>
                     </>
                }
            </>
        );
    }
}

const ContentsBox = styled.div`
    display:inline-block;
    position:relative;
`

const InPutText = styled.div`
    height: auto;
    width:100%;
`

const ContentsImg = styled.img`
    width: 100%;
    height:100%;
`