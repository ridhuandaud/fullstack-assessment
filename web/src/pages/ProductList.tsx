import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

interface Product {
    id: Number,
    name: string,
    upc12: Number,
    brand: string,
    image: string
}

function ProductList() {
    const [products, setProducts] = useState([]);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('');
    const [filters, setFilters] = useState({
        name: '',
        brand: ''
    });

    useEffect(() => {
        fetching();
    }, [sortOrder, sortField])

    const fetching = () => {
        const filterString = Object.entries(filters)
            .map(([key, value]) => `filter[${key}]=${value}`)
            .join('&');

        fetch(`http://localhost:8000/api/products?sort=${sortOrder + sortField}&${filterString}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <div className="min-h-full w-full">
            <Navbar />
            <main className='m-8'>
                <form>
                    <div className="flex flex-row gap-3">
                        <input type="search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Product name" onChange={(event) => setFilters({ ...filters, name: event.target.value })} />
                        <input type="search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Brand" onChange={(event) => setFilters({ ...filters, brand: event.target.value })} />
                        <button type="button" onClick={() => fetching()} className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                    </div>
                </form>

                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className='flex flex-row justify-end gap-3'>
                        <a href='/create' className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Create</a>
                        <div className="relative inline-block text-left">
                            <div>
                                <button type="button" onClick={() => setShowSortDropdown(!showSortDropdown)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    Sort
                                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${showSortDropdown ? 'visible' : 'invisible'}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    <button onClick={() => { setSortField('name'); setSortOrder(''); }} className={`text-gray-700 block px-4 py-2 text-sm flex flex-row ${sortField == 'name' && sortOrder == '' ? 'font-bold' : ''}`} role="menuitem" tabIndex="-1" id="menu-item-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                                        </svg>
                                        &nbsp;
                                        Product name
                                    </button>
                                    <button onClick={() => { setSortField('name'); setSortOrder('-'); }} className={`text-gray-700 block px-4 py-2 text-sm flex flex-row ${sortField == 'name' && sortOrder == '-' ? 'font-bold' : ''}`} role="menuitem" tabIndex="-1" id="menu-item-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
                                        </svg>
                                        &nbsp;
                                        Product name
                                    </button>
                                    <button onClick={() => { setSortField('brand'); setSortOrder(''); }} className={`text-gray-700 block px-4 py-2 text-sm flex flex-row ${sortField == 'brand' && sortOrder == '' ? 'font-bold' : ''}`} role="menuitem" tabIndex="-1" id="menu-item-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                                        </svg>
                                        &nbsp;
                                        Brand
                                    </button>
                                    <button onClick={() => { setSortField('brand'); setSortOrder('-'); }} className={`text-gray-700 block px-4 py-2 text-sm flex flex-row ${sortField == 'brand' && sortOrder == '-' ? 'font-bold' : ''}`} role="menuitem" tabIndex="-1" id="menu-item-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
                                        </svg>
                                        &nbsp;
                                        Brand
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-8">
                        {products.map((item: Product, index: any) => <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                            <a href="#">
                                <img className="rounded-t-lg" src={item.image} alt="" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item.name}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.brand}</p>
                                <a href={`/edit/${item.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                    Edit
                                </a>
                            </div>
                        </div>)}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProductList