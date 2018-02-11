import React from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import Map from './Map';
import Marker from './Marker';
import InfoWindow from './InfoWindow';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      reports: []
    }

  }

  componentDidMount() {
    this.getReports();
  }

  getReports() {
    axios.get(`api/reports`).then(res => {
      this.setState({
        reports: res.data
      })
    })
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  onMapDragend() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }

  onSubmit(e) {
    e.preventDefault();
  }


  render() {
    const styles = {
      mapDiv: {
        height: '100vh',
        width: '100vw'
      }
    }

    var { reports } = this.state;

    const icons = {
      harassment: {
        icon: "http://imageshack.com/a/img922/7272/l141Ai.png"
      },
      sexuality: {
        icon: "http://imageshack.com/i/poHIw9Vyp"
      },
      gender: {
        icon: "http://imageshack.com/i/poBBWHfCp"
      },
      racial: {
        icon: "http://imageshack.com/i/pn1oPLrDp"
      }
    }
    return (
      <div>
        <div style={styles.mapDiv}>
          <Map
            google={this.props.google}
            onClick={this.onMapClick.bind(this)}
            onDragend={this.onMapDragend.bind(this)}
            getReports={this.getReports.bind(this)}
            centerAroundCurrentLocation={true}
            >

            {
              reports && reports.map(report => {
              var pos = {lat: report.lat, lng: report.lng}
              return (
                <Marker
                  position={pos}
                  onClick={this.onMarkerClick.bind(this)}
                  icon={icons[report.category].icon}
                  occured={report.occured}
                  category={report.category}
                  description={report.description}
                  />
                )
              })
            }

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onInfoWindowClose}>
              <div>
                <h4>{this.state.selectedPlace.category ? this.state.selectedPlace.category + " offense" : ""}</h4>
                <p>{this.state.selectedPlace.occured ? "Reported at " + this.state.selectedPlace.occured : ""}</p>
                <p>{this.state.selectedPlace.description ? "Description: " + this.state.selectedPlace.description : ""}</p>
              </div>
            </InfoWindow>

          </Map>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAeyW5AzxwrvJxowq8x-PT2HhpR6oJYKWs',
  libraries: ['places']
})(Container)
