import { Component } from 'react';
import Button from '../ui/Button';

export default class ErrorButton extends Component {
  handleClick = () => {
    throw new Error('Error thrown from ErrorButton component');
  };

  render() {
    return (
      <Button
        onClick={this.handleClick}
        className="w-32 bg-red-500 hover:bg-red-700"
      >
        Throw Error
      </Button>
    );
  }
}
