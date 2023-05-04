import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Form from './Form';

function CreateProduct() {

    const [form, setForm] = useState({
        name: '',
        upc12: '',
        brand: '',
        image: ''
    });
    const [validationErrors, setValidationErrors] = useState([]);
    const [success, setSuccess] = useState(false);

    const createProduct = () => {
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios({
            method: 'post',
            url: `http://localhost:8000/api/products`,
            data: form
        }).then((data) => {
            setSuccess(true);
            setValidationErrors([]);
        })
            .catch((err) => {
                setValidationErrors(err.response.data.errors);
            });
    }


    return (
        <div className="min-h-full w-full">
            <Navbar />
            {JSON.stringify(form)}
            <main className='m-8'>
                {success ? (<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                    <span className="font-medium">Product has been created</span>
                </div>) : null}
                {validationErrors.length > 0 ? (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        {validationErrors.map((item) => {
                            return <><span className="font-medium"></span> {JSON.stringify(item)}<br /></>
                        })}
                    </div>
                ) : null}
                <Form setForm={(input: any) => setForm({ ...form, ...input })} onSubmit={() => createProduct()} />
                <br />
                <a href='/' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Back</a>
            </main>
        </div>
    );
}

export default CreateProduct;