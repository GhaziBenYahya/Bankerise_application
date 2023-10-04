import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin";
import Navbar from "components/navbar/NavbarAdmin";
import Sidebar from "components/sidebar/Sidebar";
import { SidebarContext } from "contexts/SidebarContext";
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

interface RouteType {
  layout: string;
  path: string;
  icon?: React.ReactNode;
  name: string;
  subMenu?: Array<{ path: string; icon: React.ReactNode; name: string, component: any }>;
}

/*interface Props {
  routes: RouteType[];
}*/

export default function Dashboard(props: { [x: string]: any }) {
  const { ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes: RoutesType[]): string => {
    console.log(routes)

    let activeRoute = "";
    routes?.map((route: RouteType, index: number) => {
      for (let i = 0; i < route?.subMenu?.length; i++) {

        
        if (
          
          window.location.href.indexOf("/admin" + route?.subMenu[i].path) !== -1
        ) {
          activeRoute = route?.subMenu[i].name;
          console.log(activeRoute)

        }
      }
    });
    console.log(activeRoute)
    return activeRoute;
  };

  const getActiveNavbar = (routes: RoutesType[]): boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    console.log(activeNavbar)

    return activeNavbar;
  };

  const getActiveNavbarText = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = "";
    routes?.map((route: RouteType, index: number) => {
      for (let i = 0; i < route?.subMenu?.length; i++) {
        if (
          window.location.href.indexOf("/admin" + route?.subMenu[i].path) !== -1
        ) {
          activeNavbar = route?.subMenu[i].name;
        }
      }
    });
    return activeNavbar;
  };

  const getRoutes = (routes: RoutesType[]): any => {
    return routes?.map((route: RouteType, key: any) => {
      if (route.layout === "/admin") {
        for (let i = 0; i < route?.subMenu?.length; i++) {
          if (
            window.location.href.indexOf("/admin" + route?.subMenu[i].path) !== -1
          ) {
            return (
              <Route
                path={route.layout + route.subMenu[i].path}
                component={route?.subMenu[i]?.component}
                key={key}
              />
            );

          }
          
        }
       
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();

  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes as RoutesType[]} display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={"Bankerise"}
                brandText={getActiveRoute(routes as RoutesType[])}
                secondary={getActiveNavbar(routes as RoutesType[])}
                message={getActiveNavbarText(routes as RoutesType[])}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          {getRoute() ? (
            <Box
              mx="auto"
              p={{ base: "20px", md: "30px" }}
              pe="20px"
              minH="100vh"
              pt="50px"
            >
              <Switch>
                {getRoutes(routes as RoutesType[])}
                <Redirect from="/" to="/admin/ProductList" />
              </Switch>
            </Box>
          ) : null}


          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
