const debug = require('debug')('∆:app spec')
import React from 'react';
import { mount, shallow } from 'enzyme';

import App from '../containers/app'

describe('App component', () => {
    const wrapper = shallow(<App/>)
    expect(warpper.state('username')).to.equal(null)
})