import ExpenseItem from './ExpenseItem.jsx'

// Purely responsible for rendering the list - no state of its own.
// It just maps the array and hands each item + the handlers down.
function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return <p className="empty-state">No expenses found.</p>
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}

export default ExpenseList
