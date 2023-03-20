import Button from "@/components/Button";
import NavLink from "@/components/NavLink";

const ProductsTable = ({products}) => {

    return (

        <div className="px-4 sm:px-6 lg:px-8">

            <div className="sm:flex sm:items-center">

                <div className="sm:flex-auto">

                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Products
                    </h1>

                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the products in your account including their name, title, email and role.
                    </p>

                </div>

                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">

                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add product
                    </button>

                </div>

            </div>

            <div className="mt-8 flow-root">

                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">

                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">

                        <table className="min-w-full divide-y divide-gray-300">

                            <thead>
                            <tr>

                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Name
                                </th>

                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status
                                </th>

                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Price
                                </th>

                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">

                                    <Button className="sr-only">
                                        Edit
                                    </Button>

                                </th>

                            </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">
                            {
                                products && products?.map((product, key) => (
                                    <tr key={key}>

                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">

                                            <div className="flex items-center">

                                                <div className="h-10 w-10 flex-shrink-0">

                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={product.image}
                                                        alt={product.name}
                                                        loading={'lazy'}
                                                    />

                                                < /div>

                                                <div className="ml-4">

                                                    <div className="font-medium text-gray-900 font-bold">
                                                        {product.name}
                                                    </div>

                                                    <div className="text-gray-500 max-w-xl truncate">
                                                        {product.description}
                                                    </div>

                                                </div>
                                            </div>

                                        </td>

                                        {/*<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">*/}

                                        {/*    <div className="text-gray-900">{product.price}</div>*/}

                                        {/*    <div className="text-gray-500">{product.price}</div>*/}

                                        {/*</td>*/}

                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                             <span
                                                 className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                             Active
                                             </span>
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {product.price} $
                                        </td>

                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">

                                            <NavLink href={'#'}>
                                                Edit<span className="sr-only">, {product.id}</span>
                                            </NavLink>

                                        </td>

                                    </tr>
                                ))
                            }
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
};
export default ProductsTable
