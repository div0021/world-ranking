const Loader = () => {
  return (
    <div className="w-full animate-pulse flex flex-col items-center justify-start gap-4">
      <div>
        <div className="w-48 h-6 bg-primary-background rounded-md"></div>
        <div className="w-28 h-4 bg-primary-background mx-auto mt-3 rounded-md"></div>
      </div>
      <div className="h-7 bg-primary-background w-full rounded-md"></div>
      <div className="h-7 bg-primary-background w-full rounded-md"></div>
      <div className="h-7 bg-primary-background w-full rounded-md"></div>
      <div className="h-7 bg-primary-background w-1/2 rounded-md"></div>
    </div>
  );
};

export default Loader;
