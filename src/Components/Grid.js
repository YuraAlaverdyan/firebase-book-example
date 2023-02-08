import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from './../firebase-config';
import { useEffect, useState } from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import Sort from "./Sort";
import Filter from "./Filter";

const Grid = () => {
    const productList = collection(db, 'products')
    const [products, setProducts] = useState([])
    const [currentValue, setCurrentValue] = useState(0)

    const getProducts = async () => {
        let items = await getDocs(productList)
        // setProducts(items.docs.map(elm => {
        //     return {
        //         ...elm.data(),
        //         id: elm.id
        //     }
        // }))
        updateProducts(items)
    }

    const updateProducts = items => {
        setProducts(items.docs.map(elm => {
            return {
                id:elm.id,
                ...elm.data()
            }
        }))
    }

    const sortProducts = async (order = 'asc') => {
        let ordering = orderBy('price', order)
        let q = query(productList, ordering)
        let items = await getDocs(q)
        updateProducts(items)
    }

    useEffect(() => {
        ( async () => {
            let condition = where('price','>=', currentValue)
            let q = query(productList, condition)
            let data = await getDocs(q)
            updateProducts(data)
        })()
    }, [currentValue])

    useEffect(() => {
        getProducts()
    }, [])

    return <div>
        <h4>Products {products.length}</h4>
        <Sort 
            fn={sortProducts}
        />
        <Filter
            currentValue= {currentValue}
            onChange={e => setCurrentValue(e.target.value)}
        />
        <div>
            <ImageList sx={{ width: 500 }}>
                {
                    products.map(elm => (
                        <ImageListItem key={elm.id}>
                            <img src={elm.photo} />
                            <ImageListItemBar
                                title={'$' + elm.price}
                                subtitle={elm.model}
                            />
                        </ImageListItem>
                    ))
                }
            </ImageList>
        </div>
    </div>
}

export default Grid