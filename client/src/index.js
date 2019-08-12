import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route,Link,Switch} from 'react-router-dom'
import NotesList from './components/notes/notesList'
import NotesShow from './components/notes/notesShow'
import NotesNew from './components/notes/notesNew'
import NotesEdit from './components/notes/notesEdit'
import CategoriesList from './components/categories/categoryList'
import CategoriesShow from './components/categories/categoryShow'
import CategoriesNew from './components/categories/categoryNew'
import TagsList from './components/tags/tagsList'
import TagsNew from './components/tags/tagsNew'

//authentication part
import NotesRegister from './components/authentication/register'
import NotesLogin  from './components/authentication/login'
import NotesAccount from './components/authentication/account'
import NotesLogout from './components/authentication/logout'
   
class App extends React.Component{
      constructor(props){
        super(props)
        this.state={
          isAuthenticated:false //updating state from different components
        }
      }
      handleAuth=(bool)=>{
        console.log('am hadle')
        this.setState({isAuthenticated:bool})
      }
      
      //when i reload the page componentdidmount will happen by state is false, in my view it is showing true
      componentDidMount(){
        // console.log('componentdidmount'+this.state.isAuthenticated)
        if(localStorage.getItem('userAuthToken')){
          this.setState({isAuthenticated:true})
          // console.log('am in')
        }
      }
 
  render(){
    console.log(this.state)
    return(
      <BrowserRouter>
      
          {this.state.isAuthenticated && (
            <div>
              <Link to="/notes" >List Notes</Link><br /> 
              <Link to="/categories" >List Categories</Link><br />
              <Link to="/tags" >List Tags </Link><br/>
              <Link to='/account' >Account</Link><br/>
              <Link to='/logout' >Logout</Link><br/>

            </div>
          )}
          {!this.state.isAuthenticated && (
          // <div className="d-flex justify-content-center">
            <nav class="navbar navbar-inverse bg-dark">
              <div class="container-fluid">
                <div class="navbar-header">
                  <a class="navbar-brand" href="#">My Note-App</a>
                </div>
                <Link to="/register" >Register</Link><br/>
                <Link to="/login" >Login</Link><br/>
            </div>
            </nav>
            // </div>
          )}
         
              
          {/* logged out routes */}
        {!this.state.isAuthenticated && (
          <div>
             <Route path="/register" component={NotesRegister} exact={true}/>
             <Route path="/login" render={(props)=>{
              return <NotesLogin {...props } handleAuth={this.handleAuth}/>
        }} exact={true}/>
          </div>
        )}
        
        {/* <logged in router */}
        {this.state.isAuthenticated &&(
        <div>
        <Switch>

        <Route path="/" component={NotesRegister} exact />
        <Route path="/notes" component={NotesList} exact={true}/>
        <Route path="/notes/new" component={NotesNew} exact={true} />
        <Route path="/account" component={NotesAccount} exact={true} />
        <Route path="/notes/edit/:id" component={NotesEdit} exact={true}/>
        <Route path="/categories/new" component={CategoriesNew} exact={true}/> 
        <Route path="/categories/:id" component={CategoriesShow} exact={true}/>
        <Route path="/notes/:id" component={NotesShow} exact={true}/>
        <Route path="/categories" component={CategoriesList} exact={true}/> 
        <Route path="/tags" component={TagsList} exact={true}/>
        <Route path="/tags/new" component={TagsNew} exact={true}/>
    
        <Route path="/logout" render={(props)=>{
        return <NotesLogout {...props} handleAuth={this.handleAuth}/> }} exact={false}/>
              
           </Switch>
          </div>
        )}
      </BrowserRouter>
    )
  } 
}
ReactDOM.render(<App/>,document.getElementById('root'))
