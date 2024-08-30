import React from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import SidebarItems from './SidebarItems';

const Sidebar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      w="full"
      h={isMobile ? '60px' : '100vh'}
      bg="black"
      borderTop={isMobile ? '1px solid' : 'none'}
      borderRight={!isMobile ? '1px solid' : 'none'}
      borderColor="whiteAlpha.300"
      position={isMobile ? 'fixed' : 'sticky'}
      bottom={isMobile ? 0 : 'unset'}
      top={isMobile ? 'unset' : 0}
      left={0}
      zIndex={10}
      p={4}
    >
      <Flex
        direction={isMobile ? 'row' : 'column'}
        justifyContent={isMobile ? 'space-around' : 'flex-start'}
        alignItems="center"
        h="full"
      >
        <SidebarItems />
      </Flex>
    </Box>
  );
};

export default Sidebar;
