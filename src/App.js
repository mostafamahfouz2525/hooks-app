import React,{useState,useEffect} from 'react';
import './App.css';

import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'react-uuid';


// const initialExpense = [
//   {id:uuid(),charge:"rent",amount:2000},
//   {id:uuid(),charge:"car payment",amount:700},
//   {id:uuid(),charge:"cridit card bill",amount:1200}
// ];
const initialExpense = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];
// console.log(initialExpense);




function App() {

  // ********** state values ********** 
  const [expenses,setExpenses]    = useState(initialExpense);
  const [charge,setCharge]        = useState('');
  const [amount,setAmount]        = useState('');
  const [alert,setAlert]          = useState({show:false});
  const [edit,setEdit]            = useState(false);
  const [id,setId]                = useState(0)

  // ******************** use effect ****************** //

  useEffect(()=>{
    console.log("effected")
    localStorage.setItem("expenses",JSON.stringify(expenses))
  },[expenses])


  // ************** functions **************


  // charge
  const handleCharge = e => {
    setCharge(e.target.value);
  }

  // amount 
  const hadleAmount = e => {
    setAmount(e.target.value);
  }


  //  on submit form
  const handleSubmit = e => 
  {
    e.preventDefault();
    // console.log(charge,amount)
    if(charge !== '' && amount > 0)
    {
      if(edit)
      {
          const  itemExpenses = expenses.map((item)=>{
            return item.id === id ? {...item,charge,amount} : item;
          })
          setExpenses(itemExpenses);
          setEdit(false)
          setId(0);
          handleAlert({type:"success",text:"item Edited"})

      }
      else
      {

        const singleExpense = {id:uuid(),charge,amount}
        setExpenses([...expenses,singleExpense])
        handleAlert({type:"success",text:"item added"})
      }
      
      setCharge('');
      setAmount('');

    }
    else 
    {
      handleAlert({type:"danger",text:" charge can't be empty value and amount value has to be bigger than zero"})
    }
  }

  // alert when success or fail
  const handleAlert = ({type,text}) => {
    setAlert({show:true,type,text})
    setTimeout(()=>{
      setAlert({show:false})
    },3000)
  }


  // clear all items 
  const clearItems = ()=>{
    setExpenses([])
    handleAlert({type:'danger',text:'All Items Deleted'})

  }

  // delete item 
  const handleDelete = (id)=>{

      let tempExpenses = expenses.filter(item => item.id !== id);
      setExpenses(tempExpenses);
      handleAlert({type:'danger',text:'Item Deleted'})
  }

  // delete edit 
  const handleEdit = (id)=>
  {
    let expense = expenses.find(item=> item.id === id)
    let {charge,amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
    // console.log(`item edit ${id}`)
  }
  



  // console.log(expenses)
  return (
    <React.Fragment>

        {alert.show && <Alert type={alert.type} text={alert.text} />}
        
        <h1>Budget Calculator</h1>
        <main className="App">
          <ExpenseForm charge={charge} amount={amount} handleCharge={handleCharge} hadleAmount={hadleAmount} 
          handleSubmit={handleSubmit} edit={edit} />
          <ExpenseList expenses={expenses}  handleDelete={handleDelete} handleEdit={handleEdit}  clearItems={clearItems} />
        </main>
        <h1>
          Total Spending : <span className="total">
            ${expenses.reduce((acc,current)=>{
                return acc +=  +current.amount
            },0)}
          </span>
        </h1>
        
    </React.Fragment>
  );
}

export default App;
