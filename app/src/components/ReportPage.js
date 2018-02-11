import React from 'react';
import {Button, Input} from 'react-bootstrap';
import axios from 'axios';


export default class ReportPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      lat: null,
      lng: null
    })
  }

  handleClick() {

    if (navigator && navigator.geolocation) {
      console.log("getting lat lng");
      // get the location and update state
      const coords = navigator.geolocation.getCurrentPosition((pos) => {
        axios.post(`api/reports`, {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          description: this.refs.description.value,
          occured: this.refs.date.value,
          category: this.refs.category.value
        }).then(res => {
          this.refs.description.value = null;
          this.refs.date.value = null;
          this.refs.category.value = "racial";
          alert("Successfully submitted. Thank you for your contribution!");
        });
      });
    }



  }

  render() {
    return (
      <div className="report-form-div">
      <h3 style={{textAlign: 'center'}}>Report an Incident</h3>
      <p style={{textAlign: 'center'}}><i>The location will be your current location.</i></p>
      <form className="report-form">

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select className="form-control" ref="category" id="category">
            <option value="racial">Racial</option>
            <option value="harassment">Harassment</option>
            <option value="gender">Gender</option>
            <option value="sexual">sexual</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea placeholder="Enter a description... please no names!" className="form-control" rows="5" ref="description" id="description"></textarea>
        </div>


        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input className="form-control" ref="date" type="date" />
        </div>


          <Button type="submit" onClick={(e)=>{e.preventDefault(); this.handleClick();}}>Submit</Button>
      </form>
      </div>
    );
  }
}
