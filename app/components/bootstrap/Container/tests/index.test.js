import React from 'react';
import { shallow } from 'enzyme';

import Container from '../index';

describe('<Container />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Container>
        <div>content</div>
      </Container>,
    );
    expect(wrapper.is('.container')).toBe(true);
    expect(wrapper.contains('content')).toBe(true);
  });
});
