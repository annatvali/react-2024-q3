import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearNewEntryIndex } from '../features/formSlice';
import { RootState } from '../app/store';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.data);
  const newEntryIndex = useSelector(
    (state: RootState) => state.form.newEntryIndex
  );

  useEffect(() => {
    if (newEntryIndex !== null) {
      const timer = setTimeout(() => {
        dispatch(clearNewEntryIndex());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newEntryIndex, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <nav className="w-full bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-300 bg-gray-700 p-2 rounded'
                  : 'text-white hover:text-yellow-300 hover:bg-gray-700 p-2 rounded'
              }
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/uncontrolled-form"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-300 bg-gray-700 p-2 rounded'
                  : 'text-white hover:text-yellow-300 hover:bg-gray-700 p-2 rounded'
              }
            >
              Uncontrolled Form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hook-form"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-300 bg-gray-700 p-2 rounded'
                  : 'text-white hover:text-yellow-300 hover:bg-gray-700 p-2 rounded'
              }
            >
              Hook Form
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex-grow w-full p-4 bg-gray-100">
        <Outlet />
        <div className="mt-4 flex flex-wrap gap-4">
          {formData.map((data, index) => (
            <div
              key={index}
              className={`border p-4 rounded-lg w-64 transition-colors duration-300 ${
                index === newEntryIndex
                  ? 'bg-green-100 border-green-500'
                  : 'bg-white border-gray-300'
              }`}
            >
              <h3 className="font-bold text-xl mb-2">Registration Data</h3>
              <p>
                <span className="font-semibold">Name:</span> {data.name}
              </p>
              <p>
                <span className="font-semibold">Age:</span> {data.age}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {data.email}
              </p>
              <p>
                <span className="font-semibold">Gender:</span> {data.gender}
              </p>
              <p>
                <span className="font-semibold">Country:</span> {data.country}
              </p>
              {data.picture && (
                <div>
                  <h4 className="font-semibold mt-2">Uploaded File(s):</h4>
                  <ul className="mx-2 bg-gray-200 rounded-md p-2 my-2">
                    {(Array.isArray(data.picture)
                      ? data.picture
                      : [data.picture]
                    ).map((file, idx) => {
                      if (!(file instanceof File)) {
                        console.error('Invalid file type:', file);
                        return null;
                      }
                      const objectURL = URL.createObjectURL(file);
                      return (
                        <li key={idx} className="mt-1">
                          <p>
                            <span className="font-semibold">File Name:</span>{' '}
                            {file.name}
                          </p>
                          <p>
                            <span className="font-semibold">File Size:</span>{' '}
                            {file.size} bytes
                          </p>
                          <p>
                            <span className="font-semibold">File Type:</span>{' '}
                            {file.type}
                          </p>
                          {file.type.startsWith('image/') && (
                            <img
                              src={objectURL}
                              alt={file.name}
                              className="mt-2 max-w-full h-auto rounded"
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
