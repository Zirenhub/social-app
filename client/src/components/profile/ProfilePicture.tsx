type Props = {
  styles: string;
};

function ProfilePicture({ styles }: Props) {
  return (
    <div
      className={`${styles} rounded-full bg-default-pfp bg-cover bg-center`}
    ></div>
  );
}

export default ProfilePicture;
