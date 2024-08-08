import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends Component {
  render() {
    return (
      <Link to={'/'} className="text-amber-300 text-4xl font-bold">
        Ṕoke
      </Link>
    );
  }
}
