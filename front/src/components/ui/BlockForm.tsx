interface BlockFormProps {
  children: React.ReactElement | React.ReactElement[];
}

export const BlockForm = (props: BlockFormProps) => {
  const { children } = props;
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-4 rounded flex flex-col">
      {children}
    </div>
  );
};
