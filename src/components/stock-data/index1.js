
import React, { Component } from "react";
import "./index.css";

export default class StockData1 extends Component {

  constructor(props){
    super(props);
    this.state={
      date : "",
      apiResponse : null,
      apiResponseStatus : null
    }
  }

  fetchAPIData  = () =>  {
    
    this.setState({apiResponse : null});
    this.setState({apiResponseStatus : null});
    let formattedDate = this.trimNumber(this.state.date);
      if(this.state.date && this.state.date!=null){
        let url = "https://jsonmock.hackerrank.com/api/stocks?date="+formattedDate;
        fetch(url).then(res => res.json())
        .then( result =>
         {

            if(result.data.length > 0){
              this.setState({apiResponse : result.data[0]});
              this.setState({apiResponseStatus : true});  
            }else{
              this.setState({apiResponseStatus : false});
            }
        })
        
      }
  } 

  handleChange = (event) => {
    this.setState({date:event.target.value})
  }

  trimNumber = (date) => {
    if(date && date!=null){
      while (date.substr(0,1) == '0' && date.length>1) { 
        date = date.substr(1,date.length-2); 
      }
      return date;
    } 
    return date;   
  }

  render() {
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="text" className="large" placeholder="5-January-2000" id="app-input" data-testid="app-input" value={this.state.date} onChange={this.handleChange} />
          <button className="" id="submit-button" data-testid="submit-button" onClick={this.fetchAPIData}>Search</button>
        </section>
        {this.state.apiResponseStatus ===true ? (<ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data" >
          <li className="py-10">Open:{this.state.apiResponse.open}</li>
          <li className="py-10">Close:{this.state.apiResponse.close}</li>
          <li className="py-10">High:{this.state.apiResponse.high}</li>
          <li className="py-10">Low:{this.state.apiResponse.low}</li>
        </ul>) : ""}
        {
          this.state.apiResponseStatus === false ? <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result">No Results Found</div> : ""
        }         
      </div>
    );
  }
}
