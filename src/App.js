import './App.css';
import React from 'react';
import marked from 'marked';

function Header() {
  return (
    <header className="header">
      <h1>Markdown Editor</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      2021
    </footer>
  );
}



function Editor(props) {
      return(
        <div className="editor">
              <textarea name='editor' placeholder="Enter markdown" 
              onInput={props.handleChange} rows="10" cols="50">
              </textarea>
          </div>
      )
  }


function Preview(props) {
  return (
    <div className="preview" dangerouslySetInnerHTML={{ __html: props.html }}/>
  );
}


class Workplace extends React.Component {
    constructor(props) {
      super(props);
      this.state = { htmlMarkdown: ''};
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var markedHtml = marked(event.target.value);
    this.setState({htmlMarkdown :markedHtml});
  }  

  render() {
    return (
      <section className="workplace">
        <Editor handleChange = {this.handleChange}/>
        <Preview html={this.state.htmlMarkdown}/>
      </section>
    );
  }
}

// class MarkdownExample extends React.Component {
//   getMarkdownText() {
//     var rawMarkup = marked('This is _Markdown_.');
//     return { __html: rawMarkup };
//   }
//   render() {
//     return <div dangerouslySetInnerHTML={this.getMarkdownText()} />
//   }
// }


function App() {
  return (
    <div className = 'App'>
    <Header />
    {/* < MarkdownExample /> */}
    <Workplace />
    <Footer />
    </div>
  );
}

export default App;
