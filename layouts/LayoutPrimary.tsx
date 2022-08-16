import { FC, PropsWithChildren } from "react";
import Header from "../components/Header";

const LayoutPrimary: FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <Header />
      <main className="d-flex flex-column container">{children}</main>
    </>
  );
};

export default LayoutPrimary;