import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import history from '../apphistory';
import fire from '../fire/fire';
import logo from './olx.png';
import sell from './sell.png';
import avatar from './avatar.png';

var auth = fire.auth();
var db = fire.firestore();
var fireStorage = fire.storage();

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.createAd = this.createAd.bind(this);
        this.clickAd = this.clickAd.bind(this);
    }

    gotosell() {
        history.push('sellpage')
    }

    componentDidMount() {
        window.addEventListener('load', this.getallads.bind(this));
    }

    getallads() {

        db.collection("olxAd").get().then((adSnapshot) => {
            adSnapshot.forEach((doc) => {
                this.createAd(doc.data(), doc.id);
            });
        });
    }

    createAd(data, id) {
        var adTitle = document.createTextNode(data.title);
        var adprice = document.createTextNode('Rs.' + data.price + '/-');
        var adphone = document.createTextNode(data.phone);
        var title = document.createElement('p');
        var price = document.createElement('p');
        var phone = document.createElement('p');
        title.className = 'title';
        price.className = 'price';
        phone.className = 'phone';
        var img = document.createElement('img');
        img.src = data.downloadURL;
        img.className = "adimg";
        var divAd = document.createElement('div');
        var contain = document.getElementById('container');

        divAd.setAttribute('id', id);
        divAd.setAttribute('class', 'divads');
        divAd.addEventListener('click', this.clickAd);
        divAd.appendChild(img);
        title.appendChild(adTitle)
        price.appendChild(adprice)
        phone.appendChild(adphone)
        divAd.appendChild(price);
        divAd.appendChild(title);
        divAd.appendChild(phone);
        contain.appendChild(divAd);
    }

    clickAd(event) {
        var control = document.getElementById('showDet').className = 'show';
        var id = event.target.id;
        db.collection("olxAd").doc(id)
            .onSnapshot(function (doc) {
                var adInfoImg = document.getElementById('imgdet').src = doc.data().downloadURL;
                var title = document.getElementById('titledet').innerHTML = doc.data().title;
                var disc = document.getElementById('disdet').innerHTML = doc.data().disc;
                var price = document.getElementById('pricedet').innerHTML = 'Rs.' + doc.data().price + '/-';
                var OwnerName = document.getElementById('namedet').innerHTML = doc.data().name;
                var phone = document.getElementById('phonedet').innerHTML = doc.data().phone;
            });
        }

        clo(){
            var close = document.getElementById('showDet').className='hide'
        }
        
    render() {
        return (
            <div>
                <div id='tabDiv'>
                    <img src={logo} id="olxlogo" />
                    <select id="cities">
                        <option value="karachi">Karachi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                    </select>
                    <input type="text" id="search-bar" placeholder="Find Cars, Mobiles & more.." />
                    <img src={avatar} id="prologo" />
                    <img src={sell} id="sell" onClick={this.gotosell.bind(this)} />
                </div>

                <div id='showDet' className='hide'>
                    <p id='close' onClick={this.clo.bind(this)}> X </p>
                    <img id='imgdet' />
                    <p id='titledet'></p>
                    <p id='disdet'></p>
                    <p id='pricedet'></p>
                    <p id='namedet'></p>
                    <p id='phonedet'></p>
                </div>

                <div id='container'>
                </div>

            </div>
        )
    }
}



export default Home;
