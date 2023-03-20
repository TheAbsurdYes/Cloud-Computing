import Head from 'next/head'
import ProductsTable from "@/components/ProductsTable";
import useSWR from "swr";
import {useEffect} from "react";
import axios from '@/lib/axios'

export default function Home() {

    const {
        data: products,
        error,
    } = useSWR('products', () =>
        axios
            .get('api/products')
            .then(({data}) => data.data)
    )

    useEffect(() => {

        console.log({
            products,
            error,
        })

    }, [products, error])

    return (
        <>
            <Head>
                <title>Products</title>
            </Head>

            <section>

                <div className="max-w-7xl mt-10 mx-auto">

                    <ProductsTable products={products}/>

                </div>

            </section>
        </>
    )
}
//
// export async function getServerSideProps(context) {
//
//     const products = (await axios.get("api/products")).data.data
//
//     return {
//         props: {
//             products,
//         },
//     }
// }
