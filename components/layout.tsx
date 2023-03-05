import Header from "./header";
import Footer from "./footer";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <h1> layout... </h1>
      <div>{children}</div>
      <Footer />
    </>
  );
}
