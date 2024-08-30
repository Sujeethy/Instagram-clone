import React from 'react';
import { Flex, Link, Button, Tooltip, Box ,Spinner} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { InstagramMobileLogo } from '../../assets/constants';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';
import Search from '../Sidebar/Search';

const TopBar = () => {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Flex
      as="header"
      w="full"
      p={4}
      bg="black"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="whiteAlpha.300"
    >
      {/* Instagram logo */}
      <Link to="/" as={RouterLink} cursor="pointer">
        <InstagramMobileLogo />
      </Link>

      {/* Search bar */}
      <Box flex={1} mx={4}>
        <Search />
      </Box>

      {/* Logout button */}
      <Tooltip hasArrow label="Logout" placement="bottom" openDelay={500}>
        <Flex
          onClick={handleLogout}
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          borderRadius="md"
          p={2}
          _hover={{ bg: 'whiteAlpha.200' }}
        >
          <BiLogOut size={25} />
          <Button
            variant="ghost"
            _hover={{ bg: 'transparent' }}
            isLoading={isLoggingOut}
            display={{ base: 'none', md: 'block' }}
          >
            Logout
          </Button>
        </Flex>
      </Tooltip>
    </Flex>
  );
};

export default TopBar;
