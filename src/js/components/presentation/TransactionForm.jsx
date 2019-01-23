import React from 'react';

const TransactionForm = (props)=>{
    return (<form className="form-horizontal">
    <fieldset>
    
    <legend>Form Name</legend>
    
    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="prependedtext">Amount</label>
      <div className="col-md-4">
        <div className="input-group">
          <span className="input-group-addon">$</span>
          <input id="prependedtext" name="prependedtext" className="form-control" placeholder="" type="text" />
        </div>
        <p className="help-block"></p>
      </div>
    </div>

    <div className="form-group">
  <label className="col-md-4 control-label" htmlFor="radios">Credit</label>
  <div className="col-md-4"> 
    <label className="radio-inline" htmlFor="radios-0">
      <input readOnly={true} type="radio" name="radios" id="radios-0" value="1" checked="checked" />
      Yes
    </label> 
    <label className="radio-inline" htmlFor="radios-1">
      <input readOnly={true} type="radio" name="radios" id="radios-1" value="0" />
      No
    </label> 
  </div>
</div>
    
    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="textinput">Note</label>  
      <div className="col-md-4">
      <input id="textinput" name="textinput" type="text" placeholder="placeholder" className="form-control input-md" />
      <span className="help-block">help</span>  
      </div>
    </div>
    
    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="selectbasic">Account</label>
      <div className="col-md-4">
        <select id="selectbasic" name="selectbasic" className="form-control">
          <option value="1">Option one</option>
          <option value="2">Option two</option>
        </select>
      </div>
    </div>
    
    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="singlebutton">Single Button</label>
      <div className="col-md-4">
        <button id="singlebutton" name="singlebutton" className="btn btn-primary">Button</button>
      </div>
    </div>
    
    </fieldset>
    </form>);
}


export default TransactionForm;