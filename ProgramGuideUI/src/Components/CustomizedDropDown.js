import React from 'react';
import 'react-select/dist/react-select.css';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './Dropdown.css';

const FLAVOURS = [
	{ label:'Select All', value:'Select All'},
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

let xys = [];
let Roles = []; 

var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			removeSelected: true,
			disabled: false,
			crazy: false,
			stayOpen: false,
			value: [],
			rtl: false,
			multiValues: true,
			dispalyText: '',
			IdentifyName: ''
		};
	},
	handleSelectChange (value) {
		if(value){
		if(value.includes("Select All")){
			var difficult_tasks = [];
			value = Roles.forEach(element => {
				if(element.value !== "Select All"){
					 difficult_tasks.push(element.value);
				}
			});
			value = difficult_tasks;
			this.setState({ value });
		}
		else{
			this.setState({ value });
		}
	}
	else{
		this.setState({ value });
	}
		
	},

	handleOnOpen(){

		if(this.state.IdentifyName === 'Role'){
			this.state.multiValues = false;
		}
		// alert('opened')
	},

	render () {
		let Market = [];
		if(this.props.Roles){
			this.state.IdentifyName = 'Role'
			this.state.dispalyText = 'Select Role';
			this.state.id = 'Role';
			Roles = this.props.Roles.map((m) => {return m});
			// console.log('Roles')
		}

		if(this.props.Markets){
			this.state.IdentifyName = 'Market'
			this.state.dispalyText = 'Select Market(s)';
			// console.log('Markets')
			// obj.Name
			Market.push({label: 'Select All', value: 'Select All'});
			Roles = this.props.Markets.map((m) => {return m});
			Roles.unshift({label: 'Select All', value: 'Select All'});
			Market.push(Roles);
			console.log(Roles);
			// console.log(Roles);
		}

		// console.log(Roles);

		 const { value } = this.state;
		 // console.log(FLAVOURS);
		// const options = crazy ? WHY_WOULD_YOU : FLAVOURS;
		return (
			<div>
				<Select className= {this.state.IdentifyName}
					closeOnSelect={true}
					placeholder={this.state.dispalyText}
					multi = {this.state.multiValues}
					onOpen = {this.handleOnOpen}
					onChange={this.handleSelectChange}
					options={Roles}
					simpleValue
					value={value}
				/>
			</div>
		);
	}
});
export default MultiSelectField;
