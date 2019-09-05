import React from "react";

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      works: []
    };
  }

  add() {
    var title = this.refs.title.value;
    if (localStorage.getItem("works") == null) {
      var works = [];
      works.push(title);
      localStorage.setItem("works", JSON.stringify(works));
    } else {
      var works = JSON.parse(localStorage.getItem("works"));
      works.push(title);
      localStorage.setItem("works", JSON.stringify(works));
    }

    this.setState({
      works: JSON.parse(localStorage.getItem("works"))
    });
  }

  delete(e) {
    var index = e.target.getAttribute("data-key");
    var list = JSON.parse(localStorage.getItem("works"));

    list.splice(index, 1);

    this.setState({
      works: list
    });
    localStorage.setItem("works", JSON.stringify(list));
  }

  render() {
    return (
      <div>
        <h3>TO DO List</h3>

        <input type="text" placeholder="Title..." ref="title" />
        <input tyle="button" value="ADD" onClick={this.add.bind(this)} />
        <br />
        <br />

        <ul>
          {this.state.works.map(function(work, index) {
            return (
              <li key={index}>
                {work}
                <input
                  type="button"
                  value="X"
                  onClick={this.delete.bind(this)}
                  data-key={index}
                />
              </li>
            );
          }, this)}
        </ul>
      </div>
    );
  }
}

export default Todo;
