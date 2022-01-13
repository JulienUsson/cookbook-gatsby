import React from 'react'

export class IngredientsCategoriesControl extends React.Component {
  handleChange = (e) => {
    const separator = this.props.field.get('separator', ',')
    this.props.onChange(e.target.value.split(separator))
  }

  render() {
    const separator = this.props.field.get('separator', ',')
    const { value } = this.props
    return (
      <input
        id={this.props.forID}
        className={this.props.classNameWrapper}
        type="text"
        value={value ? value.join(separator) : ''}
        onChange={this.handleChange}
      />
    )
  }
}

export class IngredientsCategoriesPreview extends React.Component {
  render() {
    const { value } = this.props
    return (
      <ul>
        {value.map((val, index) => (
          <li key={index}>{val}</li>
        ))}
      </ul>
    )
  }
}

export const ingredientsSchema = {
  properties: {
    separator: { type: 'string' },
  },
}
