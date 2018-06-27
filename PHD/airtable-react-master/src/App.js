import React from 'react';
import logo from './logo.svg';
import trash from './trash.svg';
import clipboard from './newTask.svg';
import asc from './asc.svg';
// import desc from './desc.svg';
import './App.css';
import './slant.css';
import 'whatwg-fetch';

var tog = 1; // for the popup
var taskTog = 0 //, priTog = 0, dueTog = 0;
var tempRec = {
  "Title": [],
  "Status": "in progress",
  "Priority": [],
  "DueDate": []
};

const table = 'my_table';
var Airtable = require('airtable');
var base = new Airtable(
  {apiKey: 'keyMOlSfRbXyRr9Uz' }
).base('appu8NbYxVqw4YYCp');


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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.searchFunc.bind(this);
    this.deleteItem = this.deleteItem.bind(props);
    this.checkOff = this.checkOff.bind(props);
    this.setState = this.setState.bind(this);
  }

  popFunc(){
    // console.log(tog)
    if(tog === 1){
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
      tog = (tog+1)%2
    }
  }


    // <img src={ this.isClicked(taskTog) ? desc : asc}
  // isClicked(toggle){
  //   taskTog = 0; priTog = 0; dueTog = 0
  //   toggle += 1;
  //   if
  //
  //   return true
  // }

  handleChange(event) {
    const log = event.target;
    tempRec[log.name] = log.value;
    console.log(tempRec)
  };

  handleSubmit(event) {
    event.preventDefault();

    console.log(tempRec)

    console.log( base(table).create(tempRec, function(err, record) {
      if (err) { console.error(err); return; }
      console.log(record.getId());
    })  )

    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    tog = (tog+1)%2
    this.fetchAirtable()
  }

  async searchFunc(event){
    console.log('Filtering', event)
    var records = []
    if( event === "Title" || event === "Priority" || event === "DueDate"){
      var dir;
      if(taskTog === 0){dir = "desc"} else{ dir = "asc"}
      records = await base(table).select({
          sort: [{field: event, direction: dir }]
        }).all().then( r => {return r})
      taskTog = (taskTog+1)%2
    } else {
    records = await base(table).select({
          filterByFormula: event
        }).all().then( r => {return r})
    }
    console.log({records})
    await this.setState({records});
  }




  async deleteItem(record){
    console.log("Trashing", record.fields["Title"]);
    return await base(table).destroy(record.id).then(r => {return r} )
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
              <input  className="search-bar"
                      type="text"
                      onChange={e => this.seearchFunc(e)}
                      placeholder="Search Task Name.." />



              <div className="popup" onClick={e => this.popFunc() } >

                <span className="popuptext" id="myPopup">

                  <form onSubmit={e => this.handleSubmit(e)}>
                    <h3>Enter a new Task</h3>
                    <label>
                      <h5>Task:
                        <input  type="Text" name="Title"
                                onChange={e => this.handleChange(e)}
                                />
                        </h5>
                      <h5>Priority:
                        <input  type="radio"
                                name="Priority"
                                value="high"
                                onChange={e => this.handleChange(e)}
                                /> High
                        <input  type="radio"
                                name="Priority"
                                value="medium"
                                onChange={e => this.handleChange(e)}
                                /> Medium
                        <input  type="radio"
                                name="Priority"
                                value="low"
                                onChange={e => this.handleChange(e)}
                                /> Low
                        </h5>

                      <h5>Due Date:
                        <input  name="DueDate"
                                type="date"
                                onChange={e => this.handleChange(e)}
                                />
                        </h5>

                      </label>
                    <input type="submit" value="Submit"  />
                    </form>
                  </span>

                  <img  src={clipboard}
                        alt="new task"
                        className="clipboard" />
                </div>

              </div>
            </div>




          <div className="task-header">
            <div className="hdrBlk" id="Task">  <h3> Task </h3>
              <img src={asc}
                className="sort"
                alt="sort"
                onClick={(e) => { this.searchFunc('Title') } } />
                </div>
              <div className="hdrBlk" id="Priority">  <h3> Priority </h3>
                <img src={asc}
                  className="sort"
                  alt="sort"
                  onClick={(e) => { this.searchFunc('Priority') } } />
                  </div>
              <div className="hdrBlk" id="DueDate">  <h3> Due Date </h3>
                <img src={asc}
                  className="sort"
                  alt="sort"
                  onClick={(e) => { this.searchFunc('DueDate') } } />
                  </div>
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
                { record.fields["DueDate"] }
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
