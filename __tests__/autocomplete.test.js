const rooms = [
	{"_id": "5622eb1f105807ceb6ad868b", "name": "react"},
	{"_id": "5622eb1f105807ceb6ad868c", "name": "node"},
	{"_id": "5622eb1f105807ceb6ad868d", "name": "angular"},
	{"_id": "5622eb1f105807ceb6ad868e", "name": "backbone"},
	{"_id": "5622eb1f105807ceb6ad868f", "name": "express"},
	{"_id": "5622eb1f105807ceb6ad868g", "name": "rails"}
]

const 	TestUtils = require("react-dom/test-utils"),
		React = require("react"),
		ReactDOM = require("react-dom"),
		Autocomplete = require("../src/autocomplete.jsx"),
		fD = ReactDOM.findDOMNode
const autocomplete = TestUtils.renderIntoDocument(
		React.createElement(Autocomplete, {
			options: rooms,
			url: "test"
		})
	)

const optionName = TestUtils.findRenderedDOMComponentWithClass(autocomplete, "options-name")

describe("Autocomplete", () => {
	it("have four initial options", () => {
		var options = TestUtils.scryRenderedDOMComponentsWithClass(
			autocomplete,
			"options-list-item"
		)
		expect(options.length).toBe(4)
	})

	it("change options based on the input", () => {
		expect(fD(optionName).value).toBe("")
		fD(optionName).value = "r"
		TestUtils.Simulate.change(fD(optionName))
		expect(fD(optionName).value).toBe("r")
		options = TestUtils.scryRenderedDOMComponentsWithClass(autocomplete, "options-list-item")
		expect(options.length).toBe(1)
		expect(fD(options[0]).textContent).toBe("#react")
	})

	it("offer to save option when there are no matches", () => {
		fD(optionName).value = "ember"
TestUtils.Simulate.change(fD(optionName))
		options = TestUtils.scryRenderedDOMComponentsWithClass(autocomplete, "options-list-item")
		expect(options.length).toBe(0)
		var optionAdd = TestUtils.findRenderedDOMComponentWithClass(autocomplete, "options-add")
		expect(fD(optionAdd).textContent).toBe("Add #ember")
	})
})