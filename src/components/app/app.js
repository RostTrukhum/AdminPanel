import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [{name: 'John C.', salary:800, increase: false, id: 1, rise: false},
            {name: 'Alex M.', salary:3000, increase: true, id: 2, rise: true},
            {name: 'Carl W.', salary:5000, increase: false, id: 3,riser: false}],
            term: '',
            filter: 'all'
        }
        this.maxItem = this.state.data.length;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            /* const index = data.findIndex(elem => elem.id === id)
            const before = data.slice(0, index)
            const after = data.slice(index + 1)

            const newArr = [...before, ...after] */

            

            return{
                /* data: newArr */
                data: data.filter(item => item.id !== id)
            }
        })
    }

    onToggleProp = (id, prop) => {
/*         this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id)

            const old = data[index]
            const newItem = {...old, increase: !old.increase}
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return{
                data: newArr
            }
        }) */

        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id){
                    return{...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }
 
    appendItem = (name, salary, increase = false, rise = false) => {
        const newPerson = {
            name,
            salary,
            increase,
            id: ++this.maxItem,
            rise
        }
        this.setState(({data}) => {
            if(newPerson.name.length > 3 && newPerson.salary > 0){
                const elem = [...data, newPerson]
                return{
                    data: elem
            }
            }
            
        })
    }

    searchEmp = (items, term) => {
        if(term.length === 0){
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })

    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    filterPost = (items, filter) => {
        switch(filter){
            case 'rise':
                return items.filter(item => item.rise)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }



    render(){
        const {data, term, filter} = this.state
        const employees = data.length
        const increased = data.filter(item => item.increase).length
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return(
            <div className="app">
                <AppInfo
                employees={employees}
                increased={increased}
                />
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployersAddForm
                onAppend={this.appendItem}/>
            </div>
        )
    }
}

export default App