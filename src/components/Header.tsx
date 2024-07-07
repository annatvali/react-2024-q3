import { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default class Header extends Component {
  render() {
    return (
      <div className="h-24 bg-gray-700 text-white flex justify-between items-center py-2 px-4">
        <Logo />
        <div className="flex text-xl items-center font-bold gap-6">
          <Link className="hover:text-amber-300 hover:underline" to="/">
            Home
          </Link>
          <Link className="hover:text-amber-300 hover:underline" to="/aboutUs">
            About
          </Link>
        </div>
      </div>
    );
  }
}
