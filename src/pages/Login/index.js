import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from '../../Hooks/useForm'
import { Container, Form, Input, Button } from './styles';
import firebase from 'firebase';
import Header from '../../components/Header'
const Login = (props) => {
    const history = useHistory();
    const { form, onChange } = useForm({ email: "mel.tammy2@gmail.com", password: "123456" });

    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value);
    };

    const onClickSubmit = (event) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(form.email, form.password)
            .then((user) => {
                history.push("/");
            }).catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    useEffect(() => {
        if (props.currentUser) {
            history.push('/')
        }
    }, [props.currentUser])

    return (
        <Container>
            <Header></Header>
            <Form onSubmit={onClickSubmit}>
                <Input
                    label="e-mail"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange} />
                <Input
                    label="senha"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    type={"password"} />
                <Button>Entrar</Button>
            </Form>
            <div/>
        </Container>
    )
};
export default Login;