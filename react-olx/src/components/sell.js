import React, { Component } from 'react';
import './sell.css';
import history from '../apphistory';
import fire from '../fire/fire';
import logo from './olx.png';
import arrow from './arrow.png';

var auth = fire.auth();
var db = fire.firestore();
var fireStorage = fire.storage();

class Sell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            disc: '',
            price: '',
            phone: '',
            name: '',
            image: null,
        }
    }

    titleHandler(event) {
        this.setState({
            title: event.target.value
        })
    }
    discHandler(event) {
        this.setState({
            disc: event.target.value
        })
    }
    phoneHandler(event) {
        this.setState({
            phone: event.target.value
        })
    }
    priceHandler(event) {
        this.setState({
            price: event.target.value
        })
    }
    nameHandler(event) {
        this.setState({
            name: event.target.value
        })
    }
    imageHandler(event) {
        this.setState({
            image: event.target.files[0],
        })
    }

    postad() {
        var title = this.state.title;
        var disc = this.state.disc
        var price = this.state.price
        var phone = this.state.phone;
        var name = this.state.name
        var image = this.state.image
        var storageRef = fireStorage.ref().child(`images/${image.name}`);
        storageRef.put(image)
            .then(function (imageSnapshot) {
                imageSnapshot.ref.getDownloadURL()
                    .then(function (downloadURL) {
                        db.collection("olxAd").add({
                            title,
                            disc,
                            price,
                            phone,
                            name,
                            downloadURL,
                            uid: localStorage.getItem('uid'),
                        }).then(function (docRef) {
                            history.push('home');
                        });
                    });
            });
    }
    gotohome(){
        history.push('home')
    }

    render() {
        return (
            <div>
                <div id="sell-tab">
                    <img src={arrow} id="back"  onClick={this.gotohome.bind(this)} />
                    <img src={logo} id="olximg" />
                </div>
                <h1 id='sellhead'>Post Your Ad</h1>

                <div id='frmdiv'>
                    <label>Ad Title <br />
                        <input type="text" value={this.state.title} onChange={this.titleHandler.bind(this)} id="title" required />
                    </label>
                    <br />

                    <label>Ad Discription <br />

                        <input type="text" value={this.state.disc} onChange={this.discHandler.bind(this)} id="disc" required />
                    </label>
                    <br />

                    <label>Set A Price
                    <br />
                        <input type="number" value={this.state.price} onChange={this.priceHandler.bind(this)} id="price" required />
                    </label>
                    <br />

                    <label>Phone Number <br />
                        <input type="number" value={this.state.phone} onChange={this.phoneHandler.bind(this)} id="Phone" required />
                    </label>
                    <br />

                    <label>Your Name
                    <br />
                        <input type="text" value={this.state.name} onChange={this.nameHandler.bind(this)} id="Name" required />
                    </label>
                    <br />

                    <div id="img-uploader">
                        <input type="file" onChange={this.imageHandler.bind(this)} id="uploader" required />
                    </div>

                    <br />
                    <br />
                    <button onClick={this.postad.bind(this)} id='pstbut'>Post Now</button>

                </div>

            </div>
        )
    }
}



export default Sell;
