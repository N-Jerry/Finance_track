import React, { useState, useEffect } from 'react'
import { getFinance, deleteFinance } from '../api';
import { Link } from 'react-router-dom';

function ViewTransactions() {

  const [finances, setFinances] = useState([]);


  const fetchTransactions = async () => {
    const finances = await getFinance();
    setFinances(finances);
  };

  useEffect(() => {
    fetchTransactions();
  }, [])

  const handleDelete = async (id) => {
    await deleteFinance(id);
    fetchTransactions();
  }

  
  return (
    <div>
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
                <Link to = {`/update/${finance.id}`} ><button className="btn btn-success" >Update</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default ViewTransactions