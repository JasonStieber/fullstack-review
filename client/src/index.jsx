import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    $.ajax({
      url: "/repos",
      type: 'POST',
      data: {user: term},
      dataType: 'json',
      success: () => {
        console.log('shit worked yo');
      },
      error: (error) => { console.log(error); }
    });
    
    // console.log(`${term} was searched`);
    // var options = {
    //   data: {user: term}
    // };
    // $.post('/repos', (data) => {
    //   console.log("other shit is done hwere " + data);
    //   // callback(data.body); // if exist in the data base 
   // ? }, options);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));