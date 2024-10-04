import{ useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingPage from '../Pages/LoadingPage'; // Make sure you have this component created
import Taskbar from '../Components/Taskbar';


const Layout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isTaskbarVisible, setIsTaskbarVisible] = useState(true);
  
    useEffect(() => {
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Minimum loading time of 3 seconds
  
      return () => {
        clearTimeout(loadingTimeout);
        setIsLoading(true); // Reset loading state when unmounting
      };
    }, []);
  
    const handleToggleTaskbar = (isVisible: boolean) => {
      setIsTaskbarVisible(isVisible);
    };
  
    if (isLoading) {
      return <LoadingPage />; // Show loading page while loading
    }
  
    return (
      <>
        {isTaskbarVisible && <Taskbar />}
        <Outlet context={{ toggleTaskbar: handleToggleTaskbar }} /> {/* Pass toggleTaskbar to Outlet context */}
      </>
    );
  };
  
  export default Layout;