import React, { Component } from 'react';
// import logo from './logo.svg';
import 'whatwg-fetch';
import './App.css';

// const DEBUG = 1;

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyMOlSfRbXyRr9Uz'
});
var base = Airtable.base('appu8NbYxVqw4YYCp');



function Task(title, status, priority, due, id){
  this.title = title;
  this.stat = status;
  this.priority = priority;
  this.due = due;
  this.id = id;
}




function RenderList(){
  var list_items = ["word", 2]

  var print_string = [];
  for(var item in list_items){
     print_string = print_string.concat(
       <li key={item}> {list_items[item]} </li>
     );
  }
  return print_string;
}

// function RenderList(props){
//   const listItems = [];
//   fetch(
//     base('my_table').select({
//       view: "Grid view"
//     }).eachPage(function page(records, fetchNextPage)
//     {
//         records.forEach(function(record) {
//           var task = new Task(
//             record.get('Title'),
//             record.get('Status'),
//             record.get('Priority'),
//             record.get('Due Date'),
//             record.get('ID')
//           );
//           listItems.push(task);
//         });
//     }, function done(err) {
//         if (err) { console.error(err); return; }
//     })
//   )
//   console.log("list:",listItems);
//   return(<ul> {listItems} </ul>);
// }


// function ListItem(props) {
// // console.log("LI props:",props);
//   return (<li>{props.value}</li>);
// }
//
//
// var numbers = [1,3,4,2,5, 'car'];
// function NumberList(props) {
//   const numbers = props.numbers;
//   console.log("props:",props);
//   // console.log("numbers:",numbers);
//   const listItems = numbers.map(
//     (number) => <ListItem key={number.toString()} value={number} />
//   );
//   // console.log("Num list:",listItems);
//   return ( <ul> {listItems} </ul> );
// }


// const tasks = PopulateTable();
// <RenderList list={tasks} />
// <RenderList />

  // <div className="App">
  //   <header className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <h1 className="App-title">Welcome to React</h1>
  //   </header>


class App extends Component {
  render() {
    var {records} = this.state
    return (
      <div>
        <RenderList />
      </div>
    );
  }
}


export default App;
