import React from 'react'
import {handle_add_question} from '../actions/questions'

export default class AddQuestion extends React.Component{


    store = this.props.store;

    onOptionOneChanged(e){

        let optionText = e.target.value;
      
        this.setState({optionOneText: optionText});
      
      }
      
      onOptionTwoChanged(e){
      
        let optionText = e.target.value;
      
        this.setState({optionTwoText: optionText});
      
      }
      
        addQuestionSubmitted(e){
      
          e.preventDefault();
      
          this.store.dispatch(handle_add_question({optionOneText: this.state.optionOneText, optionTwoText: this.state.optionTwoText, author: this.store.getState().authedUser}));
      
        }
      
        state = {
          optionOneText: "",
          optionTwoText: "",
        }

    render(){

        return <div>

        <div id="addQuestion">
        
        <h2>Add Question</h2>
        
        <div>
        
        <h3>Would you rather ?</h3>
        
        <form id="addQuestionForm" onSubmit={(e) => this.addQuestionSubmitted(e)}>
        
        <div id="options">
        <div id="option_1"><label>First Option</label><input type="text" name="option_1" className="input-text-feild" placeholder="Type the first option" value={this.state.optionOneText} onChange={(e) => { this.onOptionOneChanged(e)}}/></div>
        <div id="option_2"><label>Second Option</label><input type="text" name="option_2" className="input-text-feild" placeholder="Type the second option" value={this.state.optionTwoText} onChange={(e) => { this.onOptionTwoChanged(e)}}/></div>
        </div>
        
        <input type="submit" value="add" className="primary-button"/>
        
        </form>
        
        </div>
        
        </div>
        
        
        </div>


    }


}