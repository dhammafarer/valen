import * as React from "react";
import styled from "styled-components";

interface DrawerProps {
  anchor: "left" | "right" | "top" | "bottom";
  width: number;
  open: boolean;
  handleClose(): void;
  toggleMenu(): void;
}

const DrawerWrapper = styled.div<{width: number, open: boolean}>`
  z-index: 1400;
  position: absolute;
  width: ${props => props.width}px;
  top: 0;
  right: 0;
  display: block;
  transform: ${props => props.open ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.2s ease-out;
`;

const DrawerOverlay = styled.div<{open: boolean, onClick(): void}>`
  z-index: 1400;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: ${props => props.open ? "auto" : "none"};
  background: rgba(0,0,0,0.4);
`;

const DrawerContent = styled.div<{open: boolean}>`
  z-index: 1400;
  position: fixed;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const Drawer: React.SFC<DrawerProps> = ({width, open, toggleMenu, handleClose, children}) => {
  return (
    <>
      <DrawerOverlay open={open} onClick={handleClose}/>
      <DrawerWrapper
        open={open}
        width={width}
      >
        <DrawerContent open={open}>
          {children}
        </DrawerContent>
      </DrawerWrapper>
    </>
  );
}

export {
  Drawer
};
