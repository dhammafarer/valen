import * as React from "react";
import { MakeMenu } from "../utils/MakeMenu";
import { Drawer } from "../Drawer";
import { MenuButton } from "./MenuButton";
import { CloseButton } from "./CloseButton";
import { styled, Flex, Text } from "primithemes";
import { Button } from "../Button";
import { Image } from "../Image";
import { Link } from "../../i18n";

const Logo = styled(Image)`
  margin: 0 auto;
`;

const DrawerContent = styled(Flex)`
  height: 100vh;
  position: relative;
  overflow-y: auto;
`;

interface DrawerMenuProps {
  logo?: any;
  title?: React.ReactNode;
  navItems: { to: string; label: React.ReactNode }[];
}

const DrawerMenu: React.SFC<DrawerMenuProps> = ({ logo, title, navItems }) => {
  return (
    <MakeMenu>
      {injected => (
        <>
          <MenuButton onClick={injected.toggleMenu} />

          <Drawer
            open={injected.open}
            anchor={"right"}
            handleClose={injected.handleClose}
            toggleMenu={injected.toggleMenu}
            width={300}
          >
            <DrawerContent
              flexDirection="column"
              bg="background.light"
              spacing={3}
            >
              <Flex justifyContent="flex-end">
                <CloseButton onClick={injected.handleClose} />
              </Flex>
              {logo && (
                <Flex justifyContent="center">
                  <Link to="/">
                    <Logo critical fixed={logo} />
                  </Link>
                </Flex>
              )}
              {title && (
                <Text as="h3" fontSize={3} textAlign="center">
                  {title}
                </Text>
              )}
              <Flex justifyContent="center" flexDirection="column" p={1}>
                {navItems.map(x => (
                  <Flex key={x.to} p={1}>
                    <Button onClick={injected.handleClose} width={1} to={x.to}>
                      {x.label}
                    </Button>
                  </Flex>
                ))}
              </Flex>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </MakeMenu>
  );
};

export { DrawerMenu };
