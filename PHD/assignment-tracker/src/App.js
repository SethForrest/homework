import React, { Component } from 'react';
import logo from './logo.svg';
import 'whatwg-fetch';
import './App.css';

// const DEBUG = 1;

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyMOlSfRbXyRr9Uz' }).base( 'appu8NbYxVqw4YYCp' );



function Task(title, status, priority, due, id){
  this.title = title;
  this.stat = status;
  this.priority = priority;
  this.due = due;
  this.id = id;
}

function PopulateTable(props){
  var task_list = [];
  base('my_table').select({
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        var task = new Task(record.get('Title'), record.get('Status'), record.get('Priority'), record.get('Due Date'), record.get('ID'));
        task_list.push( JSON.stringify(task) );


        // console.log(task);
        // task_list = RenderList(task);
        // console.log(task_list);


      });
      fetchNextPage();
  }, function done(err) {
      if (err) { console.error(err); return "error"; }
  });
  console.log(task_list);
  return (task_list);
}





function RenderList(props){
  var tasks = props.list;
  console.log("props:",props );
  console.log("tasks:",tasks );
  const listItems=[];
  // const listItems = tasks.map(
  //   (taskr) => <ListItem key={tasks.id} value={tasks.title} here />
  // );
  console.log("this",tasks.title);
  for (var i=0; i<tasks.length; i++) {
    console.log("this",tasks[i]);
    // if(tasks.hasOwnProperty(i)) {
    //   listItems.push(i);
    // }
  }
  console.log("list:",listItems);
  return(<ul> {listItems} </ul>);
}


function ListItem(props) {
console.log("LI props:",props);
  return (<li>{props.value}</li>);
}


  function NumberList(props) {
    const numbers = props.numbers;
    // console.log("props:",props);
    // console.log("numbers:",numbers);
    const listItems = numbers.map(
      (number) => <ListItem key={number.toString()} value={number} />
    );
    // console.log("Num list:",listItems);
    return ( <ul> {listItems} </ul> );
  }

const numbers = [1,3,4,2,5, 'car'];
const tasks = PopulateTable();



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
        <NumberList numbers={numbers} />
        <RenderList list={tasks} />
        </div>
      </div>
    );
  }
}


export default App;
