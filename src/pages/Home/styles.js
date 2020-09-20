import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const Container = styled.div`
    width:100%;
    height: fit-content;
    background-color: #001935;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-attachment: fixed;
`

export const Form = styled.form`
    width:40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    input{
        width:100%;
    }
    textarea{
        width:100%;
    }
    button{
        width:100%;
    }
`

export const PostContainer = styled.div`
    width:40%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    margin-bottom: 5vw;
    border-radius: 5px;
    padding-top: 18px;
    padding-bottom: 18px;
    h2{
        width:100%;
        padding-left: 2vw;
        padding: 2vw;
    }
    h4{
        width:100%;
        padding-left: 2vw;
    }
    text{
        width:100%;
        padding-left: 2vw;
        padding: 2vw;
        padding-top: 0;
        white-space: pre-wrap;
    }
`