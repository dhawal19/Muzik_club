import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/auth/Login';
import Missing from './components/Missing';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useMemo } from 'react';
import { useSelector} from 'react-redux/es/hooks/useSelector';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { themeSettings } from './theme';
import Dash from './components/dashboard/Dash';
import { useDispatch } from 'react-redux';
import { setLogin } from './state';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const [isAuth, setIsAuth] = useState(Boolean(token));
  const navigate = useNavigate();


  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const response = await fetch("http://localhost:3500/refresh", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       setIsAuth(true);
  //       dispatch(setLogin({
  //         token: response.accessToken
  //       }      
  //       ));
  //       // navigate("/dash");
  //     }
  //   };
  //   checkAuth();
  
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={ <Home />} />
                <Route path="login" element={<Login />} />
                {<Route path="dash" element={<Dash />} />}
                <Route path="slot" element={<Missing />} />
                <Route path="*" element={<Missing />} />
            </Route>
          </Routes>  
      </ThemeProvider>
    </div>
  );
}

export default App;
