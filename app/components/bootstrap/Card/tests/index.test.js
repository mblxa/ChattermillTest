import React from 'react';
import { shallow } from 'enzyme';

import BackButtonTop from 'components/BackButtonTop';

import Card from '../index';

describe('<Card />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Card title={<span>test</span>} url="/">
        <div>content</div>
      </Card>,
    );
    expect(wrapper.contains('test')).toBe(true);
    expect(wrapper.contains('content')).toBe(true);
    expect(wrapper.find(BackButtonTop).length).toBe(1);
  });
});
