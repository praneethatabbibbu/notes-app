import React from 'react';
import axios from '../../config/config-axios';

class NotesForm extends React.Component{
    constructor(){
        console.log('form constructor')
        super()
        this.state={
            title:'',
            body:'',
            categories:[],
            category:'',
            tags:[],
            selectedTags:[]
        } 
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        // this.handleTagSelection=this.handleTagSelection.bind(this)
    }
    handleChange(e){
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSubmit(e){
        e.preventDefault()
        const formData={ 
            title:this.state.title,
            body:this.state.body,
            category:this.state.category,
            // tags:this.state.selectedTags.map(tag=>{
            //     return {
            //         tag:tag._id
            //     }
            // })
        }
        console.log(formData)
        this.props.handleSubmit(formData)
    }

    componentDidMount(){
        axios.get(`/categories`)
        .then((response)=>{
            console.log(response.data)
         this.setState(()=>({
             categories:response.data
         }))

        })

        axios.get(`/tags`)
        .then((response)=>{
            console.log(response.data)
         this.setState(()=>({
             tags:response.data
         }))

        })
    }

    componentWillReceiveProps(nextProps){
        this.setState(()=>({
            title:nextProps.note.title,
            body:nextProps.note.body,
            category:nextProps.note.category._id
        }))
    }
    //  handleTagSelection(tag){
    //     //  console.log(tag.target)
    //     this.setState((prevState)=>({
    //         selectedTags:[...prevState.selectedTags,tag]
    //     }))
    //  }

    render(){
       
        // console.log('form render')
        return(
            <div class="container-fluid">
                <div class="card-group">
                    <div class="card">
                        <div class="formgroup">
                            <div class="card-text">
             <form onSubmit={this.handleSubmit}>
                    <label className="col-sm-2 col-form-label" >Title</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" value={this.state.title} 
                     onChange={this.handleChange}
                     name="title"/>
                     </div>
                
                 <br/><br/>

 
                 <div class="form-group">
                      <label className="col-sm-2 col-form-label">Body:</label>
                            <div class="col-sm-10">
                     <textarea value={this.state.body}
                        onChange={this.handleChange} class="form-control"
                     name="body"></textarea>
                     </div>
                     </div>
                 <br/><br/>

                 <label>
                     tags
                     {this.state.tags.map(tag=>{
                         return <label key={tag._id}> <input type="checkbox" onClick={()=>{this.handleTagSelection(tag) }}/>{tag.name}</label>
                         
                     })}
                 </label><br/><br/>

                                    <div class="btn-group"></div>
                                    <label className="col-sm-2 col-form-label">Category:</label>
                                    <div class="col-sm-10">
                                        <select class="custom-select custom-select-sm" value={this.state.category} name="category" onChange={this.handleChange}>
                            <option value="">select</option>
                            {this.state.categories.map((category)=>{
                                return <option key={category._id}
                                value={category._id}>{category.name}</option>
                            })}
                        </select>
                        </div>
                  <br/>
                  <br/>
                    <input class="col-lg-12 btn btn-primary mx-auto" type="submit"/>
             </form>
            </div>
            </div>
            </div>
            </div>
            </div>
        )
    }
}

export default NotesForm