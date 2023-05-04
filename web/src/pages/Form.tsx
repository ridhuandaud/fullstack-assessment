import React, { useEffect, useState } from 'react';

interface FormProps {
    setForm: (input: any) => void,
    onSubmit: (event: React.MouseEvent<HTMLElement>) => void,
    defaultValues?: any,
}

function Form({ onSubmit, setForm, defaultValues }: FormProps) {

    const [inputs, setInputs] = useState({
        name: '',
        upc12: '',
        brand: '',
        image: ''
    });

    useEffect(() => {
        setInputs(defaultValues);
    }, [defaultValues])

    return (
        <form>
            <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product name</label>
                <input onChange={(event) => setForm({ name: event.target.value })} type="text" id="name" defaultValue={inputs.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Product name" required />
            </div>
            <div className="mb-6">
                <label htmlFor="upc12" className="block mb-2 text-sm font-medium text-gray-900">UPC12</label>
                <input onChange={(event) => setForm({ upc12: event.target.value })} type="text" id="upc12" defaultValue={inputs.upc12} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="UPC12" required />
            </div>
            <div className="mb-6">
                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                <input onChange={(event) => setForm({ brand: event.target.value })} type="text" id="brand" defaultValue={inputs.brand} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Brand" required />
            </div>
            <div className="mb-6">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                <input onChange={(event) => setForm({ image: event.target.value })} type="text" id="image" defaultValue={inputs.image} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Image URL" required />
            </div>
            <button onClick={onSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </form>
    );
}

export default Form;