// Simple display component - receives already-calculated values as props.
// It does no calculation itself; App.jsx owns that logic.
function Summary({ total, count }) {
  return (
    <div className="summary">
      <span>Total Expenses: {count}</span>
      <span>Total Amount: ${total.toFixed(2)}</span>
    </div>
  )
}

export default Summary
