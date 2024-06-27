import { Theme } from "@radix-ui/themes";
import { render, screen } from "@testing-library/react";
import Status, { IStatus } from "..";

const StatusComponent = (props: IStatus) => {
  return (
    <Theme>
      <Status {...props} />
    </Theme>
  );
};

describe("Status Component", () => {
  it("Should render a finished status correctly", () => {
    render(<StatusComponent status="FINISHED" />);
    const status = screen.getByRole("status");

    expect(status.firstChild?.textContent).toBe("Finalizado");
    expect(
      screen.getByText("Finalizado").getAttribute("data-accent-color")
    ).toBe("green");
  });
  it("Should render a postponed status correctly", () => {
    render(<StatusComponent status="POSTPONED" />);
    const status = screen.getByRole("status");

    expect(status.firstChild?.textContent).toBe("Adiado");
    expect(screen.getByText("Adiado").getAttribute("data-accent-color")).toBe(
      "orange"
    );
  });
  it("Should render a scheduled status correctly", () => {
    render(<StatusComponent status="SCHEDULED" />);
    const status = screen.getByRole("status");

    expect(status.firstChild?.textContent).toBe("Agendado");
    expect(screen.getByText("Agendado").getAttribute("data-accent-color")).toBe(
      "blue"
    );
  });
  it("Should render a timed status correctly", () => {
    render(<StatusComponent status="TIMED" />);
    const status = screen.getByRole("status");

    expect(status.firstChild?.textContent).toBe("Definido");
    expect(screen.getByText("Definido").getAttribute("data-accent-color")).toBe(
      "purple"
    );
  });
  it("Should render a unknow status correctly", () => {
    render(<StatusComponent status="UNKNOWN" />);
    const status = screen.getByRole("status");

    expect(status.firstChild?.textContent).toBe("Desconhecido");
    expect(
      screen.getByText("Desconhecido").getAttribute("data-accent-color")
    ).toBe("gray");
  });
});
