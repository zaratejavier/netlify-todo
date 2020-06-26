import React from 'react';
import { Form, Header, Container, List, Input, Segment } from 'semantic-ui-react';
import Axios from "axios"

class App extends React.Component {
  state = { name: '', todos: [], }

  async componentDidMount() {
    try {
    const res = await Axios.get(
      `https://todo-app-jz.herokuapp.com/api/todos`
      )
      this.setState({todos: res.data})
      }
      catch (e) {
        alert("an error ocured")
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, todos, } = this.state;
    this.setState({ todos: [{ name, complete: false }, ...todos], name: '', })
  }

  render() {
    const { name, todos, } = this.state;
    return (
      <Container>
        <Segment textAlign="center">
          <Header as="h3" textAlign="center">Todo List</Header>
          <Form onSubmit={this.handleSubmit}>
            <Input 
              required
              value={name}
              onChange={ e => this.setState({ name: e.target.value }) }
            />
          </Form>
          <List>
            { todos.map( (t,i) => <List.Item key={i}>{t.name}</List.Item> )}
          </List>
        </Segment>
      </Container>
    );
  }
}

export default App;