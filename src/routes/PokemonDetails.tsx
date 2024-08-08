import { RefObject } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { PokemonExtended } from '../types/types';
import { useGetPokemonDetailsQuery } from '../services/apiService';
import generateGradient from '../utils/gradientGenerator';
import Button from '../components/ui/Button';
import useOutsideClick from '../hooks/useOutsideClick';

const PokemonDetails: React.FC<PokemonExtended> = () => {
  const { detailsId } = useParams<{ detailsId: string }>();
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();

  const {
    data: pokemon,
    isLoading,
    error,
  } = useGetPokemonDetailsQuery(detailsId ?? '');

  const detailsRef: RefObject<HTMLDivElement> = useOutsideClick(() =>
    navigate(`/page/${pageId}`)
  );

  const handleClose = () => {
    navigate(`/page/${pageId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading Pokemon details</div>;
  }
  const gradientClass = detailsId ? generateGradient(Number(detailsId)) : '';
  return (
    <div
      ref={detailsRef}
      className={`${gradientClass} p-4 border-gray-300 h-full relative rounded-md`}
    >
      {pokemon && (
        <>
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
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="min-w-full h-auto"
            />
            <div className="w-40 flex flex-col md:flex-row md:w-12">
              <img
                src={pokemon.sprites.back_default}
                alt={pokemon.name}
                className="min-w-full h-auto"
              />
              <img
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                className="min-w-full h-auto"
              />
              <img
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
                className="min-w-full h-auto"
              />
            </div>
            <p>
              <span className="font-bold text-amber-400">ID :</span>{' '}
              {pokemon.id}
            </p>
            <p>
              <span className="font-bold text-amber-400">
                Base Experience :
              </span>{' '}
              {pokemon.base_experience}
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
              {pokemon.types.map((type) => type.type.name).join(', ')}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
