import { Component } from 'react';
import { Pokemon } from '../types/type';

interface PokemonCardProps extends Pokemon {}

export default class PokemonCard extends Component<PokemonCardProps> {
  constructor(props: PokemonCardProps) {
    super(props);
  }

  generateGradient(id: number) {
    const gradients = [
      'bg-gradient-to-r from-pink-500 to-yellow-500',
      'bg-gradient-to-r from-green-400 to-blue-500',
      'bg-gradient-to-r from-purple-400 to-pink-500',
      'bg-gradient-to-r from-indigo-500 to-purple-500',
      'bg-gradient-to-r from-teal-400 to-blue-400',
    ];

    const index = id % gradients.length;
    return gradients[index];
  }

  render() {
    const { id, name, image, type } = this.props;
    const gradientClass = this.generateGradient(id);

    return (
      <div
        className={`group relative my-4 cursor-pointer overflow-hidden rounded-lg shadow-md transition duration-150 ease-in-out ${gradientClass}`}
      >
        <div className="relative h-40 overflow-hidden rounded-md">
          <div className="absolute top-0 right-0 bg-amber-300 py-2 px-4 rounded-md z-10">
            <p className="text-gray-700 font-bold">{id}</p>
          </div>
          <img
            className="h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-110"
            src={image}
            alt={name}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-700">Type: {type}</p>
        </div>
      </div>
    );
  }
}
