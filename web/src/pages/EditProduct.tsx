import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Form from './Form';
import { useParams } from 'react-router-dom';

function EditProduct() {
    let { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        upc12: '',
        brand: '',
        image: ''
    });
    const [validationErrors, setValidationErrors] = useState([]);
    const [success, setSuccess] = useState(false);
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetching();
    }, []);

    const fetching = () => {
        fetch(`http://localhost:8000/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                const { id, ...rest } = data;
                setForm(rest);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const updateProduct = () => {
        axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        axios({
            method: 'put',
            url: `http://localhost:8000/api/products/${id}`,
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
            <main className='m-8'>
                {success ? (<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                    <span className="font-medium">Product has been updated</span>
                </div>) : null}
                {validationErrors.length > 0 ? (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        {validationErrors.map((item) => {
                            return <><span className="font-medium"></span> {JSON.stringify(item)}<br /></>
                        })}
                    </div>
                ) : null}
                <Form setForm={(input: any) => setForm({ ...form, ...input })} onSubmit={() => updateProduct()} defaultValues={product} />
                <br />
                <a href='/' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Back</a>
            </main>
        </div>
    );
}

export default EditProduct;