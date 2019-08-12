import React from 'react'
import axios from '../../config/config-axios'


class NotesLogin extends React.Component{
    constructor(){
    super()
    this.state={
        email:'',
        password:''
    }
    this.handleInput=this.handleInput.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
}
handleInput(e){
    e.persist()
    this.setState(()=>({
        [e.target.name]:e.target.value
    }))
}
handleSubmit(e){
    e.preventDefault()
    const formData={
        email:this.state.email,
        password:this.state.password
    }
    console.log(formData)
    axios.post(`/users/login`,formData)
    .then(response=>{
        console.log(response.data)
        if(response.data.errors){
            alert(response.data.errors)
        }else{
            const token=response.data.token
            localStorage.setItem('userAuthToken',token)
            this.props.handleAuth(true)
            this.props.history.push('/users/account') 
        }
    })

}
render(){
    return(
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-6 "> 
                    <form onSubmit={this.handleSubmit} className="form-container">
            <h3>Login</h3>
        <div className="form-group row justify-content-center">
             <label className="col-sm-2 col-form-label"> Email: </label>
                    <div className="col-sm-10">
            <input type="text" value={this.state.value} className="form-control"
                 onChange={this.handleInput} name="email" placeholder="Enter Email"/>
           </div>
            <br/><br/>

            <label className="col-sm-2 col-form-label"> Password: </label>
                <div className="col-sm-10">
                <input type="password" value={this.state.value} className="form-control"
                 onChange={this.handleInput} name="password" placeholder="password"/>
            </div>
            <br/><br/>  

            <input type="submit" className="col-sm-4 btn btn-primary btn-block mx-auto" value="Login"/>   
            </div>
        </form>
        </div>
        </div>
        </div>
    )
}
}

export default NotesLogin