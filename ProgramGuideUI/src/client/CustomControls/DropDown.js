import React from 'react';
import 'react-select/dist/react-select.css';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
//import './Dropdown.css';

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
			IdentifyName: '',
			flag: true,
			SelectedValue: ''
		};
	},
	handleSelectChange(value) {
		this.setState({ flag: false, SelectedValue: value });
		if (value) {
			if (value.toString().split(',').includes("Select All")) {
				var difficult_tasks = [];
				value = Roles.forEach(element => {
					if (element.value !== "Select All") {
						difficult_tasks.push(element.value);
					}
				});
				//value = difficult_tasks;
				this.setState({ SelectedValue: difficult_tasks.toString() }, function () {
					this.props.bindedMarketValue(difficult_tasks.toString());
				});
			}

			else if (this.state.IdentifyName === 'Role') {
				this.setState({ value }, function () {
					this.props.bindedRoleValue(value);
				});
			}

			else if (this.state.IdentifyName === 'Market') {
				this.setState({ value }, function () {
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
			if (this.state.IdentifyName === 'Market') {
				this.setState({ value }, function () {
					this.props.bindedMarketValue(value);
				});
			}
			else {
				this.setState({ value });
			}
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
		//let Market = [];
		if (this.props.Roles) {
			this.state.IdentifyName = 'Role'
			this.state.dispalyText = 'Select Role';
			this.state.id = 'Role';
			Roles = this.props.Roles.map((m) => { return m });
			this.state.flag && this.props.SetInitalValue ? this.state.value = this.props.SetInitalValue : this.state.value = this.state.SelectedValue;
			this.state.multiValues = false;
		}

		if (this.props.Tags) {
			this.state.IdentifyName = 'Tags'
			this.state.dispalyText = '--Choose--';
			this.state.id = 'Tags';

			this.props.Tags.map(m => { if (m.label.includes('Any value except blank')) { return true } }).includes(true) ? '' : this.props.Tags.push({ label: 'Any value except blank', value: '?' });
			Roles = this.props.Tags.map((m) => { return m });

			this.state.flag && this.props.SetInitalValue ? this.state.value = this.props.SetInitalValue : this.state.value = this.state.SelectedValue;
			this.state.multiValues = false;
		}

		if (this.props.Markets) {
			this.state.IdentifyName = 'Market'
			this.state.dispalyText = 'Select Market(s)';
			Roles = this.props.Markets.map((m) => { return m })
				.sort((a, b) => {
					if (a.label < b.label) return -1;
					if (a.label > b.label) return 1;
					return 0;
				});

			this.state.SelectedValue && this.state.SelectedValue.toString().split(',').length === this.props.Markets.length
				? '' : Roles.unshift({ label: 'Select All', value: 'Select All' });
			this.state.value
			this.state.flag && this.props.SetInitalValue ? this.state.value = this.props.SetInitalValue : this.state.value = this.state.SelectedValue;
		}

		if (this.props.Websites) {
			this.state.IdentifyName = 'Website'
			this.state.dispalyText = 'Select Website';
			this.state.id = 'Website';
			Roles = this.props.Websites.map((m) => { return m });
			this.state.flag && this.props.SetInitalValue ? this.state.value = this.props.SetInitalValue : this.state.value = this.state.SelectedValue;
			this.state.multiValues = false;
		}

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
