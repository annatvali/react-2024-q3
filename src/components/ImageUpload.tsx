import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setImage } from '../features/formSlice';
import fileToBase64 from '../utils/base64';

const ImageUpload: React.FC = () => {
  const dispatch = useDispatch();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size exceeds 2MB');
        return;
      }

      const validExtensions = ['image/jpeg', 'image/png'];
      if (!validExtensions.includes(file.type)) {
        alert('Invalid file type. Only JPEG and PNG are allowed.');
        return;
      }

      try {
        const base64 = await fileToBase64(file);
        dispatch(setImage(base64));
      } catch (error) {
        console.error('Error converting file to base64:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;
