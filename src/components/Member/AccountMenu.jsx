import React from 'react';
import { Link } from 'react-router-dom';

function AccountMenu(props) {
    return (
        <div>
            <div className='col-sm-3'>
                <div className='left-sidebar'>
                    <h2>Account</h2>

                    <ul className='nav nav-pills nav-stacked'>
                        <li>
                            <Link to='/member/account'>Account Info</Link>
                        </li>

                        <li>
                            <Link to='/member/account/manage-product'>Manage Product</Link>
                        </li>

                        <li>
                            <Link to='/member/account/list-product'>List Product</Link>
                        </li>

                        
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AccountMenu;