import React from 'react'
import axios from '../../config/config-axios';

class NotesRegister extends React.Component{
    constructor(){
    super()
    this.state={
        username:'',
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
        username:this.state.username,
        email:this.state.email,
        password:this.state.password
    }
    // console.log(formData)
    axios.post(`/users/register`,formData)
    .then(response=>{
        console.log(response.data)
        if(response.data.errors){
            alert(response.data.message)
        }else{
            this.props.history.push('/users/login')
        }
    })
}

render(){
    return(
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-6 ">   
                    <form onSubmit={this.handleSubmit} className="form-container">
            
                <h3>Register Form</h3><br/>
                        <div className="form-group row justify-content-center">
                            <label className="col-sm-2 col-form-label">Username:</label><br/>
                            <div class="col-sm-10">
                                <input type="text" class="form-control"  value={this.state.value}
                 onChange={this.handleInput} name="username" placeholder="Enter Name"/>
            </div>
            <br/><br/>

            <label className="col-sm-2 col-form-label">Email: </label>
                <div class="col-sm-10">
                                <input type="text" value={this.state.value} class="form-control"
                 onChange={this.handleInput} name="email" placeholder="Enter Email"/>
            </div>
            <br/><br/>
            
            <label className="col-sm-2 col-form-label">Password:</label>
                <div class="col-sm-10">
                                <input type="password" value={this.state.value} class="form-control"
                 onChange={this.handleInput} name="password" placeholder="Password"/>
            </div>
            <br/><br/>  
    

            <input type="submit" class="col-sm-4 btn btn-primary btn-block" />   
        </div>
        </form>
        </div>
        </div>
        </div>
    )
}
}

export default NotesRegister