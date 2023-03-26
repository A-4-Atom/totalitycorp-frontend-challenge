import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>ElectroMart</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="description"
          content="Find the latest electronic products at our online store! Shop for laptops, mobiles, gaming consoles, and more at the best prices. Get free shipping and easy returns."
        />
        <meta name="robots" content="index, follow"></meta>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
