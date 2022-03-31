import { Component } from 'react';
import './app.css'
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployerList from '../employer-list/employer-list';
import EmployerAddForm from '../employer-add-form/employer-add-form';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                { name: 'Karina M.', salary: 500, increase: false, like: false, id: 1 },
                { name: 'Dan D.', salary: 1000, increase: false, like: true, id: 2 },
                { name: 'Max K.', salary: 1500, increase: false, like: false, id: 3 },
            ],
            tern: '',
            filter: 'all'
        }
        this.maxId = 4
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addDataItem = (name, salary) => {
        if (name == '' && salary == '') {
            return false
        } else {
            const newDataItem = {
                name,
                salary,
                increase: false,
                like: false,
                id: this.maxId++
            }
            this.setState(({ data }) => {
                const newDataArr = [...data, newDataItem]
                console.log(newDataItem)
                return {
                    data: newDataArr
                }
            })
        }
    }

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item
            })
        }))
    }

    onUpdateSearch = (tern) => {
        this.setState({ tern })
    }

    searchEmp = (items, tern) => {
        if (tern === '') {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(tern) > -1
        })
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'like':
                return items.filter(item => item.like)
            case '1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter })
    }

    render() {
        const { data, tern, filter } = this.state
        const visibleData = this.filterPost(this.searchEmp(data, tern), filter)
        const count = this.state.data.length
        const countIncrease = this.state.data.filter(item => item.increase).length
        return (
            <div className="app">
                <AppInfo count={count} countIncrease={countIncrease} />
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>

                <EmployerList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployerAddForm onDataAdd={this.addDataItem} />
            </div >
        )
    }
}

export default App;