import { FC, PropsWithChildren } from "react";
import Header from "../components/Header";

const LayoutPrimary: FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <Header />
      <main className="d-flex flex-column container flex-grow-1">{children}</main>
    </>
  );
};

export default LayoutPrimary;