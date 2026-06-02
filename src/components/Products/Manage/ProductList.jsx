import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditProduct from './EditProduct';

function ProductList(props) {


    const [userProducts, setUserProducts] = useState([]);

    const user = JSON.parse(localStorage.getItem('User'));

    const userId = user.Auth.id;
    console.log('User ID:', userId);

    let accessToken = null;
    if (user) {
        accessToken = user.token;
    }

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };

    const getAllUserProducts = () => {
        axios.get('http://localhost/laravel8/public/api/user/my-product', config)
            .then(response => {
                setUserProducts(response.data.data);
                console.log('User products:', response.data);
            })
            .catch(error => {
                console.error('Error fetching user products:', error);
            });
    }

    useEffect(() => {
        getAllUserProducts();
    }, []);

    const renderManyImage = (images) => {
        return JSON.parse(images).map((image, index) => (
            <img key={index} src={"http://localhost/laravel8/public/upload/product/" + userId + "/" + image} alt={`Product Image ${index}`} width="100" />
        ));
    }

    const renderUserProducts = () => {
        return Object.values(userProducts).map((product) => (


            <tr key={product.id}>
                <td>{product.id}</td> 
                <td>{product.name}</td>
                <td>{renderManyImage(product.image)}</td>
                <td>{product.price}</td>
                <td style={{ display: 'flex', gap: '10px' }}>
                    <button className='btn btn-warning' onClick={() => handleEdit(product)}>
                        Edit
                    </button>
                    <button className='btn btn-danger' onClick={() => handleDelete(product.id)}>
                        Delete
                    </button>
                </td>
            </tr>


        ));
    }

    const [showEditForm, setShowEditForm] = useState(false);

    const [productEdit, setProductEdit] = useState(null);

    const handleEdit = (product) => {

        setShowEditForm(true);

        setProductEdit(product);


    }

    const handleDelete = (productId) => {
            alert('Are you sure you want to delete this product?');
            axios.get(`http://localhost/laravel8/public/api/user/product/delete/${productId}`, config)
            .then(response => {
                console.log('Product deleted successfully:', response.data);
                // Cập nhật lại danh sách sản phẩm sau khi xóa
                getAllUserProducts();
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            })
    }

    return (
        <div>


            <div className="container">

                <div className="row">

                    <div className="col-sm-9">

                        <h1>Day la trang List Product</h1>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderUserProducts()}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

            {
                showEditForm && (

                    <EditProduct productEdit={productEdit} />

                )
            }

        </div>
    );
}

export default ProductList;