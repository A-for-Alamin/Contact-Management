export const ItemList = ({
  id,
  name,
  phone,
  email,
  onDelClick,
  onEditClick,
}) => {
  return (
    <li
      key={id}
      className="flex justify-between items-center gap-1 p-2 md:p-4 border rounded"
    >
      <div>
        <p className="font-semibold">{name}</p>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
      <div className="md:space-x-2 flex flex-col md:flex-row gap-3 ">
        <button
          onClick={() => onEditClick({ id, name, phone, email })}
          className="bg-yellow-500 text-white py-1 px-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelClick(id)}
          className="bg-red-500 text-white py-1 px-2 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
