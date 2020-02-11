import styled from 'styled-components';

//Neighborhood
export const Body = styled.div `
max-width: 500px;
margin: auto;
`
export const Image = styled.img `
width: 450px;
`
export const Svg = styled.svg `
fill: white;
background-color:#346eeb;
vertical-align: middle;
width: 30px;
height:30px;
margin-left: 0px;
border-radius: 50%;
margin-top:2px
`
export const Label = styled.label `
cursor: pointer
`
export const Para = styled.p `
letter-spacing: 0.3px;
margin-left:2px;
&:hover {
    opacity: 0.6;
    }
`
export const Span = styled.span `
margin: 7px
`
export const Title = styled.h1 `
font-family: 'Notable', sans-serif;
border-bottom: 0.1px solid silver;
font-weight: normal;
color: #000000;
padding: 10px;
letter-spacing: 1px;
`
export const Wide = styled.div `
padding:8px;
`

//Nearbyhomes

export const Container = styled.div `
display: flex;
width: 450px;
float: center;
`
export const SpanOne = styled.span `
width:225px;
border-right: 0.2px solid silver;
border-left: 0.2px solid silver;
border-bottom: 3px solid #346eeb;
border-top: 0.2px solid silver;
flex: 1 1 auto;
cursor: pointer;

`
export const ImageNearby = styled.img `
width: 225px;
`

export const Para_nearby = styled.div `
font-size: 11px;
margin: 6px;
padding:0px;
font-weight: none;
line-style:none;
letter-spacing: 0.2px;
`
export const Dot = styled.p `
height: 10px;
width: 10px;
background-color: #ffd700;
border-radius: 50%;
display: inline-block;
float: right;
margin-right: 10px;
margin-top: 5px;
`
export const Dott = styled.div `
height: 4px;
width: 4px;
background-color: #B0B0B0;
border-radius: 50%;
display: inline-block;
`
export const Bold = styled.div `
font-weight: bold;
margin: 0
`

//Walkscore
export const SpanWalkscore = styled. span `
color: black;
font-weight: normal;
&:hover {
  opacity: none;
  }
`
export const WalkscoreDiv = styled.div `
color: #346eeb;
line-height: 0;
font-weight: 0;
cursor: pointer;
`
export const Score = styled.h4 `
font-size: 15px;
&:hover {
  opacity: 0.6;
  }
`

export const Icon = styled.i `
font-family: 'Material Icons';
font-weight: normal;
font-style: normal;
font-size: 15px;  /* Preferred icon size */
display: inline-block;
line-height: 1;
text-transform: none;
letter-spacing: normal;
word-wrap: normal;
white-space: nowrap;
direction: ltr;
`

//NeighborhoodSummary

export const Line = styled.p `
cursor: pointer;
color: #121212;
font-weight: bold;
padding: 0px;

`
export const NeighborDiv = styled.div `


`
export const SummaryPara = styled.div `
color : #242625
marging-top:0

`
export const Price = styled.span `
margin-left: 250px;
`
export const Zestimate = styled.span `
border-bottom: dotted;
border-color:silver;
`

//Tooltip
export const Message = styled.div `
background: black;
border-radius: 3px;
color: white;
font-size: .75rem;
line-height: 1.4;
padding: .75em;
text-align: center;
font- family: font-family: "Open Sans", Tahoma, Geneva, sans-serif;
`
export const Bubble = styled.span `
min-width: 120px;
max-width: 210px;
position: absolute;
border-radius: 5px;
top: 100%;
  left: 40%;
  padding-top: 9px;
  transform: translateX(-100%);
&::after {
  content: '';
  position: absolute;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 9px solid black;
  top: 0%;
  left: 50%;
  transform: translateX(-100%);
}
`
export const Ttip = styled.div `
  position: relative;
`
export const WalkButton = styled.button `
background-color: Transparent;
background-repeat:no-repeat;
border: none;
cursor:pointer;
overflow: hidden;
outline:none;
color: purple;
`
export const TransitButton = styled.button `
background-color: Transparent;
background-repeat:no-repeat;
border: none;
cursor:pointer;
overflow: hidden;
outline:none;
color: #346eeb;
`