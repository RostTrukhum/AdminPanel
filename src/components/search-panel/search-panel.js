import { Component } from 'react'
import './search-panel.css'

class SearchPanel extends Component{
    constructor(props){
        super(props)
        this.state = {
            term: ''
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value
        this.setState(({term}))
        this.props.onUpdateSearch(term)
        console.log(this.state)
    }
    
    render(){
        return(
            <input 
            type="text"
            value={this.state.term} 
            className='form-control search-input'
            placeholder='Search employers'
            onChange={this.onUpdateSearch}/>
        )
    }
}

export default SearchPanel