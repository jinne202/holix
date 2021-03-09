import React, { Component } from 'react';
import styled, { css } from 'styled-components';

/**
 * Component that alerts if you click outside of it
 */
export default class ContentBox extends Component {
    state = {
        txtBoxVal : ''
    }

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.fileUploadRef = React.createRef();
        this.imgSrc = "";
        this.isImage = this.props.isImage;
        this.indd = this.props.idd;
        this.perWidth =  this.props.perWidth + "%";
        this.marginLeft = "0";
        this.txtBoxVal = "";
    }

    handleChange = (e) => {
        this.setState({
            txtBoxVal:e.target.value
        })
    }

    handleClickImg = (e) => {
        this.fileUploadRef.current.click();
    }

    handleFileUpload = (e) => {
        this.imgSrc = e.target.files[0].name;
        this.forceUpdate();
    }

    render() {
        return (
           
            <> { this.isImage ?
                    <ContentsBox style={{width : this.perWidth, marginLeft : this.marginLeft}}>
                        <input type="file" className="image_upload" ref={this.fileUploadRef}  accept="image/*" onChange={this.handleFileUpload} style={{display:'none'}}/>
                        {this.imgSrc ? 
                            //<img src = {this.imgSrc} onClick={this.handleClickImg}>이미지있다</img>
                            <div onClick={this.handleClickImg}>{this.indd} 이미지를 있음.</div>
                        :
                            <div onClick={this.handleClickImg}>{this.indd} 이미지를 넣어주세요.</div>
                        }
                    </ContentsBox>
                :
                    <ContentsBox style={{width : this.perWidth, marginLeft : this.marginLeft}}>
                        <InPutText type="text" 
                        value={this.state.txtBoxVal}
                        onChange={this.handleChange}/>
                     </ContentsBox>
                }
            </>
        );
    }
}

const ContentsBox = styled.div`
    background:blue;
    display:inline-block;
`

const InPutText = styled.input`
    width:100%;
`