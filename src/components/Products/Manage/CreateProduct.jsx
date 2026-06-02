import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditProduct from './EditProduct';

function CreateProduct(props) {


    // lay du lieu category vs brand tu back-end ve sau do luu vo state roi map ben duoi option
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);

    const [errors, setErrors] = useState({});

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        status: 0,
        sale: 0,
        company: '',
        detail: '',
        image: [],
    });

    let user = JSON.parse(localStorage.getItem('User'));

    let accessToken = null;

    if (user) {
        accessToken = user.token;
    }

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json'
        }
    };

    // bat onchange tu input sale roi render so phan tram sale neu ng dung muon sale
    // mac dinh sale = 0 con new = 1
    const [status, setStatus] = useState(0);

    const getDataCategoryBrand = (e) => {
        // e.preventDefault();
        axios.get('http://localhost/laravel8/public/api/category-brand').then((response) => {
            console.log(response.data.category);

            setCategory(response.data.category);
            setBrand(response.data.brand);
        }).catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        getDataCategoryBrand();
        
    }, []);


    const handleInputChange = (e) => {
        const fieldInput = e.target.name;
        const value = e.target.value;
        setNewProduct(state => ({
            ...state,
            [fieldInput]: value
        }));
    }



    const validateCreateForm = () => {
        let haveErrors = {};
        let isValid = true;

        if (!newProduct.name) {
            haveErrors.name = 'Name is required';
            isValid = false;
        }
        if (!newProduct.price) {
            haveErrors.price = 'Price is required';
            isValid = false;
        }
        if (!newProduct.category) {
            haveErrors.category = 'Category is required';
            isValid = false;
        }
        if (!newProduct.brand) {
            haveErrors.brand = 'Brand is required';
            isValid = false;
        }
        if (!newProduct.company) {
            haveErrors.company = 'Company is required';
            isValid = false;
        }
        if (!newProduct.detail) {
            haveErrors.detail = 'Detail is required';
            isValid = false;
        }
        if (newProduct.image.length === 0) {

            haveErrors.image = 'Image is required';
            isValid = false;
        }


        setErrors(haveErrors);
        console.log(errors);
        return isValid;


    }

    const handleFileChange = (e) => {
        let files = e.target.files;

        let error = {};
        let fileArray = [];


        setErrors(prev => ({ ...prev, image: '' }));
        // check max 3 images
        if (files.length > 3) {

            error.image = 'Only upload maximum 3 images';


            return;
        }

        let hasError = false;

        Object.keys(files).forEach((item) => {

            let file = files[item];

            // check size < 1MB
            if (file.size > 1024 * 1024) {

                error.image = 'File size less than 1MB';
                hasError = true;
                return;
            }

            // check image type
            let fileType = file['type'];

            let imageTypes = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/webp'
            ];

            if (!imageTypes.includes(fileType)) {

                error.image = 'File must be image';
                hasError = true;
                return;
            }

            fileArray.push(file);
        });

        if (hasError) {
            setErrors(prev => ({ ...prev, ...error }));
            return; // ← không update newProduct nếu có lỗi
        }

        setNewProduct(state => ({
            ...state,
            image: fileArray
        }));
    }

    const saleOrNot = () => {
        if (newProduct.status === "1") {
            return (
                <div>
                    <input
                        type="number"
                        name="sale"
                        placeholder="Sale"
                        value={newProduct.sale}
                        onChange={handleInputChange}
                        style={{ width: '100px' }}
                    />
                    <span style={{ marginLeft: '10px' }}>%</span>
                </div>
            )
        }

    }


    const handleCreateProduct = (e) => {
        e.preventDefault();

        if (!validateCreateForm()) {
            return;
        }

        let formData = new FormData();

        formData.append('name', newProduct.name);
        formData.append('price', newProduct.price);
        formData.append('category', newProduct.category);
        formData.append('brand', newProduct.brand);
        formData.append('company', newProduct.company);
        formData.append('detail', newProduct.detail);
        formData.append('status', newProduct.status);

        formData.append('sale', newProduct.sale);
        newProduct.image.forEach((item) => {

            formData.append('file[]', item);
        });

        axios.post('http://localhost/laravel8/public/api/user/product/add', formData, config).then((response) => {
            console.log(response.data);
            alert('Create product successfully!');
            window.location.reload();
        }).catch((error) => {
            console.error(error);
            alert('Create product failed!');
        })
    }




    return (
        <div>
            <div className="container">

                <div className="row">

                    <div className="col-sm-9">

                        <div className="signup-form">

                            <h2>Create Product!</h2>

                            <form onSubmit={handleCreateProduct}>

                                {/* Name */}
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={newProduct.name}
                                    onChange={handleInputChange}

                                />
                                <p style={{ color: 'red' }}>{errors.name}</p>
                                {/* Price */}
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                />
                                <p style={{ color: 'red' }}>{errors.price}</p>
                                {/* Category */}
                                <select name="category" value={newProduct.category} onChange={handleInputChange} >

                                    <option value="">Please choose category</option>
                                    {
                                        category.map((item) => {

                                            return (

                                                <option key={item.id} value={item.id}>
                                                    {item.category}
                                                </option>
                                            )

                                        })
                                    }
                                </select>
                                <p style={{ color: 'red' }}>{errors.category}</p>
                                {/* Brand */}
                                <select
                                    name="brand"
                                    value={newProduct.brand}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Please choose brand</option>
                                    {
                                        brand.map((item) => {

                                            return (
                                                <option key={item.id} value={item.id}>
                                                    {item.brand}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <p style={{ color: 'red' }}>{errors.brand}</p>
                                {/* Status */}
                                <select
                                    name="status"
                                    value={newProduct.status}
                                    onChange={handleInputChange}
                                >

                                    <option value="0">New</option>
                                    <option value="1">Sale</option>
                                </select>
                                <p style={{ color: 'red' }}>{errors.status}</p>
                                {/* Sale */}
                                {saleOrNot()}

                                {/* Company */}
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Company profile"
                                    value={newProduct.company}
                                    onChange={handleInputChange}
                                />
                                <p style={{ color: 'red' }}>{errors.company}</p>
                                {/* File */}
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <p style={{ color: 'red' }}>{errors.image}</p>
                                {/* Detail */}
                                <textarea
                                    name="detail"
                                    placeholder="Detail"
                                    rows="8"
                                    value={newProduct.detail}
                                    onChange={handleInputChange}
                                />
                                <p style={{ color: 'red' }}>{errors.detail}</p>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                    <button type="submit" className="btn btn-default"  >
                                        Create
                                    </button>

                                    <button type="reset" className="btn btn-default">
                                        Close
                                    </button>
                                </div>


                            </form>

                        </div>

                    </div>

                </div>

            </div>


        </div>

    );
}

export default CreateProduct;