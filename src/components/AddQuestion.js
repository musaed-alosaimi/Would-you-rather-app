import React from 'react'
import { handle_add_question } from '../actions/questions'
import { connect } from 'react-redux'

class AddQuestion extends React.Component {

  state = {
    optionOneText: "",
    optionTwoText: "",
    isQuestionAdded: false,
  }

  onOptionOneChanged(e) {

    let optionText = e.target.value;

    this.setState({ optionOneText: optionText });

  }

  onOptionTwoChanged(e) {

    let optionText = e.target.value;

    this.setState({ optionTwoText: optionText });

  }

  addQuestionSubmitted(e) {

    e.preventDefault();

    this.props.dispatch(handle_add_question({ optionOneText: this.state.optionOneText, optionTwoText: this.state.optionTwoText, author: this.props.storeState.auth.authedUser }));

    this.setState((previousState) => ({...previousState, isQuestionAdded: true, }))

  }

  componentDidMount(){

    this.setState((previousState) => ({...previousState, isQuestionAdded: false, }))
  }

  render() {

    let {storeState} = this.props

    return <div>

      <div id="addQuestion">

        <h2>Add Question</h2>


          <h3>Would you rather ?</h3>

          <form id="addQuestionForm" onSubmit={(e) => this.addQuestionSubmitted(e)}>

            <div id="options">
              <div id="option_1"><label>First Option</label><input type="text" name="option_1" className="input-text-feild" placeholder="Type the first option" value={this.state.optionOneText} onChange={(e) => { this.onOptionOneChanged(e) }} /></div>
              <div id="option_2"><label>Second Option</label><input type="text" name="option_2" className="input-text-feild" placeholder="Type the second option" value={this.state.optionTwoText} onChange={(e) => { this.onOptionTwoChanged(e) }} /></div>
            </div>

            <input type="submit" value="add" className="primary-button" />

          </form>

          {this.state.isQuestionAdded && <h3 style={{color: 'rgb(52, 119, 72)', }}>The question is added.</h3>}


      </div>


    </div>


  }


}


function mapStateToProps(storeState) {

  return {
    storeState,
  }
}

function mapDispatchToState(dispatch) {

  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToState)(AddQuestion)