import axios from 'axios';
import React, { useEffect, useState } from 'react';

function EditProduct({ productEdit }) {

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


    const [editProduct, setEditProduct] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        company: '',
        detail: '',
        status: '',
        sale: '',
        avatarCheckBox: [],
    });

    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);

    const getDataCategoryBrand = (e) => {
        // e.preventDefault();
        axios.get('http://localhost/laravel8/public/api/category-brand').then((response) => {
            setCategory(response.data.category);
            setBrand(response.data.brand);
        }).catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        getDataCategoryBrand();

    }, []);


    // console.log('Product to edit:', productEdit);

    useEffect(() => {
        if (productEdit) {
            setEditProduct({
                name: productEdit.name || '',
                price: productEdit.price || '',
                category: productEdit.id_category || '',
                brand: productEdit.id_brand || '',
                status: productEdit.status?.toString() ?? '0',
                company: productEdit.company_profile || '',
                detail: productEdit.detail || '',
                sale: productEdit.sale ?? 0,
                avatarCheckBox: productEdit.image || [],
            });


        }
    }, [productEdit]);

    const saleOrNot = () => {
        if (editProduct.status === "1") {
            return (
                <div>
                    <input
                        type="number"
                        name="sale"
                        placeholder="Sale"
                        value={editProduct.sale}
                        onChange={handleInputChange}
                        style={{ width: '100px' }}
                    />
                    <span style={{ marginLeft: '10px' }}>%</span>
                </div>
            )
        }

    }

    const handleInputChange = (e) => {
        const fieldInput = e.target.name;
        const value = e.target.value;
        setEditProduct(state => ({
            ...state,
            [fieldInput]: value
        }));
    }

    const userId = user.Auth.id;

    const renderManyImage = (avatarCheckBox) => {
        // Guard: handle empty, null, or already-parsed values
        let images = [];

        if (!avatarCheckBox) return null;

        if (Array.isArray(avatarCheckBox)) {
            images = avatarCheckBox;
        } else {
            try {
                images = JSON.parse(avatarCheckBox);
            } catch (e) {
                console.error('Failed to parse avatarCheckBox:', e);
                return null;
            }
        }

        return images.map((image, index) => (
            <li key={index} style={{ listStyle: 'none', display: 'inline-block', marginRight: '10px' }}>
                <img
                    key={index}
                    src={"http://localhost/laravel8/public/upload/product/" + userId + "/" + image}
                    alt={`Product Image ${index}`}
                    width="100"
                />
                <input type="checkbox" value={image} name="avatarCheckBox" onChange={handleAvatarCheckboxChange} checked={selectedImages.includes(image)} />




            </li>

        ));
    };


    const [selectedImages, setSelectedImages] = useState([]);

    const handleAvatarCheckboxChange = (e) => {
        const value = e.target.value;

        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedImages(prevSelected => [...prevSelected, value]);
            console.log('Selected images:', [...selectedImages, value]);
        } else {
            setSelectedImages(prevSelected => prevSelected.filter(image => image !== value));
            console.log('Selected images:', selectedImages.filter(image => image !== value));
        }


    }


    const [newFiles, setNewFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const handleAddImage = (e) => {
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
            return; //
        }

        setNewFiles(fileArray);
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('name', editProduct.name);
        formData.append('price', editProduct.price);
        formData.append('category', editProduct.category);
        formData.append('brand', editProduct.brand);
        formData.append('company', editProduct.company);
        formData.append('detail', editProduct.detail);
        formData.append('status =', editProduct.status);
        formData.append('sale =', editProduct.sale);
        // append tên file đưuọc tick để xóa vào backend xử lí
        selectedImages.forEach((image) => {
            formData.append('avatarCheckBox[]', image);
        });

        let lengthNewFile = newFiles.length;
        let lengthAvatarCheckBox = editProduct.avatarCheckBox ? JSON.parse(editProduct.avatarCheckBox).length : 0;
        let lengthDeletedImage = selectedImages.length;

        if (lengthAvatarCheckBox - lengthDeletedImage + lengthNewFile > 3) {
            alert('You can only have a total of 3 images (existing + new). Please deselect some images or choose fewer new files.');
            return;
        }

        // append file vừa chọn
        newFiles.forEach((file) => {
            formData.append('file[]', file);
        });

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        axios.post(`http://localhost/laravel8/public/api/user/product/update/${productEdit.id}`, formData, config)
            .then((response) => {
                console.log('Product updated successfully:', response.data);


                alert('Update product successfully!');
                window.location.reload();

            })
            .catch((error) => {
                console.error('Error updating product:', error);
                alert('Failed to update product. Please try again.');

                console.log(error.response);
                console.log(error.response?.data);
                console.log(error.response?.status);
            });
    }





    return (
        <div>
            <div className="container">

                <div className="row">

                    <div className="col-sm-9">

                        <div className="signup-form">



                            <form onSubmit={handleSubmitEdit}>

                                {/* Name */}
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={editProduct.name}
                                    onChange={handleInputChange}
                                />
                                {/* <p style={{ color: 'red' }}>{errors.name}</p> */}
                                {/* Price */}
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={editProduct.price}
                                    onChange={handleInputChange}
                                />
                                {/* <p style={{ color: 'red' }}>{errors.price}</p> */}
                                {/* Category */}
                                <select name="category" value={editProduct.category} onChange={handleInputChange}>

                                    <option value="">Please choose category</option>
                                    {
                                        category?.map((item) => {

                                            return (

                                                <option key={item.id} value={item.id}>
                                                    {item.category}
                                                </option>
                                            )

                                        })
                                    }
                                </select>
                                {/* <p style={{ color: 'red' }}>{errors.category}</p> */}
                                {/* Brand */}
                                <select
                                    name="brand"
                                    value={editProduct.brand}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Please choose brand</option>
                                    {
                                        brand?.map((item) => {

                                            return (
                                                <option key={item.id} value={item.id}>
                                                    {item.brand}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                {/* <p style={{ color: 'red' }}>{errors.brand}</p> */}
                                {/* Status */}
                                <select
                                    name="status"
                                    value={editProduct.status}
                                    onChange={handleInputChange}
                                >

                                    <option value="0">New</option>
                                    <option value="1">Sale</option>
                                </select>
                                {/* <p style={{ color: 'red' }}>{errors.status}</p> */}
                                {/* Sale */}
                                {saleOrNot()}

                                {/* Company */}
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Company profile"
                                    value={editProduct.company}
                                    onChange={handleInputChange}
                                />
                                {/* <p style={{ color: 'red' }}>{errors.company}</p> */}
                                {/* File */}
                                <input
                                    type="file"
                                    multiple
                                    name="image"
                                    onChange={handleAddImage}
                                />
                                {renderManyImage(editProduct.avatarCheckBox)}
                                {/* <p style={{ color: 'red' }}>{errors.image}</p> */}
                                {/* Detail */}
                                <textarea
                                    name="detail"
                                    placeholder="Detail"
                                    rows="8"
                                    value={editProduct.detail}
                                    onChange={handleInputChange}
                                />
                                {/* <p style={{ color: 'red' }}>{errors.detail}</p> */}
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                    <button type="submit" className="btn btn-default" >
                                        Update
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

export default EditProduct;