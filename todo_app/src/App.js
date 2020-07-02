import React, { Component } from "react";
import { TodoBanner } from "./TodoBanner";
import { TodoCreator } from "./TodoCreator";
import { TodoRow } from "./TodoRow";
import { VisibilityControl } from "./VisibilityControl";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Chessah",
      todoItems: [
        { action: "Do the dishes", done: false },
        { action: "Wash the car", done: false },
        { action: "Buy the tickets", done: false },
        { action: "Call Reagan", done: false },
      ],
      showCompleted: true,
    };
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  createNewTodo = (task) => {
    if (!this.state.todoItems.find((item) => item.action === task)) {
      this.setState(
        {
          todoItems: [...this.state.todoItems, { action: task, done: false }],
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state))
      );
    }
  };

  toggleTodo = (todo) =>
    this.setState({
      todoItems: this.state.todoItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      ),
    });

  todoTableRows = (doneValue) =>
    this.state.todoItems
      .filter((item) => item.done === doneValue)
      .map((item) => (
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
      ));

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(
      data != null
        ? JSON.parse(data)
        : {
            userName: "Chessah",
            todoItems: [
              { action: "Do the dishes", done: false },
              { action: "Wash the car", done: false },
              { action: "Buy the tickets", done: false },
              { action: "Call Reagan", done: false },
            ],
            showCompleted: true,
          }
    );
  };

  render = () => (
    <div>
      <TodoBanner user={this.state.userName} tasks={this.state.todoItems} />

      <div className="container-fluid">
        <TodoCreator callback={this.createNewTodo} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Descriprtion</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(false)}</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={this.state.showCompleted}
            callback={(checked) => this.setState({ showCompleted: checked })}
          />
        </div>
        {this.state.showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Descriprion</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
