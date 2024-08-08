import { useDispatch, useSelector } from 'react-redux';
import { unselectAll } from '../features/SelectedItemsSlice';
import { AppState } from '../app/store';
import { useTheme } from '../context/ThemeContext';
import Button from './ui/Button';
import { CSVLink } from 'react-csv';
import { Icon } from '@iconify/react';

const Flyout: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: AppState) => state.selectedItems.selectedItems
  );

  if (Object.keys(selectedItems).length === 0) {
    return null;
  }

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'URL', key: 'url' },
  ];

  const csvReport = {
    data: Object.values(selectedItems).map((item) => ({
      name: item,
      url: `https://pokeapi.co/api/v2/pokemon/${item}`,
    })),
    headers: headers,
    filename: `${Object.keys(selectedItems).length}_pokemon.csv`,
  };

  const flyoutClassName =
    theme === 'dark'
      ? 'bg-darkGray shadow-2xl shadow-black text-white'
      : 'bg-white text-black shadow-2xl shadow-black';

  return (
    <div
      className={`flex flex-col items-center gap-4 fixed bottom-0 w-full p-10 text-center z-50 opacity-95 ${flyoutClassName}`}
    >
      <div className="flex flex-col gap-4 w-full max-w-xl">
        <p className="text-lg font-semibold">
          {Object.keys(selectedItems).length} items are selected
        </p>
        <Button
          className="bg-indigo-500 font-semibold flex items-center justify-center p-2 rounded text-white"
          onClick={handleUnselectAll}
        >
          Unselect all
          <Icon icon="mdi:checkbox-blank-outline" className="ml-2" />
        </Button>
        <CSVLink
          {...csvReport}
          className="bg-lime-500 font-semibold p-2 rounded text-white text-center flex items-center justify-center"
        >
          Download
          <Icon icon="mdi:download" className="ml-2" />
        </CSVLink>
      </div>
    </div>
  );
};

export default Flyout;
