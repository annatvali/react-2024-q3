import { RefObject } from 'react';
import { useRouter } from 'next/router';
import { useGetPokemonDetailsQuery } from '../services/apiService';
import generateGradient from '../utils/gradientGenerator';
import Button from '../components/ui/Button';
import useOutsideClick from '../hooks/useOutsideClick';
import Image from 'next/image';

interface PokemonDetailsProps {
  detailsId: number;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ detailsId }) => {
  const router = useRouter();
  const { pageId } = router.query;

  const {
    data: pokemon,
    isLoading,
    error,
  } = useGetPokemonDetailsQuery(detailsId);

  const detailsRef: RefObject<HTMLDivElement> = useOutsideClick(() =>
    router.push(`/page/${pageId}`)
  );

  const handleClose = () => {
    router.push(`/page/${pageId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading Pokemon details</div>;
  }

  const gradientClass = generateGradient(detailsId);
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
            <Image
              width={100}
              height={100}
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="min-w-full h-auto"
            />
            <div className="w-40 flex flex-col md:flex-row md:w-12">
              <Image
                width={100}
                height={100}
                src={pokemon.sprites.back_default as string}
                alt={pokemon.name}
                className="min-w-full h-auto"
              />
              <Image
                width={100}
                height={100}
                src={pokemon.sprites.front_shiny as string}
                alt={pokemon.name}
                className="min-w-full h-auto"
              />
              <Image
                width={100}
                height={100}
                src={pokemon.sprites.back_shiny as string}
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
              {pokemon.types?.map((type) => type.type.name).join(', ')}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
