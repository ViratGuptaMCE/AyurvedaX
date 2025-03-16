// App.jsx
import React from "react";
import { Floor } from "./floor";
import { Lighting } from "./lights";
import { Walls } from "./walls";
import { Paintings } from "./paintings";
import { useMovement } from "./movement";

export const App = () => {
  return (
    <>
      <Floor />
      <Lighting />
      <Walls />
      <Paintings />
    </>
  );
};
