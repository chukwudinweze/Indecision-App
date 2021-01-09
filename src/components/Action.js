import React from "react";

const Action = props => (
  <div>
    <button onClick={props.whatToDo} disabled={!props.hasOptions}>
      what should I do
    </button>
  </div>
);

export default Action;
