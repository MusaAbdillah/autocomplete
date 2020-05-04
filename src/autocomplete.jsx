const React = require("react")
const ReactDOM = require("react-dom")
const request = require("axios")
const fD = ReactDOM.findDOMNode
class Autocomplete extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			options: this.props.options,
			filteredOptions: this.props.options,
			currentOption: ''
		}
		this.filter = this.filter.bind(this)
		this.addOption = this.addOption.bind(this)
		this.printSomething = this.printSomething.bind(this)
	}

	componentDidMount(){
		if (this.props.url == "test") return true
		request({url: this.props.url + "/rooms"})
			.then(response => response.data)
			.then(body => {
				if (!body) {
					console.error("Failed to load")
				}
				this.setState({options: body})
			})
			.catch(console.error)
	}

	filter(event){
		console.log("PRINT EVENT===================================")
		console.log(event)
		console.log("PRINT EVENT===================================")
		this.setState({
			currentOption: event.target.value,
			filteredOptions: (this.state.options.filter(function(options, index, list) {
				return(event.target.value === options.name.substr(0, event.target.value.length))
			}))
		})
	}

	addOption(event){
		let currentOption = this.state.currentOption
		request.post(this.props.url + "/rooms", {name: currentOption})
			.then(response => response.data)
			.then((body) => {
				if (!body) {
					return console.error("Failed to save")
				}
				this.setState(
					{options: [body].concat(this.state.options)},
					() => { this.filter({target: {value: currentOption}}) }
				)
			})
			.catch(error => { return console.error("Failed to save")})
	}

	printSomething(e){
		console.log("==========================")
		console.log("PRINT SOMETHING TO ME!")
		console.log("==========================")
	}

	render(){
		return(
			<div className="form-group">
				<input type="text"
		          onKeyUp={(event)=>(event.keyCode==13)?this.addOption():''}
		          className="form-control option-name"
		          onChange={this.filter}
		          value={this.currentOption}
		          placeholder="React.js" 
				>
				</input>
				{
					this.state.filteredOptions.map(function(option, index, list){
						return(
							<div key={option._id}>
								<a className="btn btn-default option-list-item" href={"/#/" + option.name} target="_blank">
									#{option.name}
								</a>
							</div>
						)
					})
				}
						{console.log("================================")}
						{console.log("YOU SHOULD HERE! filteredOptions")}
						{console.log(this.state.filteredOptions)}
						{console.log("YOU SHOULD HERE! filteredOptions")}
						{console.log("================================")}

						{console.log("IS CONDITION TRUE================================")}
						{console.log(this.state.filteredOptions.length == 0 && this.state.currentOption != "")}
						{console.log("IS CONDITION TRUE================================")}
				{(() => {
					if (this.state.filteredOptions.length == 0 && this.state.currentOption != "") {
						return(
							<a className="btn btn-info option-add" onClick={this.addOption}>
								Add #{this.state.currentOption}
							</a>
						)
					}	
				})()}
			</div>
		)
	}
}

module.exports = Autocomplete