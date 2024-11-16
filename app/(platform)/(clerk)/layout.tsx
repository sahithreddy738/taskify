const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center  h-full">
        <div className="mt-48 md:mt-28">
        {children}
        </div>
    </div>
  );
};

export default ClerkLayout;
