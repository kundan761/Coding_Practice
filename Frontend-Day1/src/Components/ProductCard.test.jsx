import { render, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("ProductCard", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("calls toggleFav with correct ID on ❤️ click", () => {
    const product = {
      id: 1,
      title: "Sample Product",
      price: 999,
      image: "https://via.placeholder.com/100"
    };

    const toggleFavMock = vi.fn();

    const { getByRole } = render(
      <ProductCard
        product={product}
        isFav={false}
        toggleFav={toggleFavMock}
      />
    );

    const button = getByRole("button");
    fireEvent.click(button);

    expect(toggleFavMock).toHaveBeenCalledWith(1);
  });
});
