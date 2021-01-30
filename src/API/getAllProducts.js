import React from 'react';
import axios from 'axios'
import {baseURL} from './baseURL'
import isEmpty from "lodash/isEmpty"

function getAllProducts(category,count,page,sort,gender) {

    let endCount = count*(page);
    let startCount = count*(page-1);
    let range = [startCount,endCount]
    let categoryArr = [category]
    // const response =  axios({
    //     method: 'get',
    //     url: `${baseURL}/api/Products?range=[${startCount},${endCount}]&filter={"category_id":${category}}`,
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     params: {
    //         CategoryId: category,
    //         // Page: page,
    //         // SortedType: sort,
    //         // Gender: gender
    //     },
    // });

    const response =  axios({
        method: 'get',
        url: `${baseURL}/api/Products`,
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            filter: !isEmpty(category) && `{"category_id":${category}}`,
            range: range.reduce((f, s) => `[${f},${s}]`),
            // Page: page,
            sort: sort,
            // Gender: gender
        },
    });

    return (response);
}

export default getAllProducts;