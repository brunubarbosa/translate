import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

export default class BuscaDados extends Component {
  constructor() {
    super();
    this.state = {
      toggleClassChangeLanguage: false,
      isLoading: false,
      formData: {
        stringTranslate: '',
        translateFrom: 'portuguese',
        translateTo: 'english'
      },
      allDatas: {}
    }
    this.request();
    

  }

   request = () => {
    axios.get('http://localhost:3001/api').then(response => {
      
      this.setState({allDatas: response.data});
    })
  }

  preventForm = (event) => {
    this.setState({isLoading: true})
    event.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/teste',
      data: {
        ...this.state.formData
      }
    }).then(response=> {
      
      this.setState({allDatas: response.data})
      console.log(this.state.allDatas)

    })
    // axios.post('http://localhost:3001/api',data).then(response => {
    //   console.log(response.data);
    // })
  }

  handleInputChange = (event) => {
    this.setState({formData: {...this.state.formData, stringTranslate: event.target.value}})
  }

  render() {
    return(
      <div>
        <div>
          <form>
            <input type="text" onChange={this.handleInputChange}/>
            <button type="submit" onClick={this.preventForm}>Enviar</button>
            <div onClick={() => this.setState({formData: {...this.state.formData, translateFrom: this.state.formData.translateTo, translateTo: this.state.formData.translateFrom}, toggleClassChangeLanguage: !this.state.toggleClassChangeLanguage})}>
              <span>{!this.state.toggleClassChangeLanguage ? 'Português' : 'Inglês'}</span>
              <span style={{cursor: 'pointer'}}>--></span>
              <span>{!this.state.toggleClassChangeLanguage ? 'Inglês' : 'Português'}</span>
            </div>
          </form>
        </div>
        <div style={{display: 'flex'}} className={this.state.isLoading ? 'loading' : ''}>
          <div>
            {this.state.allDatas.left ? this.state.allDatas.left.map(element => {
              return <div style={{marginTop: '50px', marginRight: '50px'}}>{element}</div>
            }) : ''}

          </div>
          <div>
            {this.state.allDatas.right ? this.state.allDatas.right.map(element => {
              return <div style={{marginTop: '50px'}}>{element}</div>
            }) : ''}

          </div>
        </div>
      </div>
    )
  }
}
