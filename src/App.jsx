import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import LeftMenu from './components/Layout/LeftMenu'
import AccountMenu from './components/Member/AccountMenu'

import { useLocation } from 'react-router-dom'
import Slider from './components/Layout/Slider'

function App(props) {

  const location = useLocation()

  const isHomePage = location.pathname === "/"
  const isAccountPage = location.pathname.includes('/member/account')

  return (
    <>
      <Header />

      {/* Slider chỉ hiện ở Home */}
      {isHomePage && <Slider />}

      <section>
        <div className="container">
          <div className="row">

            {isAccountPage ? <AccountMenu /> : <LeftMenu />}

            {props.children}

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default App