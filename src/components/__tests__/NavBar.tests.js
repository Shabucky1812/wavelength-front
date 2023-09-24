/* eslint-disable */
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("NavBar renders", () => {
    render (
        <Router>
            <NavBar />
        </Router>
    )

    const signInLink = screen.getByRole('link', {name: 'Sign In'})
    expect(signInLink).toBeInTheDocument()
})

test("NavBar renders link to a logged in user profile", async () => {
    render (
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    )

    const profileAvatar = await screen.findByText('Profile')
    expect(profileAvatar).toBeInTheDocument()
})

test("NavBar renders sign in + up buttons after signing out", async () => {
    render (
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    )

    const signOutLink = await screen.findByRole('link', {name: 'Sign Out'})
    fireEvent.click(signOutLink)

    const signInLink = await screen.findByRole('link', {name: 'Sign In'})
    const signUpLink = await screen.findByRole('link', {name: 'Sign Up'})

    expect(signInLink).toBeInTheDocument()
    expect(signUpLink).toBeInTheDocument()
})