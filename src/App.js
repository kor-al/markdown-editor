import './App.css';
import './scss/styles.css';
import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';

function Header() {
  return ( <header className = "header container" >
    <h1 > Markdown Editor </h1> 
    </header>
  );
}

function Footer() {
  return ( <    footer className = "footer container" >
    Designed and Built by <a href="https://github.com/kor-al/">kor-al</a></footer>
  );
}



function Editor(props) {
  return ( <div className = "editor" >
    <textarea className = "editor__textarea" id="editor"
    name = 'editor'
    placeholder = "Enter markdown"
    onInput = {
      props.handleChange
    } >
    </textarea> </div>
  )
}


function Preview(props) {
  return ( <div className = "preview" id="preview"
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
    this.initInput = `# This is markdown\n 1. Write markdown on the left \n 2. Results appear on the right\n\nAdd emphasis by making text **bold** or *italic*.\n ## More options\nYou can add \`code inline\` or \n\`\`\` \n{\n'make': 'a fenced code block'\n}\n\`\`\`\n> Quotes are highlighted\n\n![Mandarin duck](https://upload.wikimedia.org/wikipedia/commons/5/51/Mandarin.duck.arp.jpg)  \n Check out [Markdown Basic Syntax](https://www.markdownguide.org/basic-syntax/)  
    `;
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

    //Render the initial value - input event
    const editor = document.getElementById("editor");
    var event = new Event('input', {
      'bubbles': true,
      'cancelable': true
  });
    editor.value = this.initInput;
    editor.dispatchEvent(event);
  }

  handleChange(event) {
    var markedHtml = marked(event.target.value, {
      breaks: true
    });
    //sanitize
    markedHtml = DOMPurify.sanitize( markedHtml , {USE_PROFILES: {html: true}} );

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


function App() {
  return ( <div className = 'App' >
    <Header />
    <Workplace />
    <Footer />
    </div>
  );
}

export default App;