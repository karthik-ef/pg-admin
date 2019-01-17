import React from 'react';
import $ from 'jquery';
// import ReactLoading from "react-loading";
import { Section, Article, Prop, list } from "./generic";
import "./styles.css";

export default class App extends React.Component {

    componentDidMount() {
        $("#button").click(function () {
            $('#myOverlay').show();
            $('#loadingGIF').show();
            setTimeout(function () {
                $('#myOverlay').hide();
                $('#loadingGIF').hide();
            }, 3000);
        });
    }

    //other logic
    render() {
        console.log(list[0]);
        return (
            <div>
                <div id="myOverlay"></div>
                <div id="loadingGIF"><Section>
                    <Article key={list[0].prop}>
                        <ReactLoading type={list[0].prop} color="#fff" />
                        <Prop>{list[0].name}</Prop>
                    </Article>
                    {/* {list.map(l => (
            <Article key={l.prop}>
              <ReactLoading type={l.prop} color="#fff" />
              <Prop>{l.name}</Prop>
            </Article>
          ))} */}
                </Section></div>
                <button id="button">Submit</button>
            </div>
        );
    }
}