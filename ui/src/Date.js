import React from 'react';

class CurrentDate extends React.Component{
    render(){
        const today = new Date(); 
        return(<div>{today.toDateString()}</div>)
    }
}

export default CurrentDate;