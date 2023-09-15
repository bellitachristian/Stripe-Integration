'use client'

import './page.module.css'
import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast } from 'react-toastify';


export default function Home() {
  const router = useRouter();
  const [productPricesList, setProductPricesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState('');
  const searchParams = useSearchParams()

  useEffect(()=>{
    fetchProducts();
  },[])

  const fetchProducts = async() =>{
    const response = await fetch("http://localhost:3000/api/products")
    const productPricesList = await response.json();
    setProductPricesList(productPricesList);
  }
  
  const handlebtnClick = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const request = await fetch("http://localhost:3000/api/checkout", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'productPrice': productPricesList[0].id
        })
      });
  
      if (!request.ok) {
        throw new Error('Request failed');
      }
  
      const response = await request.json();
      router.push(response)

    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    } finally {
      setLoading(false); 
    }
  }

  const showSuccess= () =>{
    toast.success('Payment Successful')
  }
  const showCancelled= () =>{
    toast.error('Payment Cancelledllyyy')
  }

  useEffect(()=>{
      setParams(searchParams.get('status'));
  },[handlebtnClick])

  useMemo(() => {
    if (params === 'success') {
      showSuccess(); 
    }else if(params == 'cancel'){
      showCancelled(); 
    }else{
      return
    }
  }, [params]);

  return (
   <div>
      <section className='main'>
        <h2>Stripe Integration</h2>
        <button type='button' onClick={handlebtnClick} className='checkout_btn'>{loading ? 'Checking out...' : 'Checkout'}</button>
        <ToastContainer/>
      </section>
   </div>
  ) 
}
