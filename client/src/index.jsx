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
    this.search = this.search.bind(this);
  }
  
  onChange (e) { // this is not complete please do this NEXT!!!!
    console.log('hey are we here>>?');
    this.setState({
      repos: e.value
    });
  }
  search (term) {
    var that = this;
    console.log('conossesl');
    $.ajax({
      url: "/repos",
      type: 'POST',
      data: {user: term},
      success: () => {
        console.log('we in the thing');
        console.log(term);
        $.ajax({
          url: "/repos",
          type: 'GET',
          data: {user: term},
          success: (data) => {
            console.log('data is whateber', data);
            that.onChange(data);
          },
          error: (xhr, textStatus, errorThrown) => { 
            console.log("error: Get ", errorThrown); 
          }
        });
      },
      error: (xhr, textStatus, errorThrown) => {
        console.log("error: Post", errorThrown); 
      }
    });
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