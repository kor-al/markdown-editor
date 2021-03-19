import './App.css';
import './scss/styles.css';
import React from 'react';
import marked from 'marked';

function Header() {
  return ( <header className = "header container" >
    <h1 > Markdown Editor </h1> 
    </header>
  );
}

function Footer() {
  return ( <    footer className = "footer container" >
    2021 </footer>
  );
}



function Editor(props) {
  return ( <div className = "editor" >
    <textarea className = "editor__textarea"
    name = 'editor'
    placeholder = "Enter markdown"
    onInput = {
      props.handleChange
    } >
    </textarea> </div>
  )
}


function Preview(props) {
  return ( <div className = "preview"
    dangerouslySetInnerHTML = {
      {
        __html: props.html
      }
    }
    />
  );
}


class Workplace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlMarkdown: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // Autoresize textarea
    //https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      this.style.height = "auto";
      this.style.height = (this.scrollHeight) + "px";
    }
  }

  handleChange(event) {
    var markedHtml = marked(event.target.value, {
      breaks: true
    });
    this.setState({
      htmlMarkdown: markedHtml
    });
  }

  render() {
    return ( <section className = "workplace container" >
      <      Editor handleChange = {
        this.handleChange
      }
      /> <      Preview html = {
        this.state.htmlMarkdown
      }
      /> </section>
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
  return ( <div className = 'App' >
    <Header /> {
      /* < MarkdownExample /> */ } <Workplace />
    <Footer />
    </div>
  );
}

export default App;