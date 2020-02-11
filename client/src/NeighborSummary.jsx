import React from 'react';
import {Line, Zestimate, NeighborDiv, SummaryPara, Price} from './style.jsx';


const NeighborSummary = ({number}) => (
 <div>
    
<Line>
This is a seller's market
</Line>
There are more interested buyers than homes for sale. 
<Line>Neighborhood home value</Line>
<SummaryPara><label style ={{color: '#346eeb'}}>{number} home values</label> have risen 0.2 % over the past 12 months.</SummaryPara>
<NeighborDiv>
<Line>One-year prediction</Line>
<SummaryPara> predicts the home values in label {number} will rise 0.1% in the next 
year. </SummaryPara>
</NeighborDiv> 
<NeighborDiv>
<Line>Median home comparison</Line>
<SummaryPara>This home is valued 28.5% higher than the median home in {number} </SummaryPara>
</NeighborDiv>

<Line>
     <Zestimate> Median Zestimate<sup>&reg;</sup></Zestimate><Price>$1,192,599</Price>
</Line>
 </div>
)

export default NeighborSummary;