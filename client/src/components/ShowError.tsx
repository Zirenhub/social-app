type Props = {
  message: string;
};

function ShowError({ message }: Props) {
  return <div className="p-4">{message}</div>;
}

export default ShowError;
