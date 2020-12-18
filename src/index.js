import React from "react";
import ReactDOM from "react-dom";

class Indecision extends React.Component {
  constructor(props) {
    super(props);
    this.whatToDo = this.whatToDo.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: []
    };
  }

  whatToDo() {
    const todoIndex = Math.floor(Math.random() * this.state.options.length);
    const todo = this.state.options[todoIndex];
    alert(todo);
  }

  handleRemoveAll() {
    this.setState(() => {
      return {
        options: []
      };
    });
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
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  handleClick() {
    alert("mod");
  }
  render() {
    return (
      <div>
        <button onClick={this.props.whatToDo} disabled={!this.props.hasOptions}>
          what should I do
        </button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleRemoveAll}>Remove All</button>
        {this.props.options.map(option => (
          <Option key={option} optionText={option} />
        ))}
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return <div>option: {this.props.optionText}</div>;
  }
}

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

    this.setState(() => {
      return {
        error
      };
    });
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
