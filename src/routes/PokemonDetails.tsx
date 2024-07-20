import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { PokemonDetails } from '../types/type';
import { getPokemonDetails } from '../services/api';
import generateGradient from '../utils/gradientGenerator';
import Button from '../components/ui/Button';
import useOutsideClick from '../hooks/useOutsideClick';

const PokemonDetails: React.FC = () => {
  const { detailsId } = useParams<{ detailsId: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const detailsRef = useRef(null);

  useOutsideClick(detailsRef, () => navigate(`/page/${pageId}`));

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        if (typeof detailsId === 'string') {
          const numericId = parseInt(detailsId, 10);
          const details = await getPokemonDetails(numericId);
          setPokemon(details);
        } else {
          console.error('Invalid Pokémon ID');
        }
      } catch (error) {
        console.error('Failed to load Pokémon details', error);
      } finally {
        setLoading(false);
      }
    };

    if (detailsId) {
      fetchPokemonDetails();
    }
  }, [detailsId]);

  const handleClose = () => {
    navigate(`/page/${pageId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pokemon) {
    return <p>No Pokémon details available.</p>;
  }

  const gradientClass = pokemon.id ? generateGradient(pokemon.id) : '';

  return (
    <div
      ref={detailsRef}
      className={`${gradientClass} p-4 border-l border-gray-300 h-full relative`}
    >
      <Button
        onClick={handleClose}
        className="absolute top-0 right-2 mb-4 text-2xl font-bold"
      >
        x
      </Button>
      <div className="mt-16 text-amber-200">
        <h2 className="uppercase text-xl text-center text-white font-bold my-4">
          {pokemon.name}
        </h2>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="min-w-full h-auto"
        />
        <p>
          <span className="font-bold text-amber-400">ID :</span> {pokemon.id}
        </p>
        <p>
          <span className="font-bold text-amber-400">Base Experience :</span>{' '}
          {pokemon.baseExperience}
        </p>
        <p>
          <span className="font-bold text-amber-400">Height :</span>{' '}
          {pokemon.height}{' '}
        </p>
        <p>
          <span className="font-bold text-amber-400">Weight :</span>{' '}
          {pokemon.weight}
        </p>
        <p>
          <span className="font-bold text-amber-400">Types :</span>{' '}
          {pokemon.types.join(', ')}
        </p>
      </div>
    </div>
  );
};

export default PokemonDetails;
