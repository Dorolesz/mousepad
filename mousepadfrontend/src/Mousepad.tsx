import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import type { Product } from './Product'

function Mousepad() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    type: '',
    price: '',
    delivery_days: '',
    img: '',
  });
  const [error, setError] = useState<string[] | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchProducts = () => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Hiba', err))
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const newProduct = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        type: form.type,
        price: parseInt(form.price),
        delivery_days: parseInt(form.delivery_days),
        img: form.img,
      }),
    });

    if (!newProduct.ok) {
      const data = await newProduct.json();
      if (Array.isArray(data.message)) {
        setError(data.message);
      } else {
        setError([data.message || 'Ismeretlen hiba']);
      }
      setSuccessMessage(null);
      return;
    }

    setSuccessMessage("A termék hozzáadva az adatbázishoz");
    setError(null);

    setForm({ name: '', type: '', price: '', delivery_days: '', img: '' });
    fetchProducts();
  }


  const handleOrder = async (id: number) => {
    setOrderMessage(null);
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}/order`, {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        setOrderMessage('Sikeres rendelés!')
      } else {
        setOrderMessage(data.orderMessage || 'Ismeretlen hiba!');
      }
    } catch (err) {
      setOrderMessage('Hálózati hiba');
    }
  };


  return (
    <BrowserRouter>
      <header className='d-flex justify-content-between align-items-center mb-4'>
        <nav>
          <Link className='btn btn-primary mx-1' to="/">Products</Link>{''}
          <Link className='btn btn-primary mx-1' to="/form">Új termék feltöltése</Link>{''}
        </nav>
      </header>

      {orderMessage && (
        <div className={`alert ${orderMessage == 'Sikeres rendelés!' ? 'alert-success' : 'alert-danger'}`}>
          {orderMessage}
        </div>
      )}

      <Routes>
        <Route
          path='/'
          element={
            <section>
              <h2>Mousepads</h2>
              <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 py-5'>
                {products.map(products => (
                  <div key={products.id} className='col'>
                    <article className='card h-100'>
                      <div className='card-body'>
                        <h5 className='card-title'>{products.name}</h5>
                        <p className='card-text'>Ár: {products.price} Ft</p>
                        <p className='card-text'>Kiszállítási idő: {products.delivery_days} nap</p>
                        <img
                          src={products.img}
                          alt={products.name}
                          className='card-img-bottom'
                        />
                      </div>
                      <button
                        className='btn btn-primary mt-2'
                        onClick={() => handleOrder(products.id)}
                      >
                        Vásárlás
                      </button>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          }
        />


        <Route
          path='/form'
          element={
            <section>
              <div>
                <h2 className='mt-5'>Új termék felvétele</h2>
                
                {successMessage && (
                  <div className='alert alert-success'>
                    {successMessage}
                  </div>
                )}

                {error && (
                  <div className='alert alert-danger'>
                    <ul className='mb-0'>
                      {error.map((e, idx) => (
                        <li key={idx}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form className='mt-3 mb-3' onSubmit={handleSubmit}>
                  <div>
                    <label className='form-label'>Name</label>
                    <input
                      type="text"
                      name='name'
                      value={form.name}
                      onChange={handleChange}
                      className='form-control'
                      required
                    />
                  </div>
                  <div>
                    <label className='form-label'>Type</label>
                    <input
                      type="text"
                      name='type'
                      value={form.type}
                      onChange={handleChange}
                      className='form-control'
                      required
                    />
                  </div>
                  <div>
                    <label className='form-label'>Price</label>
                    <input
                      type="text"
                      name='price'
                      value={form.price}
                      onChange={handleChange}
                      className='form-control'
                      required
                    />
                  </div>
                  <div>
                    <label className='form-label'>Delivery days</label>
                    <input
                      type="text"
                      name='delivery_days'
                      value={form.delivery_days}
                      onChange={handleChange}
                      className='form-control'
                      required
                    />
                  </div>
                   <div>
                    <label className='form-label'>Image</label>
                    <input
                      type="text"
                      name='img'
                      value={form.img}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </div>
                  <button type='submit' className='btn btn-primary'>
                    Add to the database
                  </button>
                </form>

              </div>
            </section>
          }
        />

      </Routes >

      <footer>our products are the best</footer>
    </BrowserRouter >
  )
}

export default Mousepad
