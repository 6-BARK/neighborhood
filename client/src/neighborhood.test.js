import React from 'react';
import App from './Neighborhood.jsx';
import {mount, shallow, render } from 'enzyme';


describe ('App component', () => {
    it('renders correctly', () => {
        const wrapper = shallow (
            <App/>
        );
        expect(wrapper).toMatchSnapshot();
    })
});  
describe ( 'App component', () => {
    it('renders an image', () => {
        const wrapper = shallow (
            <App/>
        );
        expect(wrapper.find("img").prop("src")).toEqual( '<img src="https://7-xillow.s3-us-west-1.amazonaws.com/nearbyHouse1.png" />');

    })
});
//more tests comming..