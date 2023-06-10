import { usePathname } from "next/navigation";
import Header from "./Header";
import NavBar from "./Nav";

interface ILayout {
  children: React.ReactNode;
}

const Layout = (props: ILayout) => {
  const { children } = props;

  const pathname = usePathname();
  const currentPath = pathname?.split("/")[1];

  if (currentPath) {
    return (
      <div className="mx-5">
        <Header />
        <NavBar />
        {children}
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default Layout;
