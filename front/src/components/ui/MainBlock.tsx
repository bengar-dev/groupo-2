interface MainBlockProps {
  children: React.ReactElement | React.ReactElement[];
  center?: boolean;
}

export const MainBlock = (props: MainBlockProps) => {
  const { children, center = false } = props;
  return (
    <div
      className={`min-h-screen bg-white flex flex-col ${
        center && "items-center justify-center"
      }`}
    >
      {children}
    </div>
  );
};
