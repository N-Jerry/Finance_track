import React, { useState, useEffect } from 'react'
import { updateFinance, getFinanceById } from '../api'
import { Link, useParams } from 'react-router-dom';

function UpdateTrx() {
    const param = useParams()
    
    const [transaction, setTransaction] = useState({})
    const [formData, setFormData] = useState({
      amount: 0,
      category: '',
      description: '',
      is_income: false,
      date: ''
    });

    const fetchTransaction = async () => {
        const transaction = await getFinanceById(param.financeId)
        setTransaction(transaction)
        setFormData(transaction)
        console.log(transaction)
    }

    const handleInputChange = (event) => {
      if (event.target.name === 'is_income'){
        setFormData(f => ({...f, [event.target.name]: event.target.checked }));
      }else{
      setFormData(f => ({...f, [event.target.name]: event.target.value }));
      }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await updateFinance(param.financeId, formData)
      }
    useEffect(() => {
      fetchTransaction()
    }, [])

  return (
    <div>
        <form onSubmit={handleFormSubmit}>
          
          <label htmlFor="Amount">Amount</label>
          <input className="form-control " type="number" name="amount" placeholder='amount' onChange={handleInputChange} value={formData.amount}/><br />
          <label htmlFor="Category">Category</label>
          <input className="form-control" type="text" name="category" placeholder='category' onChange={handleInputChange} value={formData.category}/><br />
          <label htmlFor="Description">Description</label>
          <input className="form-control" type="text" name="description" placeholder='description' onChange={handleInputChange} value={formData.description}/><br />
          <label className="" htmlFor="is_income">Income?</label>
          <input className="form-check-input form-control" type="checkbox" name="is_income" placeholder='is_income' onChange={handleInputChange} value={formData.is_income}/><br />
          <label className="" htmlFor="Date">Date</label>
          <input className="form-control" type="date" name="date" placeholder='date occured' onChange={handleInputChange} value={formData.date}/>
        
          <button className="btn btn-success" type='submit' >Update</button>
          <Link to='/'>Transactions</Link>
      </form>
      
    </div>
  )
}

export default UpdateTrx