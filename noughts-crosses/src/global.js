import React from 'react';
import ReactDOM from 'react-dom';

const UserContext = React.createContext()

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

export default UserContext



		if(this.state.prevState === "X")
		{
			this.setState({value:"O"})
			this.setState({prevState:"O"})
		}
		else
		{
			this.setState({value:"X"})
			this.setState({prevState:"X"})			
		}