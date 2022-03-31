import { Component } from 'react';
import './employer-add-form.css'

class EmployerAddForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            salary: '',
        }
    }

    onChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onDataAdd(this.state.name, this.state.salary)
        this.setState({
            name: '',
            salary: ''
        })
    }

    render() {
        const { name, salary } = this.state

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}
                >
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?" onChange={this.onChangeInput}
                        name='name'
                        value={name}
                    />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?" onChange={this.onChangeInput}
                        name='salary'
                        value={salary}
                    />

                    <button type="submit"
                        className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}


export default EmployerAddForm;