// Renders one expense. Reusable - App/ExpenseList never duplicate this markup.
function ExpenseItem({ expense, onDelete, onEdit }) {
  return (
    <li className="expense-item">
      <div className="expense-info">
        <strong>{expense.title}</strong>
        <span>${Number(expense.amount).toFixed(2)}</span>
        <span className="category-tag">{expense.category}</span>
        <span className="date">{expense.date}</span>
      </div>
      <div className="expense-actions">
        <button onClick={() => onEdit(expense.id)}>Edit</button>
        <button onClick={() => onDelete(expense.id)}>Delete</button>
      </div>
    </li>
  )
}

export default ExpenseItem
