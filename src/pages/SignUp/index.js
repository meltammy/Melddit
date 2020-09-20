import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../Hooks/useForm';
import Header from '../../components/Header';
import { LoginPageContainer, FormContainer, Input, BotaoCadastrar, Footer} from './styles'
import firebase from 'firebase';
import 'firebase/firestore';



const SignUp = (props) => {
    const history = useHistory();
    const { form, onChange } = useForm({ nickname: '', email: '', password: '' });
    const goToLogin = () => {
        history.push('/');
    }

    const handleInputChange = event => {
        const { value, name } = event.target;
        onChange(name, value);

    };

      
    const signUp = async event => {
        event.preventDefault();
       firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
            .then((credential) => {
                const db = firebase.firestore();
                return db.collection('users').doc(credential.user.uid).set({
                    nickname: form.nickname
                })
                history.push("/");
            }).catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    useEffect(() => {
        if (props.currentUser) {
            history.push("/");
        }
    }, [])

    return (
        <LoginPageContainer>
            <Header></Header>
            <FormContainer onSubmit={signUp}>
                <Input type="text" label="username" name="username" onChange={handleInputChange} value={form.username} />
                <Input type="email" label="e-mail" name="email" onChange={handleInputChange} value={form.email} />
                <Input type="password" label="senha" name="password" onChange={handleInputChange} value={form.password} />
                <BotaoCadastrar>Cadastrar</BotaoCadastrar>
            </FormContainer>
            <Footer></Footer>
        </LoginPageContainer>
    )
};
export default SignUp;