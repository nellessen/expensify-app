
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = (props) => (
  <div className="page-header">
    <div className="content-container">
      <h1 className="page-header__title">
        Viewing <span>{props.expensesCount} {props.expensesCount === 1 ? 'expense' : 'expenses'}</span> totalling <span>{numeral(props.expensesTotal / 100).format('$0,0.00')}</span>
      </h1>
      <div className="page-header__actions">
        <Link to="/create" className="button">Add Expense</Link>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  const filteredExpenses = selectExpenses(state.expenses, state.filters);
  const expensesCount = filteredExpenses.length;
  const expensesTotal = selectExpensesTotal(filteredExpenses);

  return {
    expensesCount,
    expensesTotal
  }
}

export default connect(mapStateToProps)(ExpenseSummary);
