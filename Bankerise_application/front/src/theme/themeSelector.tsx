import { Box, IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import React from 'react';

const ThemeSelector = () => {

    const{ colorMode, toggleColorMode }= useColorMode();
  return (
<Box textAlign={'right'} mt={'0px'} mr={'0px'}>
    <IconButton icon={colorMode === 'light'?<MoonIcon />:<SunIcon />} aria-label='theme ' onClick={ toggleColorMode} />
</Box>
  )
}

export default ThemeSelector;
