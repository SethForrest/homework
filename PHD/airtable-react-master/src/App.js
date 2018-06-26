import React from 'react';
import logo from './logo.svg';
import './App.css';
import './slant.css';
import 'whatwg-fetch';
// require('env2')('.env');

// Add environmental vars to .env
// Find them at: https://airtable.com/api
// Base looks like appsDmF4srKVAXHqp
// The default view is Main%20View (unless renamed)

const config = {
  base: 'appu8NbYxVqw4YYCp',
  apiKey: 'keyMOlSfRbXyRr9Uz',
}

var Airtable = require('airtable');
var base = new Airtable({apiKey: config.apiKey}).base(config.base);


const request = new Request(
  'https://api.airtable.com/v0/appu8NbYxVqw4YYCp/my_table?api_key=keyMOlSfRbXyRr9Uz'
)

// var request = new Request(
//   base('my_table').select({
//     sort: [ {field: "Due Date", direction: "desc"} ]
//   }).firstPage(function(err, records) {
//     if (err) { console.error(err); return; }
//     records.forEach( function(record) {
//       // console.log('Retrieved', record.get('Title'));
//     });
//   })
// )

// const request = new Request( `https://api.airtable.com/v0/${config.base}/${config.table}?maxRecords=${config.maxRecords}&view=${config.view}`, {
//   method: 'get',
//   headers: new Headers({
//     'Authorization': `Bearer ${config.apiKey}`
//   })
// });

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
          <h2>F this Business</h2>
        </div>

        <div>
        {records.map(record =>
          <p>{JSON.stringify(record)}</p>
        )}
        </div>
      </div>
    );
  }
}

export default App;
