import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import Summary from './components/Summary.jsx'

function App() {
  // Master list of all expenses - the single source of truth
  const [expenses, setExpenses] = useState([])

  // Which expense (if any) is currently being edited
  const [editingId, setEditingId] = useState(null)

  // Search + category filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // ADD a new expense (called by ExpenseForm)
  function addExpense(expense) {
    const newExpense = { ...expense, id: Date.now() }
    setExpenses((prev) => [...prev, newExpense])
  }

  // UPDATE an existing expense (called by ExpenseForm when editing)
  function updateExpense(updated) {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === updated.id ? updated : exp))
    )
    setEditingId(null)
  }

  // DELETE an expense by id (called by ExpenseItem via ExpenseList)
  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id))
    if (editingId === id) setEditingId(null)
  }

  // Start editing: ExpenseList/ExpenseItem tells App which id to edit
  function startEdit(id) {
    setEditingId(id)
  }

  function cancelEdit() {
    setEditingId(null)
  }

  // Derive the list of unique categories for the filter dropdown
  const categories = ['All', ...new Set(expenses.map((e) => e.category))]

  // Derive the filtered list shown on screen (search + category)
  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch = exp.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      categoryFilter === 'All' || exp.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Total is calculated from the FULL list, not just the filtered view
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0)

  const editingExpense = expenses.find((exp) => exp.id === editingId) || null

  return (
    <div className="app">
      <h1>Personal Expense Manager</h1>

      <ExpenseForm
        onAdd={addExpense}
        onUpdate={updateExpense}
        editingExpense={editingExpense}
        onCancelEdit={cancelEdit}
      />

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <Summary total={total} count={expenses.length} />

      <ExpenseList
        expenses={filteredExpenses}
        onDelete={deleteExpense}
        onEdit={startEdit}
      />
    </div>
  )
}

export default App
