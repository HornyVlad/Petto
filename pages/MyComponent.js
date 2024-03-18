import React from 'react';
import List from './List';

const MyComponent = (props) => {
    console.log(props.value);
    const mas = props.value;
    const ListItems = mas.map((element) => <List value={element }/>);
    return (<ul> {ListItems} </ul>);
}
export default MyComponent;