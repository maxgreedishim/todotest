import React, {useMemo, useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForms from "./components/PostForms";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, author:'Максимов Денис', title: 'Как приготовить плов', body:
                'Многие боятся готовить плов - то он получается кашей, то сухой,' +
                ' то слишком водянистый. К тому же гуру узбекской кухни любят' +
                ' рассказывать о нем длинно, витиевато и с большим количеством ограничений. ' +
                'Кажется, что сварить плов труднее, чем управлять космическим кораблем. ' +
                'Все совсем не так! Плов - это простая еда. И готовится плов легко и просто! ' +
                'Без всяких понтов и заморочек!'},
        {id: 2, author:'Кухарский Максим', title: 'Готовим курицу', body:
                '"Веер" из баклажанов с курицей и томатами (в духовке) — сытное горячее блюдо,' +
                ' которое желанно за обеденным столом или ужином, особенно в сезон овощей. ' +
                'Сначала надрежем баклажаны веером и запечём, затем нафаршируем их начинкой ' +
                'из курицы в томатном соусе, посыплем сыром и вернём в духовку. ' +
                'Несложно, вкусно, эффектно.'},
        {id: 3, author:'Агапов Алексей', title: 'Жарим блины', body:
                'Блины на молоке, из заварного теста с добавлением кипятка, для особенной ' +
                'нежности блинчиков. Блины с начинкой из красной рыбы, оформленные в виде роз,' +
                ' - бесспорное украшение праздничного стола.'},
    ])

    const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [checkedName, setCheckedName] = useState(true);
    const [checkedTitle, setCheckedTitle] = useState(false);
    const [checkedBody, setCheckedBody] = useState(false);
    const [checkedSortPost, setCheckedSortPost] = useState(1)

    const checkedCheckboxName = () => {
        setCheckedTitle(false);
        setCheckedBody(false);
        setCheckedName(true);
        setCheckedSortPost(1);
    }

    const checkedCheckboxTitle = () => {
        setCheckedTitle(true);
        setCheckedBody(false);
        setCheckedName(false);
        setCheckedSortPost(2);
    }
    const checkedCheckboxBody = () => {
        setCheckedTitle(false);
        setCheckedBody(true);
        setCheckedName(false);
        setCheckedSortPost(3);
    }

    const sortedPosts = useMemo(() => {
        if(selectedSort) {
            return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts;
    },[selectedSort, posts])

    const sortedAndSearchPosts = useMemo(() => {
        switch (checkedSortPost) {
            case 1:
                return sortedPosts.filter(post =>
                    post.author.includes(searchQuery))
            case 2:
                return sortedPosts.filter(post =>
                    post.title.includes(searchQuery))
            case 3:
                return sortedPosts.filter(post =>
                    post.body.includes(searchQuery))
            default:
                break;
        }
    },[searchQuery, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort)
    }
  return (
    <div className="App">
        <PostForms create={createPost}/>
        <hr className="hr-line" />
        <div>
            <MyInput
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск по ..."
            />
            <input
                type="checkbox"
                checked={checkedName}
                onChange={checkedCheckboxName}
            /><strong className="textCheckBox">Имени</strong>
            <input
                type="checkbox"
                checked={checkedTitle}
                onChange={checkedCheckboxTitle}
            /><strong className="textCheckBox">Названию</strong>
            <input
                type="checkbox"
                checked={checkedBody}
                onChange={checkedCheckboxBody}
            /><strong className="textCheckBox">Рецепту</strong>
            <hr className="hr-line" />
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue="Сортировка по"
                options={[
                    {value:'author', name: 'По автору'},
                    {value:'title', name: 'По названию'},
                    {value:'body', name: 'По описанию'}
                ]}
            />
        </div>
        <PostList remove={removePost} posts={sortedAndSearchPosts} title={'Список постов'}/>
    </div>
  );
}

export default App;
