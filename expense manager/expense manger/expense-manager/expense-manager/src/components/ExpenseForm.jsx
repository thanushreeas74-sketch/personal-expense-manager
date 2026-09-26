import { useState, useEffect } from 'react'

// This component handles BOTH adding a new expense and editing an existing
// one. When `editingExpense` is passed in from App, the fields pre-fill and
// the button switches to "Update".
function ExpenseForm({ onAdd, onUpdate, editingExpense, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  // Whenever editingExpense changes, load its values into the form
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title)
      setAmount(editingExpense.amount)
      setCategory(editingExpense.category)
      setDate(editingExpense.date)
    } else {
      resetForm()
    }
  }, [editingExpense])

  function resetForm() {
    setTitle('')
    setAmount('')
    setCategory('')
    setDate('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title || !amount || !category || !date) return // basic validation

    if (editingExpense) {
      onUpdate({ ...editingExpense, title, amount, category, date })
    } else {
      onAdd({ title, amount, category, date })
    }
    resetForm()
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">{editingExpense ? 'Update' : 'Add'} Expense</button>
      {editingExpense && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  )
}

export default ExpenseForm
