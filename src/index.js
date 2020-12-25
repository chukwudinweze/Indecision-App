import React from "react";
import ReactDOM from "react-dom";

class Indecision extends React.Component {
  constructor(props) {
    super(props);
    this.whatToDo = this.whatToDo.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: []
    };
  }

  componentDidMount() {
    try {
      const json = JSON.parse(localStorage.getItem("options"));
      if (json) {
        this.setState(() => {
          return {
            options: json
          };
        });
      }
    } catch (e) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }

  whatToDo() {
    const todoIndex = Math.floor(Math.random() * this.state.options.length);
    const todo = this.state.options[todoIndex];
    alert(todo);
  }

  handleRemoveAll() {
    this.setState(() => ({ options: [] }));
  }

  handleAddOption(option) {
    this.setState(prevState => {
      if (!option) {
        return "input a valid option to be added";
      } else if (prevState.options.indexOf(option) > -1) {
        return "option already exits";
      }
      return {
        options: [...prevState.options, option]
      };
    });
  }

  handleDeleteOption(optionToDelete) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToDelete !== option)
    }));
  }
  render() {
    const title = "Indecision";

    const subtitle = "Put your hands in the life of a computer";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          whatToDo={this.whatToDo}
        />
        <Options
          options={this.state.options}
          handleRemoveAll={this.handleRemoveAll}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}
const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};
const Action = props => {
  return (
    <div>
      <button onClick={props.whatToDo} disabled={!props.hasOptions}>
        what should I do
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <button onClick={props.handleRemoveAll}>Remove All</button>
      {props.options.length === 0 && <p>Please add an option to get started</p>}
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
    </div>
  );
};

const Option = props => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={e => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        Remove
      </button>
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }));
    if (!error) {
      e.target.elements.option.value = "";
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<Indecision />, document.getElementById("root"));
