import { Component } from 'react';
import Link from 'next/link';

export default class Logo extends Component {
  render() {
    return (
      <Link href={'/'} className="text-amber-300 text-4xl font-bold">
        Ṕoke
      </Link>
    );
  }
}
