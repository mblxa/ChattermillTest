import React from 'react';
import { shallow } from 'enzyme';

import RowJustify from '../index';

describe('<RowJustify />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <RowJustify size={10}>
        <div>content</div>
      </RowJustify>,
    );
    expect(wrapper.is('.justify-content-center')).toBe(true);
    expect(wrapper.contains('content')).toBe(true);
    expect(wrapper.find('.col-lg-10').length).toBe(1);
  });
});
