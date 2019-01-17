import axios from 'axios';
import React from 'react';
import * as API from '../utils/endPoint';
import * as Constant from '../utils/constant';


export function getPageAliasData() {
    axios.get(API.PAGE_ALIAS)
        .then(result => {
            this.drillDownAlais = result.data;
        }).catch(err => { console.log(err) });
}