import Button from './ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextUrl: string | null;
  previousUrl: string | null;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  previousUrl,
  nextUrl,
  onPageChange,
}) => {
  const handlePrevious = (): void => {
    if (previousUrl) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (nextUrl) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center my-4">
      <Button
        onClick={handlePrevious}
        className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50"
        disabled={!previousUrl}
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
        disabled={!nextUrl}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
