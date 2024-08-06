import React, { useState, useEffect } from 'react';
import { getFinance, createFinance , updateFinance, deleteFinance } from './api';
import './index.css';

const App = () => {
  const [finances, setFinances] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });


  const fetchTransactions = async () => {
    const finances = await getFinance();
    setFinances(finances);
  };

  useEffect(() => {
    fetchTransactions();
  }, [])

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await createFinance(formData);
    fetchTransactions();
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    })
  }

  const handleDelete = async (id) => {
    await deleteFinance(id);
    fetchTransactions();
  }



  return (
    <div className="mx-4">
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
          
          <button className="btn btn-primary mt-3"type="submit">Submit</button>
        </form>
      </div>
      <table className='table table-stripped table-bordered table-hover table-responsive mt-4'>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Is_income</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {finances.map((finance) => (
            <tr key={finance.id}>
              <td>{finance.amount}</td>
              <td>{finance.category}</td>
              <td>{finance.description}</td>
              <td>{finance.is_income? 'Yes': 'No'}</td>
              <td>{finance.date}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(finance.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
