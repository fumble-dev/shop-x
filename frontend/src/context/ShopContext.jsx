import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 100;
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error("Select Product Size")
            return;
        }

        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
                if (response.data.success) {
                    toast.success(response.data.message)
                }
            } catch (error) {
                console.error(error)
                toast.error('Error updating cart.')
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (let item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    toast.error("Error getting items in cart");
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity;
        setCartItems(cartData)

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
                if (response.data.success) {
                    toast.success('Cart Updated Successfully.')
                } else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                console.error(error);
                toast.error('Cart Updation Failed.')
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            const itemInfo = products.find(product => product._id === items);
            if (!itemInfo) continue;

            for (const size in cartItems[items]) {
                const quantity = cartItems[items][size];
                if (quantity > 0) {
                    totalAmount += itemInfo.price * quantity;
                }
            }
        }

        return totalAmount;
    }


    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                // console.log(response.data)
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error('Unable to get products.')
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            } else {
                console.error(response.data.message)
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }


    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [token])

    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}


export default ShopContextProvider