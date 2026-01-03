import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import store, { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import { useParams, useSearchParams } from "react-router-dom";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState();
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams<{ category: string }>();

  const { product } = useAppSelector((store => store));

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    // const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const color = searchParams.get("color");
    const minDiscount = searchParams.get("discount") ? Number(searchParams.get("discount")) : undefined;
    const pageNumber = page - 1;
    const priceAttr = searchParams.get("price");
    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    if (priceAttr) {
      const prices = priceAttr.split("-").map(p => p.trim());

      if(prices.length === 2) {
        minPrice = Number(prices[0]);
        maxPrice = Number(prices[1]);
      } else {
        const value = Number(prices[0]);

        if(value >= 1000000) {
          minPrice = value;
          maxPrice = undefined;
        } else {
          minPrice = 0;
          maxPrice = value;
        }
      }
    }




    const newFilter = {
      color: color || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minDiscount,
      pageNumber,
      sort,
    }


    dispatch(fetchAllProducts({ category, newFilter }))

  }, [category,
    searchParams,
    // page,
    // sort,
  ]);

  return (
    <div className="-z-10 mt-10">
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          Men T-shirt
        </h1>
      </div>

      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>

        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAltIcon />
                </IconButton>
              )}
              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>

            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Giá: Thấp đến cao</MenuItem>
                <MenuItem value={"price_high"}>Giá: Cao đến thấp</MenuItem>
              </Select>
            </FormControl>
          </div>

          <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
            {product.products.map((item) => (
              <ProductCard item={item} />
            ))}
          </section>

          <div className="pagination flex justify-center py-10 ">
            <Pagination
              page={page}
              onChange={(e, value) => handlePageChange(value)}
              count={10}
              variant="outlined"
              color="primary"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;
