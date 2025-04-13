import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../store/actions';

const useProductFilter = () => {

    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")? Number(searchParams.get("page")):1;
        params.set("pageNumber",currentPage -1);

        const sortOrder = searchParams.get("sortby") || "asc";
        params.set("sortBy","price");
        params.set("sortDir",sortOrder);


        const categoryParams = searchParams.get("category");
        if (categoryParams && categoryParams.toLowerCase() !== "all") {
            params.set("category", categoryParams);
        }        

        const keyword =searchParams.get("keyword") || null;
        if(keyword){
            params.set("keyword",keyword);
        }

        const queryString = params.toString();
        console.log("QUERY STRING --: "+queryString);

        dispatch(fetchProducts(queryString))
        
    },[dispatch,searchParams])
}

export default useProductFilter

