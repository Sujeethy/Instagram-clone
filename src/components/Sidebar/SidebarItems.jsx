import React from 'react';
import { Flex, useBreakpointValue, Link, Button, Box } from '@chakra-ui/react';
import CreatePost from './CreatePost';
import Home from './Home';
import Notifications from './Notifications';
import ProfileLink from './ProfileLink';
import { Link as RouterLink } from 'react-router-dom';
import { InstagramLogo, InstagramMobileLogo } from '../../assets/constants';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';

const SidebarItems = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Flex
      direction="column"
      gap={5 }
      h="full"
      justifyContent="space-between" // Pushes logout button to the bottom
      w="full"
    >
      {/* Instagram Logo */}
      
      
      {/* Main Content */}
      <Flex direction={isMobile ? 'row' : 'column'} justifyContent={"space-around"} alignContent={"center"} gap={isMobile ? 6 : 5} w="full">
	  {( !isMobile &&   <Link to="/" as={RouterLink} pl={2} cursor="pointer"  >
          <InstagramLogo />
        </Link>)}
		
        <Home />
        <Notifications />
        <CreatePost />
        <ProfileLink />
      </Flex>

      {/* Logout Button */}
      {!isMobile &&<Flex
        onClick={handleLogout}
        alignItems="center"
        gap={4}
        _hover={{ bg: 'whiteAlpha.400' }}
        borderRadius={6}
        p={2}
        w="full"
        justifyContent={{ base: 'center', md: 'flex-start' }}
      >
        <BiLogOut size={25} />
        <Button
          display={{ base: 'none', md: 'block' }}
          variant="ghost"
          _hover={{ bg: 'transparent' }}
          isLoading={isLoggingOut}
        >
          Logout
        </Button>
      </Flex>}
    </Flex>
  );
};

export default SidebarItems;
