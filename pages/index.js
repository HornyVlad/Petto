import React from 'react'
import Head from 'next/head'
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import styles from '../styles/Home.module.css'
import List from './List'

const buttonStyle = {
  padding: "15px",
  borderRadius: "50%",
  background: "red",
  opacity: 0.7,
  fontSize: "20px"
};

const headerStyle = {
  color:'white',
  position:"absolute",
  zIndex:4,
  top:'30%',
  left:'40%'
}

const contentStyle = {
  color:'white',
  textAlign:"center",
  top:'50%',
  left:'25%',
  position:"absolute",
  zIndex:4
}
  
const bgImg = {
  position: "fixed",
  zIndex: 3,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

function Animal(props){
    if(!props.data) return <p>Loading</p>
    const {header,content,img} = props.data;
    return (
        <ul>
          <List value = {header}/>
        </ul>
    );
}

export default function Home() {
  const [animals,setAnimals] = React.useState([]);
  const [inputName, setInputName] = React.useState([]);
  const [inputAge, setInputAge] = React.useState([]);
  const [inputType, setInputType] = React.useState("Любая");
  const type = [{id: 1, content: "Любая"},
                {id: 2, content: "Мейн-кун"}, 
                {id: 3, content: "Шотландская вислоухая"},
                {id: 4, content: "Бенгальская"},
                {id: 5, content: "Ориентальная"},
                {id: 6, content: "Манчкин"},
              ];

  React.useEffect(()=>{
    fetch('/animals.json').then(data=>data.json()).then(data=>setAnimals(data));
  },[]);
  React.useEffect(()=>{
    let user = localStorage.getItem('user');
    if (user===null){
      while (user===null){
        user=prompt("Введите ваше имя пользователя");
        if (!user){
          alert('Обязательно!');
        }
        else {
          localStorage.setItem('user',user);
        }
      }
    }
  },[]);
  
  function logout(){
    localStorage.clear();
    location.reload();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Petto</title>
        <meta name="description" content="Социальная сеть для питомцев" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <main>
        <button onClick={logout}>logout</button>
        <h1>Petto</h1>
        Имя питомца: <input  type="text"  onChange={e=>setInputName(e.target.value)}></input><br></br>
        Возраст питомца: <input  type="text" onChange={e=>setInputAge(e.target.value)}></input><br></br>
        Порода: <select onChange={e=>setInputType(e.target.value)}>
          {
            type.map((value) => <option key={value.id}>{value.content}</option>)
          }
        </select>
        <ul>
        {
          animals.filter((val) => {
            let tmp;
            console.log("1 " + val.header);
            type.map((value) => {

              switch (inputType){
                case "Любая": 
                console.log("Совпало");
                  tmp = val;
                case value.content:
                  if(value.content == val.type){
                    console.log("Записываем");
                    tmp = val;
                  }
              }
            })
            console.log("2 " + val.header);
            return tmp;
            
          }).filter((val) => {
            if(inputName == ""){
              return val;
            }
            else if(val.header.toLowerCase().includes(inputName.toLowerCase())){
              return val;
            }
          }).filter((val) => {
            if(inputAge == ""){
              return val;
            }
            else if(val.age.toLowerCase().includes(inputAge.toLowerCase())){
              return val;
            }
          }).map((val, key)=>{
            return <li>{val.header + ", " + val.age}</li>
          })
        }
        </ul>
        
      </main>
    </div>
  )
}


