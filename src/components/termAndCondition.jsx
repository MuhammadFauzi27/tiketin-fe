export const TermAndCondition = ({ product }) => {
  return (
    <div className="p-4 bg-gray-50 rounded">
      <p className="text-gray-500">Syarat & Ketentuan Component akan ditampilkan di sini</p>
      <p className="text-sm text-gray-400 mt-2">Props: {JSON.stringify(product?.name)}</p>
    </div>
  );
};