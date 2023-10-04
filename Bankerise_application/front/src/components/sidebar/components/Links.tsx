import React, { useState } from 'react';
import { NavLink, Route, useLocation, useHistory } from 'react-router-dom';
import { Box, Flex, Text, useColorModeValue, Collapse } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

interface RouteType {
  layout: string;
  path: string;
  icon?: React.ReactNode;
  name: string;
  subMenu?: Array<{ path: string; icon: React.ReactNode; name: string }>;
}

interface Props {
  routes: RouteType[];
}

const SidebarLinks: React.FC<Props> = (props: Props) => {
  const location = useLocation();
  const history = useHistory();
  const activeIconColor = useColorModeValue('brand.500', 'white');
  const textColor = useColorModeValue('secondaryGray.500', 'white');

  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  const handleSubMenuClick = (subMenuPath: string) => {
    setActiveSubMenu((prevSubMenu) => (prevSubMenu === subMenuPath ? null : subMenuPath));
  };

  const handleSubMenuItemClick = (path: string) => {
    history.push(path);
  };

  const createLinks = (routes: RouteType[]) => {
    return routes.map((route: RouteType, index: number) => {
      if (route.layout === '/admin') {
        return (
          <Route key={index} path={route.layout + route.path} exact>
            {({ match }) => (
              <>
                <Box
                  onClick={() => handleSubMenuClick(route.path)}
                  cursor="pointer"
                  w="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pl={match ? '16px' : '20px'}
                  pr="10px"
                  py="5px"
                >
                  <Flex alignItems="center">
                    {route.icon && (
                      <Box color={match ? activeIconColor : textColor} me="18px">
                        {route.icon}
                      </Box>
                    )}
                    <Text color={match ? activeIconColor : textColor} fontWeight={match ? 'bold' : 'normal'}>
                      {route.name}
                    </Text>
                  </Flex>
                  {route.subMenu && route.subMenu.length > 0 && (
                    <Box color={match ? activeIconColor : textColor} fontWeight={match ? 'bold' : 'normal'}>
                      {activeSubMenu === route.path ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </Box>
                  )}
                </Box>
                {route.subMenu && route.subMenu.length > 0 && (
                  <Collapse in={activeSubMenu === route.path}>
                    {route.subMenu.map((item, subIndex) => (
                      <NavLink
                        to={`${route.layout}${item.path}`}
                        key={subIndex}
                        isActive={() => activeRoute(`${route.layout}${item.path}`)}
                        onClick={() => handleSubMenuItemClick(`${route.layout}${item.path}`)}
                      >
                        <Box pl="40px" py="5px">
                          <Flex alignItems="center" >
                            {item.icon && (
                              <Box color={activeRoute(`${route.layout}${item.path}`) ? activeIconColor : textColor} me="18px">
                                {item.icon}
                              </Box>
                            )}
                            <Text
                              color={activeRoute(`${route.layout}${item.path}`) ? activeIconColor : textColor}
                              fontWeight={activeRoute(`${route.layout}${item.path}`) ? 'bold' : 'normal'}
                            >
                              {item.name}
                              </Text>
                          </Flex>
                        </Box>
                      </NavLink>
                    ))}
                  </Collapse>
                )}
              </>
            )}
          </Route>
        );
      }
      return null;
    });
  };

  return <>{createLinks(props.routes)}</>;
};

export default SidebarLinks;
