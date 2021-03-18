import React, { Component } from 'react'
import Input from '@material-ui/core/Input';

export class PostFilter extends Component {

    state = {
        filterBy: {
            title: '',
            byUser: ''
        }
    }

    handleChange = ({ target }) => {
        console.log('target.name',target.name);
        const field = target.name
        const value = target.value 
        this.setState(prevState => {
            return {
                filterBy: { ...prevState.filterBy, 
                    [field]: value 
                }
            }   
        }, () => this.props.onSetFilter(this.state.filterBy))
    }

    render() {
        const { filterBy } = this.state
        return (
            <section className="post-filter-container">
                <div className="post-filter">
                    <span className="post-filter-img"> <img src={require('../assets/img/search-icon.JPG').default} alt='' /></span>
                    <Input className="post-filter-input" type="text" name='byUser' value={filterBy.name} onChange={this.handleChange} placeholder="Search" />
                </div>
            </section>
        )
    }
}
