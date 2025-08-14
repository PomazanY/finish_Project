import { Outlet } from "react-router-dom";

import Header from "../../../modules/Header/Header"
import Footer from "../../../modules/Footer/Footer"

import styles from "./Layout.module.css"

const Layout = () => {
  return (
    <>
    <div className={styles.container}>
      <Header />
      <main>
        <Outlet /> 
      </main>
    </div>
    <Footer/>
    </>
     
  );
};

export default Layout;
