import React from 'react';
import logo from './logo.svg';
import './App.css';
import './slant.css';
import 'whatwg-fetch';



const request = new Request(
  'https://api.airtable.com/v0/appu8NbYxVqw4YYCp/my_table?api_key=keyMOlSfRbXyRr9Uz'
)

function getDotColor(priority){
  if(priority == 'high'){
    return ({'background-color': 'red'})
  } else if (priority == 'medium') {
    return ({'background-color': 'orange'})
  } else if (priority == 'low') {
    return ({'background-color': 'green'})
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: [] };
    this.fetchAirtable = this.fetchAirtable.bind(this);
  }

  async componentDidMount() {
    await this.fetchAirtable()
  }

  async fetchAirtable() {
    var resp = await fetch(request).then(
      results => { return results; }
    )
    console.log("resp:",request)
    if(resp.status >= 200 && resp.status < 300) {
      var json = await resp.json()
      console.log("json:",json)
      const {records} = json;
      setTimeout(console.log({records}), 500)
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
          {records.map(record =>
            <ul  id="tasks" key={record.id}>
              <div id="title"> { record.fields["Title"] }  </div>
              <div id="priority">
                <div id="dot" style={getDotColor(record.fields["Priority"])} />
                { record.fields["Priority"] }
              </div>
              <div id="status"> { record.fields["Status"] }   </div>
              <div id="due"> { record.fields["Due Date"] }  </div>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
