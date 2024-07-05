import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <div className="navbar bg-blue-400 text-white flex gap-4 p-2">
        <Link to="/">Home</Link>
        <Link to="/aboutUs">About Us</Link>
      </div>
    );
  }
}
