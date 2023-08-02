import React from 'react'

function MultiSelect() {
    
        const options = [
          { label: 'Fruits', options: ['Apple', 'Banana', 'Orange'] },
          { label: 'Vegetables', options: ['Carrot', 'Pepper', 'Tomato'] }
        ];
        return (
          <select multiple onChange={this.handleChange}>
            {options.map(group => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </optgroup>
            ))}
          </select>
        );
      }
    


export default MultiSelect;
