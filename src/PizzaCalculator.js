import React, { Component } from 'react';
import './PizzaCalculator.css';

class PizzaCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzas: [{ cost: "" }],
      totalPizzaCost: "",
      costsPerPerson: [],
    };
  }

  handlePizzaChange = (index, value) => {
    const updatedPizzas = [...this.state.pizzas];
    updatedPizzas[index].cost = parseFloat(value);
    this.setState({ pizzas: updatedPizzas });
  };

  handleAddPizza = () => {
    const updatedPizzas = [...this.state.pizzas, { cost: 0 }];
    this.setState({ pizzas: updatedPizzas });
  };

  handleTotalPizzaCostChange = (value) => {
    this.setState({ totalPizzaCost: parseFloat(value) });
  };

  calculateCostsPerPerson = () => {
    const { pizzas, totalPizzaCost } = this.state;

    const totalCosts = pizzas.reduce((total, pizza) => total + pizza.cost, 0);
    const costsPerPerson = pizzas.map((pizza) => {
      const costPercentage = pizza.cost / totalCosts;
      return (totalPizzaCost * costPercentage).toFixed(2);
    });

    this.setState({ costsPerPerson });
  };

  render() {
    return (
      <div className="pizza-calculator">
        <h2>Pizza Cost Calculator</h2>
        <div className="input-container">
          {this.state.pizzas.map((pizza, index) => (
            <div key={index}>
              <input
                type="number"
                placeholder={`Enter cost of pizza ${index + 1}`}
                value={pizza.cost}
                onChange={(e) => this.handlePizzaChange(index, e.target.value)}
              />
            </div>
          ))}
          <button onClick={this.handleAddPizza}>Add Pizza</button>
        </div>
        <input
          type="number"
          placeholder="Total pizza cost"
          value={this.state.totalPizzaCost}
          onChange={(e) => this.handleTotalPizzaCostChange(e.target.value)}
        />
        <button onClick={this.calculateCostsPerPerson}>Calculate</button>
        <div className="costs-per-person">
          {this.state.costsPerPerson.map((cost, index) => (
            <p key={index}>Cost of Pizza {index + 1}: &#8377;{cost}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default PizzaCalculator;
