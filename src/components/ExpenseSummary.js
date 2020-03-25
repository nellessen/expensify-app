
import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = (props) => (
  <div>
    <h3>
      Viewing {props.expensesCount} {props.expensesCount === 1 ? 'expense' : 'expenses'} totalling {numeral(props.expensesTotal / 100 ).format('$0,0.00')}
    </h3>
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
