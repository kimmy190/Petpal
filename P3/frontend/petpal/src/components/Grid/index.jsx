const Grid = ({ cols, children }) => {
  return (
    <div
      className={`mb-3 w-full md:grid md:grid-cols-${cols} gap-4 rounded-lg`}
      style={{
        gridTemplateColumns: "1fr ".repeat(cols),
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
