import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForms = ({create}) => {
    const [post, setPost] = useState({author: '', title: '', body:''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({author: '', title: '', body: ''})
    }

    return (
        <form>
            <MyInput
                value={post.author}
                onChange={ e => setPost({...post, author: e.target.value})}
                type='text'
                placeholder='Автор поста'
            />
            <MyInput
                value={post.title}
                onChange={ e => setPost({...post, title: e.target.value})}
                type='text'
                placeholder='Название поста'
            />
            <MyInput
                value={post.body}
                onChange={ e => setPost({...post, body: e.target.value})}
                type='text'
                placeholder='Описание поста'
            />
            <MyButton onClick={addNewPost}>Создать</MyButton>
        </form>
    );
};

export default PostForms;