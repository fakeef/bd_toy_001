import Header from "./header";
import Footer from "./footer";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="flex flex-row h-full justify-center">{children}</div>
      <Footer />
    </div>
  );
}
