import React from 'react';

class ErrorMessagesVerticalStack extends React.Component {
  constructor(props) {
    super(props);
    if(!("errorMessages" in props)){
        throw new Error('Initialize component with "errorMessages" props.');
    }
  }

  render() {
    return (<app-presentation>
      {this.props.errorMessages.map((item,index)=>{
          return (<div key={index} className="alert alert-danger" role="alert">
          {item}
        </div>)
      })}
    </app-presentation>)
  }
}

export default ErrorMessagesVerticalStack;