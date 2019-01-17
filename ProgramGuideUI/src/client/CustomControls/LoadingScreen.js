import React, { Component } from 'react';
import $ from 'jquery';
import './LoadingScreen.css';
import '../Dashboard/Dashboard.css';
import ReactLoading from "react-loading";
import { Section, Article, Prop, list } from "./LoaderStyle";

class LoadingScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       $('#myOverlay').show();
       $('#loadingGIF').show();
    }

    onclick() {

    }

    //other logic
    render() {
        console.log(list[0]);
        return (
            <div className = "container" >
                <div id="myOverlay"></div>
                <div id="loadingGIF"><Section>
                    <Article key={list[0].prop}>
                        <ReactLoading type={list[0].prop} color="#fff" />
                        <Prop>{list[0].name}</Prop>
                    </Article>
                </Section></div>
            </div>
        );
    }
}

export default LoadingScreen;
