import { usePathname } from "next/navigation";
import Header from "./Header";

interface ILayout {
  children: React.ReactNode;
}

const Layout = (props: ILayout) => {
  const { children } = props;

  const pathname = usePathname();
  const currentPath = pathname?.split("/")[1];

  if (currentPath) {
    return <Header>{children}</Header>;
  } else {
    return <>{children}</>;
  }
};

export default Layout;
