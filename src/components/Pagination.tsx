import Button from './ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
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
