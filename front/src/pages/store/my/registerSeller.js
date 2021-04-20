import React, { useEffect, useState } from 'react';
import useInput from 'hooks/useInput'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, withRouter  } from "next/router";
import StoreLayout from "components/store/StoreLayout";
import styled from 'styled-components';
import ProductCardComponents from 'components/store/ProductCardComponents';
import { REGISTER_SELLER_REQUEST } from 'reducers/storeReducer';

const registerSeller = () => {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [isCoperation, setCoperation] = useState(null);
    const [name, handleChangeName] = useInput('');
    const dispatch = useDispatch();

    const handleUploadFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleRegisterSeller = (e) => {
        e.preventDefault();
        dispatch({
            type: REGISTER_SELLER_REQUEST,
            data : {
                name : name
            }, 
            file : file

        });
        console.log("handleRegisterSeller")
    }

    return (
        <StoreLayout>
            <RegisterForm onSubmit={handleRegisterSeller}>
                <RegisterTable>
                    <tbody>
                        <tr>
                            <th>브랜드명</th>
                            <td><input type="text" value={name} onChange={handleChangeName}/></td>
                        </tr>
                        <tr>
                            <th>법인</th>
                            <td>
                                
                            </td>
                        </tr>
                        <tr>
                            <th>사업자 등록증</th>
                            <td><input type="file" accept="image/*" onChange={handleUploadFile}/></td>
                        </tr>
                    </tbody>
                </RegisterTable>
                <button type="submit">등록</button>
            </RegisterForm>
        </StoreLayout>
    )
}

const RegisterForm = styled.form`
`

const RegisterTable = styled.table`
`

export default registerSeller;