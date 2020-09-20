import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from '../../Hooks/useForm'
import { Container, Form, PostContainer } from './styles'
import firebase from 'firebase'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
const Home = (props) => {
    const history = useHistory();
    const { form, onChange } = useForm({ title: "", text: "" });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserData, setCurrentUserData] = useState({})
    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value);
    };

    const getPosts = async () => {
        const db_posts = firebase.firestore().collection("posts");

        db_posts.onSnapshot((querySnapshot) => {
            const postsAux = querySnapshot.docs.map(doc => {
                return doc.data()
            })

            setPosts(postsAux)
        })

        if (!props.currentUser) {
            history.push("/");
        } else {
        }
    }

    const publish = async (event) => {
        event.preventDefault()
        let obj = {
            title: form.title,
            text: form.text,
            userId: props.currentUser.uid,
            nickname: currentUserData.nickname
        }
        let ref = firebase.firestore().collection('posts');
        ref.add(obj).then((oi) => {
            onChange('title', '');
            onChange('text', '');
        })
    }

    useEffect(() => {
        if(!props.currentUser) {
            history.push('/login')
          }
        getPosts()
        if (props.currentUser) {
            firebase.firestore().collection('users').doc(props.currentUser.uid).get().then((doc) => {
                setCurrentUserData(doc.data())
            })
        }
    }, [posts, props.currentUser])


    const goToPostPage = (id) => {
        history.push(`/post/${id}`);
    }

    const teste = () => {
        console.log(props.currentUser, !props.currentUser)
        // firebase.auth().signOut();
        // history.push('');
    }

    return (
        <Container>
            <button onClick={teste}>teste</button>
            <Form>
                <input
                    placeholder="Título"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange} />
                <textarea
                    placeholder="Texto"
                    name="text"
                    value={form.text}
                    onChange={handleInputChange} />
                <button onClick={publish}>Postar</button>
            </Form>
            {posts.map(item => {
                return <PostContainer>
                    <h4>{item.nickname}</h4>
                    <h2>{item.title}</h2>
                    <text>{item.text}</text>
                </PostContainer>
            })}
        </Container>
    )
};

export default Home;