import "./App.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";
import { faArrows } from "@fortawesome/free-solid-svg-icons";

import Prism from "prismjs";

import { marked } from "marked";

<script
  crossorigin
  src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"
></script>;

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  },
});

// INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value,
    });
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized,
    });
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized,
    });
  }
  render() {
    const classes = this.state.editorMaximized
      ? ["editorWrap maximized", "previewWrap hide", "fa fa-compress"]
      : this.state.previewMaximized
      ? ["editorWrap hide", "previewWrap maximized", "fa fa-compress"]
      : ["editorWrap", "previewWrap", "fa fa-arrows-alt"];
    console.log(classes[3]);
    return (
      <div>
        <div className={classes[0]}>
          <Toolbar
            icon={classes[2]}
            onClick={this.handleEditorMaximize}
            text="Editor"
          />
          <Editor markdown={this.state.markdown} onChange={this.handleChange} />
        </div>
        <div className="converter" />
        <div className={classes[1]}>
          <Toolbar
            icon={classes[2]}
            onClick={this.handlePreviewMaximize}
            text="Previewer"
          />

          <Preview markdown={this.state.markdown} />
        </div>
      </div>
    );
  }
}

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <FontAwesomeIcon className="fa fa-free-code-camp" icon={faFreeCodeCamp} />
      {props.text}
      <FontAwesomeIcon
        className={props.icon}
        icon={faArrows}
        onClick={props.onClick}
      />
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      id="editor"
      onChange={props.onChange}
      type="text"
      value={props.markdown}
    />
  );
};

const Preview = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer }),
      }}
      id="preview"
    />
  );
};

const placeholder = `# Welcome to React Markdown Previewer!

## Font-Awesome.
### Use icons in your web application.

Heres some code, how to use Font-Awesome in React.

\`\`\`
// this is multi-line code:

// Light:
  <FontAwesomeIcon icon={["fal", "coffee"]} />
  // Regular:
  <FontAwesomeIcon icon={["far", "coffee"]} />
  // Solid
  <FontAwesomeIcon icon={["fas", "coffee"]} />
  // ...or, omit as FontAwesome defaults to solid, so no need to prefix:
  <FontAwesomeIcon icon="coffee" />
  // Brand:
  <FontAwesomeIcon icon={["fab", "github"]} />
\`\`\`

Here is link for Font-awesome documentation.
[Font-Awesome](https://fontawesome.com/docs)

And feel free to go crazy ~~crossing stuff out~~.

There's also [FreeCodeCamp](https://www.freecodecamp.org), and




![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export default App;
