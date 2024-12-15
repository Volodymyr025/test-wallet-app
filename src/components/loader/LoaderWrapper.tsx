interface LoaderProps {
  loader: boolean;
  children: any;
}

export const LoaderWrapper = ({ loader, children }: LoaderProps) => {
  return loader ? (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      <h1 className="text-2xl">Loading...</h1>
    </div>
  ) : (
    <>{children}</>
  );
};
