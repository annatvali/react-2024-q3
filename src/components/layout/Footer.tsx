import { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="bg-gray-700 p-2">
        <div className="h-24 text-white flex justify-center items-center">
          <p className="font-bold">&copy; 2024 Ṕoke</p>
        </div>
      </div>
    );
  }
}
