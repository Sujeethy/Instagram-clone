import React from 'react';
import { Box, Flex, useBreakpointValue,Spinner } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import Navbar from '../../components/Navbar/Navbar';
import TopBar from '../../components/Topbar/Topbar';  // Import the new TopBar component

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const canRenderSidebar = pathname !== '/auth' && user && !isMobile;
  const canRenderNavbar = !user && !loading && pathname !== '/auth';

  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    <Flex flexDir="column" h="100vh">
      {/* Top bar for mobile */}
      {isMobile && <TopBar />}

      <Flex flex={1} flexDir={canRenderSidebar ? 'row' : 'column'}>
        {/* Sidebar on the left or at the bottom */}
        { (
          <Box w={{ base: '100%', md: '240px' }} order={{ base: 2, md: 1 }}>
            <Sidebar />
          </Box>
        )}
        {/* Navbar */}
        {canRenderNavbar && <Navbar />}
        {/* Page content */}
        <Box flex={1} w="full" mx="auto" order={{ base: 1, md: 2 }}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir="column" h="100vh" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Flex>
  );
};
