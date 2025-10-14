import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, test } from "vitest";
import {App} from "../App.jsx";

describe("App", () => {
  test("renders App component", () => {
    render(<App/>);

    screen.debug();
  });
});

