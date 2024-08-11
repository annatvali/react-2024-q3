import { useRouter } from 'next/router';
import PokemonGallery from './PokemonGallery';
import PokemonDetails from './PokemonDetails';

const HomeLayout = () => {
  const router = useRouter();
  const { detailsId } = router.query;

  const numericDetailsId = Array.isArray(detailsId)
    ? parseInt(detailsId[0], 10)
    : typeof detailsId === 'string'
      ? parseInt(detailsId, 10)
      : undefined;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <div className="col-span-1 sm:col-span-3">
        <PokemonGallery />
      </div>
      <div className="col-span-1 sm:col-span-1">
        {typeof numericDetailsId === 'number' && !isNaN(numericDetailsId) && (
          <PokemonDetails detailsId={numericDetailsId} />
        )}
      </div>
    </div>
  );
};

export default HomeLayout;
