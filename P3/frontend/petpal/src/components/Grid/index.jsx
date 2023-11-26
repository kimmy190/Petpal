const Grid = ({ cols, children }) => {
  return (
    <div className={`mb-3 md:grid md:grid-cols-${cols} gap-4 rounded-lg`}>
      {children}
    </div>
  );
};

export default Grid;
