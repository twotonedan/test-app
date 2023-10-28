import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

describe("test", () => {
	test("renders learn react link", () => {
		render(<App />)
		const linkElement = screen.getByText('Github Copilot')
		expect(linkElement).toBeInTheDocument()
	})
})
