import Header from './components/layout/header';
import './styles/global.css';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { fetchUser } from './services/api.service';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './components/context/auth.context';
import { Spin } from 'antd';

const App = () => {
  const { setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // const delay = miliseconds => {
  //   return new Promise(
  //     (resolve, reject) => {
  //       setTimeout(() => {
  //         resolve()
  //       }, miliseconds)
  //     }
  //   )
  // }

  const fetchUserInfo = async () => {
    // await delay(3000);
    const res = await fetchUser();
    if (res.data) {
      setUser(res.data.user);
    }
    setIsLoading(true);
  }

  return (
    (!isLoading ?
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 50%)"
        }}
      >
        <Spin />
      </div> : <>
        <Header />
        <Outlet />
        <Footer />
      </>)

  );
}

export default App;