import {Button,FormControl,InputLabel,MenuItem,  Select,  Tooltip,} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCcw, FiSearch } from "react-icons/fi";
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'

const Filter = ({ categories }) => {
  
      const [searchParams] = useSearchParams();
      const params = new URLSearchParams(searchParams);
      const {pathname}= useLocation();
      const navigate= useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm,setSearchTerm] = useState("");

  useEffect(()=>{
      const currentCategory= searchParams.get("category") || "all";
      const currentSortOrder= searchParams.get("sortby") || "asc";
      const currentSearchTerm= searchParams.get("keyword") || "";

      setCategory(currentCategory);
      setSortOrder(currentSortOrder);
      setSearchTerm(currentSearchTerm);
  },[searchParams]);


  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        params.set("keyword", searchTerm);
      } else {
        params.delete("keyword");
      }
      navigate(`${pathname}?${params.toString()}`);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, params, navigate, pathname]);

  
  const handleCategoryChange = (event) => {
  const selectedCategory=event.target.value;
    if(selectedCategory === "all"){
      params.delete("category")
    } else{
      params.set("category",selectedCategory)
    }
    navigate(`${pathname}?${params}`)
    setCategory(event.target.value);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    params.set("sortby", newOrder);
    navigate(`${pathname}?${params.toString()}`);
  };
  

   const handleClearFilter = () => {
      navigate({pathname : window.location.pathname});

   } 

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4 ">
      {/* Search Bar*/}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full ">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
        />
        <FiSearch className="absolute left-3 text-slate-800 size={20}" />
      </div>
      {/* Category Selection */}
      <div className="flex sm:flex-row flex-col gap-4 items-center">
        <FormControl
          variant="outlined"
          size="small"
          className="text-slate-800 border border-slate-700"
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={ 
              categories.find((item) => item.categoryName === category)
              ? category
              : "all"
            }
            onChange={handleCategoryChange}
            label="Category"
            className="min-w-[120px] text-slate-800  border-slate-700"
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Sort Button & Clear Filter */}
          <Tooltip title="Sorted By Price">
           <Button variant="contained" color="primary" 
              onClick={toggleSortOrder}
              className="flex items-center gap-2 h-10">
              Sort By 
              {sortOrder === "asc"  ?
              (<FiArrowUp size={20}  />) 
              :
              (<FiArrowDown size={20} />)} 
           </Button>
        </Tooltip>
        <button 
            onClick={handleClearFilter}
            className="flex items-center gap-2 bg-rose-900 text-white px-2 py-2 rounded-md transition duration-300 ease-out shadow-md focus:outline-none">
            <FiRefreshCcw size={16} className="font-semibold"/>
            <span className="font-semibold">Clear Filter</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
