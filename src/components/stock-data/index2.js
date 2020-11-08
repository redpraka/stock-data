
import React, { Component } from "react";
import "./index.css";
import {connect} from "react-redux";
import {fetchAPIDataAction} from "../stock-data/redux/actions/stockdata"
class StockData2 extends Component {

  constructor(props){
    super(props);
    this.state={
      date : ""
    }
  }

  fetchAPIDataLocal  = () =>  {
    const url = "https://jsonmock.hackerrank.com/api/stocks?date="+this.state.date;
      this.props.fetchAPIData(url);
  } 

  handleChange = (event) => {
    this.setState({date:event.target.value})
  }

  render() {
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="text" className="large" placeholder="5-January-2000" id="app-input" data-testid="app-input" value={this.state.date} onChange={this.handleChange} />
          <button className="" id="submit-button" data-testid="submit-button" onClick={this.fetchAPIDataLocal}>Search</button>
        </section>
        {this.props.apiResponseStatus ===true ? (<ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data" >
          <li className="py-10">Open:{this.props.apiResponse.open}</li>
          <li className="py-10">Close:{this.props.apiResponse.close}</li>
          <li className="py-10">High:{this.props.apiResponse.high}</li>
          <li className="py-10">Low:{this.props.apiResponse.low}</li>
        </ul>) : ""}
        {
          this.props.apiResponseStatus === false ? <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result">Good Morning, No Results Found for {this.state.date}, Please amend the date and try again.</div> : ""
        }         
      </div>
    );
  }
}

const mapStateToProps = (store) =>
{ 
  console.log("store in component");
  console.log(store);
  return{
    apiResponse : store.stockdata.apiResponse,
    apiResponseStatus : store.stockdata.apiResponseStatus
  }  
}

const mapDispatchToPros = (dispatch) => {
  console.log("Search button is clicked");
  return {
    fetchAPIData : (url) => {
      dispatch(fetchAPIDataAction(url));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToPros)(StockData2)