import React from 'react';
import logo from './logo.svg';
import trash from './trash.svg';
import './App.css';
import './slant.css';
import 'whatwg-fetch';



const request = new Request(
  'https://api.airtable.com/v0/appu8NbYxVqw4YYCp/my_table?api_key=keyMOlSfRbXyRr9Uz'
)

function getDotColor(priority){
  if(priority === 'high'){
    return ({'backgroundColor': 'red'})
  } else if (priority === 'medium') {
    return ({'backgroundColor': 'orange'})
  } else if (priority === 'low') {
    return ({'backgroundColor': 'green'})
  }
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: [] };
    this.fetchAirtable = this.fetchAirtable.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.checkOff = this.checkOff.bind(this);
  }


  deleteItem(){
    console.log("trash");
  }

  checkOff(){
    console.log("check off");
  }

  async componentDidMount() {
    await this.fetchAirtable()
  }

  async fetchAirtable() {
    var resp = await fetch(request).then(
      results => { return results; }
    )
    if(resp.status >= 200 && resp.status < 300) {
      var json = await resp.json()
      const {records} = json;
      this.setState({records});
    }
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
            test
          </div>
          {records.map(record =>
            <ul  id="tasks" key={record.id}>
              <div id="title" className="task-field">
                <input type="checkbox" id="myCheck" onClick={this.checkOff} />
                { record.fields["Title"] }
              </div>

              <div id="priority" className="task-field">
                <div id="dot" style={getDotColor(record.fields["Priority"])} />
                { record.fields["Priority"] }
              </div>

              <div id="status" className="task-field">
                { record.fields["Status"] }
              </div>

              <div id="due" className="task-field">
                { record.fields["Due Date"] }
                <img src={trash} className="trashcan" alt="trash" onClick={this.deleteItem} />
              </div>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
