const Card = ({ title, children }) => {
  return (
    <div className="p-6 col-span-1 bg-white shadow-lg mb-4 md:mb-0 rounded-lg">
      {title ? <h2 className="mb-2 font-bold text-xl">{title}</h2> : <></>}
      <div>{children}</div>
    </div>
  );
};

export default Card;
