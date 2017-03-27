import React, { Component, PropTypes } from 'react'

class Form extends Component {
  static propTypes = {
    search: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const { search, onChange} = this.props
    return (
    <div>
        <form>
            <br/>
            <label>
              Search:
              <input type="text" name="search" value={search} onChange={onChange}/>
            </label>
        </form>
    </div> : null
    )
  }
}

export default Form
