
import Login from "./login/page";
import styles from "./page.module.css";

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
    <main>
      <Login />
      <ToastContainer />
    </main>
  );
}
