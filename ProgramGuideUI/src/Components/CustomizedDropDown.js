import React from 'react';
import 'react-select/dist/react-select.css';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './Dropdown.css';

let xys = [];
let Roles = [];

var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState() {
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
	handleSelectChange(value) {
		if (value) {
			if (value.includes("Select All")) {
				var difficult_tasks = [];
				value = Roles.forEach(element => {
					if (element.value !== "Select All") {
						difficult_tasks.push(element.value);
					}
				});
				value = difficult_tasks;
				this.setState({ value });
			}

			else if(this.state.IdentifyName === 'Role'){
				this.setState({ value },function(){
					this.props.bindedRoleValue(value);
				});
			}

			else if(this.state.IdentifyName === 'Market'){
				this.setState({ value },function(){
					this.props.bindedMarketValue(value);
				});
			}
			else {
				this.setState({ value }, function () {
					this.props.bindedValue(value);
				});
			}
		}
		else {
			this.setState({ value });
		}

	},

	handleOnOpen() {

		if (this.state.IdentifyName === 'Role') {
			this.state.multiValues = false;
		}

		if (this.state.IdentifyName === 'Tags') {
			this.state.multiValues = false;
		}
		// alert('opened')
	},

	render() {
		let Market = [];
		if (this.props.Roles) {
			this.state.IdentifyName = 'Role'
			this.state.dispalyText = 'Select Role';
			this.state.id = 'Role';
			Roles = this.props.Roles.map((m) => { return m });
			// console.log('Roles')
		}

		if (this.props.Tags) {
			this.state.IdentifyName = 'Tags'
			this.state.dispalyText = '--Choose--';
			this.state.id = 'Tags';
			Roles = this.props.Tags.map((m) => { return m });
			// console.log('Roles')
		}

		if (this.props.Markets) {
			this.state.IdentifyName = 'Market'
			this.state.dispalyText = 'Select Market(s)';
			// console.log('Markets')
			// obj.Name
			Market.push({ label: 'Select All', value: 'Select All' });
			Roles = this.props.Markets.map((m) => { return m });
			Market.push(Roles);
			Roles.unshift({ label: 'Select All', value: 'Select All' });
			console.log(Roles);
			// console.log(Roles);
		}

		// console.log(Roles);

		const { value } = this.state;
		return (
			<div>
				<Select className={this.state.IdentifyName}
					closeOnSelect={true}
					placeholder={this.state.dispalyText}
					multi={this.state.multiValues}
					onOpen={this.handleOnOpen}
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
