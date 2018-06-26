import React from 'react';
import logo from './logo.svg';
import trash from './trash.svg';
import './App.css';
import './slant.css';
import 'whatwg-fetch';


const table = 'my_table';
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyMOlSfRbXyRr9Uz' }).base('appu8NbYxVqw4YYCp');

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
  }



  deleteItem(record){
    console.log("Trashing", record.fields["Title"]);
    console.log("Deleting not required");
    // base(table).destroy(record.id, (err, deletedRecord) => {
    //   if (err) { console.error(err);  return  }
    // })

    // base(table).replace()
  }

  checkOff(record){
    // console.log(this.state.records)
    var newStatus;
    console.log("Toggleing", record.fields["Title"]);
    if(record.fields["Status"] === "complete") {newStatus = "in progress"}
    else { newStatus = "complete" }
    record = base(table).update( record.id, {"Status": newStatus} )
      .then( r => {return r});
    // console.log({record});
    // (e) => this.fetchAirtable(e)
  }

  // componentWillMount(){
  //
  // }

  async componentDidMount() {
    await this.fetchAirtable()
  }

  async fetchAirtable() {
    const records = await base(table).select().all()
      .then( r => {return r})
    // console.log("json:",records)
    this.setState({records});
  }

  render() {
    var {records} = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Making Progress</h1>
        </div>

        <div id="task-list">
          <div className="task-header">
            <h3> test </h3>
          </div>
          {records.map(record =>
            <ul  id="tasks" key={record.id}
              style={record.fields["Status"] === "complete" ? {'backgroundColor': 'gray'} : {'backgroundColor': 'white'}}
            >
              <div id="title" className="task-field">
                <input type="checkbox" id="check"
                  onClick={(e) => this.checkOff(record, e)}
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
                  onClick={(e) => this.deleteItem(record, e)}
                />
              </div>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
