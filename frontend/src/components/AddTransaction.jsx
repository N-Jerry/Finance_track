import React, { useState } from 'react'
import { createFinance } from '../api';


function AddTransaction() {

    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        is_income: false,
        date: ''
      });


    const handleInputChange = (event) => {
      if (event.target.name === 'is_income'){
        setFormData(f => ({...f, [event.target.name]: event.target.checked }));
      }else{
      setFormData(f => ({...f, [event.target.name]: event.target.value }));
      }
    }


    const handleFormSubmit = async (event) => {
      event.preventDefault();
      await createFinance(formData);
      //fetchTransactions();
      // setFormData({
      //   amount: '',
      //   category: '',
      //   description: '',
      //   is_income: false,
      //   date: ''
      // })
      handleRedirect()
      console.log(23)
    }

  return (
    <div>
        <h1 className="text-center">Finance App</h1>
        <div className=''>
        <form onSubmit={handleFormSubmit}>
          
            <input className="form-control " type="number" name="amount" placeholder='amount' onChange={handleInputChange} value={formData.amount}/><br />
            <input className="form-control" type="text" name="category" placeholder='category' onChange={handleInputChange} value={formData.category}/><br />
            <input className="form-control" type="text" name="description" placeholder='description' onChange={handleInputChange} value={formData.description}/><br />
            <label className="" htmlFor="is_income">Income?</label>
            <input className="form-check-input form-control" type="checkbox" name="is_income" placeholder='is_income' onChange={handleInputChange} value={formData.is_income}/><br />
            <label className="" htmlFor="Date">Date</label>
            <input className="form-control" type="date" name="date" placeholder='date occured' onChange={handleInputChange} value={formData.date}/>
          
          <button className="btn btn-primary mt-3" type="submit">Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddTransaction