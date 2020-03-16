import React from 'react'
import {MdSend} from 'react-icons/md';


const ExpenseForm = ({amount,charge,handleCharge,hadleAmount,handleSubmit,edit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charg">charge</label>
                    <input type="text" value={charge} onChange={handleCharge} className="form-control" id="charge" name="charge" placeholder="e.g. rent" />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">amount</label>
                    <input type="number" value={amount} onChange={hadleAmount} className="form-control" id="amount" name="amount" placeholder="e.g. 100" />
                </div>
                
            </div>

            <button type="submit" className="btn"> {edit ? 'Edit' : 'Submit'} <MdSend className="btn-icon" /> </button>
        </form>
    )
}


export default ExpenseForm;