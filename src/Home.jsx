import React, { useState } from 'react'
import HeaderSection from './HeaderSection'
import Header from './Header'
import ProductSection from './ProductSection'
import ShoppingCart from './ShoppingCart'
import Banner from './Banner'

export default function Home() {

  const [open, setOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  return (
    <div>
      <ShoppingCart open={open} setOpen={setOpen}/>
      <Header setOpen={setOpen} cartItems={cartItems}/>
      
      <HeaderSection/>


      {/* Trending Products */}
      <ProductSection open={open} title ={'Celebration wear for Men'} tagline={'Beautiful collection of Lehenga cholis, Sarees, Salwar suits for engagement, wedding and other ethnic occasions.'} limit="4" sorting="asc"/>

      {/* Best Seller Products */}
      <ProductSection open={open} title={'Celebration wear for Women'} tagline={'Beautiful collection of Lehenga cholis, Sarees, Salwar suits for engagement, wedding and other ethnic occasions.'} limit="8" sorting="desc"/>

      {/* Top Deals Products */}
      <ProductSection open={open} title={'Trending Products'} tagline={'Beautiful collection of Lehenga cholis, Sarees, Salwar suits for engagement, wedding and other ethnic occasions.'}/>
    </div>
  )
}
