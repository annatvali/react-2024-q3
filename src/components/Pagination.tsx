import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../features/PokemonSlice';
import Button from './ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageId: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      const pageId = currentPage - 1;
      onPageChange(pageId);
      dispatch(setCurrentPage(pageId));
      router.push(`/page/${pageId}`);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      const pageId = currentPage + 1;
      onPageChange(pageId);
      dispatch(setCurrentPage(pageId));
      router.push(`/page/${pageId}`);
    }
  };

  return (
    <div className="flex justify-center items-center my-4">
      <Button
        onClick={handlePrevious}
        className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="mx-2">
        Page <span className="text-amber-00 font-bold"> {currentPage} </span> of{' '}
        {totalPages}
      </span>
      <Button
        onClick={handleNext}
        className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
