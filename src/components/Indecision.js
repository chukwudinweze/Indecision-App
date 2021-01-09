import React from "react";
import AddOption from "./AddOption";
import Action from "./Action";
import Header from "./Header";
import Options from "./Options";
import OptionModal from "./OptionModal";

class Indecision extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

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

  whatToDo = () => {
    const todoIndex = Math.floor(Math.random() * this.state.options.length);
    const todo = this.state.options[todoIndex];
    this.setState(() => ({ selectedOption: todo }));
  };

  handleRemoveAll = () => {
    this.setState(() => ({ options: [] }));
  };

  handleAddOption = option => {
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
  };

  handleDeleteOption = optionToDelete => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToDelete !== option)
    }));
  };

  clearOptionModal = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };
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
        <OptionModal
          selected={this.state.selectedOption}
          clearOptionModal={this.clearOptionModal}
        />
      </div>
    );
  }
}

export default Indecision;
