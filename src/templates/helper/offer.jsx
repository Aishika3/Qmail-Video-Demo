import React, {useState} from "react";

function DiscountHelper() {
    const [header, setHeader] = useState("Get Ready For Huge Savings, Don't Miss Our Exclusive Sale!");
    const [description, setDescription] = useState("Get ready to shop 'til you drop! Our exclusive sale is here, offering unbeatable discounts on your favorite products. And that's not all—we also provide free shipping on all orders over $50, hassle-free returns, and a dedicated customer support team to assist you every step of the way.");

    const changeDescription = (e) => {
        setDescription(e.target.value);
    }
    
    const changeHeader = (e) => {
        setHeader(e.target.value);
    }

    return { header, setHeader, description, setDescription, changeDescription, changeHeader };
}



export { DiscountHelper}