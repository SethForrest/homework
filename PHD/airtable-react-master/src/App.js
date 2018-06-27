import React from 'react';
import logo from './logo.svg';
import trash from './trash.svg';
import clipboard from './newTask.svg';
import './App.css';
import './slant.css';
import 'whatwg-fetch';


const table = 'my_table';
var Airtable = require('airtable');
var base = new Airtable(
  {apiKey: 'keyMOlSfRbXyRr9Uz' }
).base('appu8NbYxVqw4YYCp');

// console.log(
//   base(table).select().all()
// )

function getDotColor(priority){
  if(priority === 'high'){
    return ({'backgroundColor': 'red'} )
  } else if (priority === 'medium') {
    return ({'backgroundColor': 'orange'})
  } else if (priority === 'low') {
    return ({'backgroundColor': 'green'})
  }
}

function getChecked(status){
  if(status === 'complete'){
    return true
  } else {
    return false
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
    this.fetchAirtable = this.fetchAirtable.bind(this);
    this.deleteItem = this.deleteItem.bind(props);
    this.checkOff = this.checkOff.bind(props);
    // this.setState = this.setState.bind(this);
  }


  async newTask(){
    console.log('Making Task')
    window.prompt("sometext","Task Name")
  }

  async deleteItem(record){
    console.log("Trashing", record.fields["Title"]);

    return await base(table).destroy(record.id).then(r => {return r} )
    // await
  }

  async checkOff(record){
    var newStatus;
    console.log("Toggleing", record.fields["Title"]);


    // Toggle Status
    if(record.fields["Status"] === "complete") {
      newStatus = "in progress";
    } else {
      newStatus = "complete";
    }

    // Update Airtable
    await base(table).update( record.id, {"Status": newStatus} );
  }


  async componentDidMount() {
    await this.fetchAirtable()
  }

  async fetchAirtable() {
    console.log('fetching')
    const records = await base(table).select().all()
      .then( r => {return r})
    // console.log({records})
    await this.setState({records});
  }


  render() {
    var records = this.state.records
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Making Progress</h1>
        </div>

        <div id="task-list">
          <div id="top-bar">
            <div className="clearfix">
              <input className="search-bar" type="text" placeholder="Search.." />

              <img  src={clipboard}
                    alt="new task"
                    className="clipboard"
                    onClick={(e) =>  this.newTask(this)  } />
              </div>
            </div>
          <div className="task-header">
            <div className="hdrBlk">  <h3> Task </h3> </div>
            <div className="hdrBlk">  <h3> Priority </h3> </div>
            <div className="hdrBlk">  <h3> Due Date </h3> </div>
            </div>


          {records.map(record =>
            <ul  id="tasks" key={record.id}
              style={record.fields["Status"] === "complete" ? {'backgroundColor': 'gray'} : {'backgroundColor': 'white'} }>
              <div id="title" className="task-field">
                <input  type="checkbox"   id="check"
                        onClick={(e) => this.checkOff(record, e).then(
                                        this.fetchAirtable(this) ) }
                        defaultChecked={getChecked(record.fields["Status"])} />
                { record.fields["Title"] }
                </div>

              <div id="priority" className="task-field">
                <div id="dot" style={getDotColor(record.fields["Priority"])} />
                { record.fields["Priority"] }
                </div>

              <div id="due" className="task-field">
                { record.fields["Due Date"] }
                <img src={trash}
                  className="trashcan"
                  alt="trash"
                  onClick={(e) => { this.deleteItem(record, e);
                                    this.fetchAirtable(this) } }/>
                </div>
              </ul>
            )}


          </div>
        </div>
      );
    }
  }

export default App;
