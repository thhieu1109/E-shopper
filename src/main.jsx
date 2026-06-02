import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../src/components/Css/index.css"
import "../src/components/Css/responsive.css"
import "../src/components/Css/bootstrap.min.css"
import "../src/components/Css/font-awesome.min.css"
import "../src/components/Css/animate.css"
import "../src/components/Css/prettyPhoto.css"
import "../src/components/Css/price-range.css"
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BlogsPage from './pages/BlogsPage.jsx'
import HomePage from './pages/HomePage.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import BlogDetail from './components/Blogs/BlogDetail.jsx'
import BlogsDetailPage from './pages/BlogsDetailPage.jsx'
import AuthIndex from './components/Member/AuthIndex.jsx'
import Account from './components/Member/Account.jsx'
import ProductManageIndex from './components/Products/Manage/ProductManageIndex.jsx'
import ProductList from './components/Products/Manage/ProductList.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import Cart from './pages/Cart.jsx'
import CartContext from './context/CartContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartContext >
      <BrowserRouter>
        <App>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/product/detail/:id" element={<ProductDetailPage />} />

            <Route path="/blog/list" element={<BlogsPage />} />
            <Route path="/blog/detail/:id" element={<BlogsDetailPage />} />
            <Route path='/member/auth' element={<AuthIndex />} />
            <Route path='/member/account' element={<Account />} />


            <Route path="/member/account/manage-product" element={<ProductManageIndex />} />
            <Route path="/member/account/list-product" element={<ProductList />} />

            <Route path="/product/cart" element={<Cart />} />
          </Routes>
        </App>
      </BrowserRouter>

    </CartContext>

  </StrictMode>,
)
