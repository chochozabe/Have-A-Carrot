interface IHeaderProps {
  children: React.ReactNode;
}

export default function Header(props: IHeaderProps) {
  const { children } = props;

  return (
    <>
      <div className="h-20 p-5">
        <span className="text-4xl font-semibold text-orange-500">
          Have a Carrot 🥕
        </span>
      </div>
      <div className="p-5">{children}</div>
    </>
  );
}
