import React from 'react';
import {SpanWalkscore, WalkscoreDiv, Score,Icon} from './style.jsx'


const WalkScore = ({walkscore, transitscore, showTooltip, showdisplayTransit}) => (
<WalkscoreDiv>
    <Score onClick = {showTooltip}> 
    <Icon className="material-icons" >
directions_walk
</Icon> Walk Score &reg;  {walkscore} 
  <SpanWalkscore>(Very Walkable)</SpanWalkscore> 
        </Score>
        <Score onClick= {showdisplayTransit}>	
        <Icon className="material-icons">
directions_transit
</Icon> Transit Score &trade;  {transitscore}
        <SpanWalkscore>(Good Transit)</SpanWalkscore> 
        </Score>
</WalkscoreDiv>
)

export default WalkScore;