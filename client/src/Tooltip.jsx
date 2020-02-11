import React from 'react';
import WalkScore from './WalkScore.jsx';
import {Ttip, Bubble, Message} from './style.jsx';

class Tooltip extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        displayTooltip: false,
        displayTransit: false
      }
      this.hideTooltip = this.hideTooltip.bind(this)
      this.showTooltip = this.showTooltip.bind(this)
      this.showdisplayTransit = this.showdisplayTransit.bind(this)
    }
    hideTooltip () {
      this.setState({
        displayTooltip: false,
        displayTransit: false
      })
    }
    showTooltip () {
      this.setState({
        displayTooltip: true,
        displayTransit: false
      })
    }

    showdisplayTransit () {
      this.setState ({
        displayTooltip: false,
        displayTransit: true
      })
    }
    render() {
      let message = this.props.message
      let messageTransit = this.props.messageTransit
    
      return (
     
          <Ttip>
        <span
            onMouseLeave={this.hideTooltip}
          >
          {this.state.displayTooltip &&
          <Bubble>
            <Message>{message}</Message>
          </Bubble>
          }
          {this.state.displayTransit &&
          <Bubble>
             <Message>{messageTransit}</Message>
          </Bubble>
          }
          <span >
              <WalkScore showTooltip = {this.showTooltip} showdisplayTransit = {this.showdisplayTransit}/>
          </span>
         
        </span>
        </Ttip>
        
      
        
      )
    }
  }
  
 export default Tooltip;