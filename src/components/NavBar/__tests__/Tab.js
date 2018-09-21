import { render } from 'enzyme';

import Tab from '../Tab';

describe('<Tab/>', () => {
  it('should render default state', () => {
    const wrapper = render(<Tab id="hello" onClick={() => null}>Hello world</Tab>);

    expect(wrapper).toMatchSnapshot();
  });
  it('should render active state', () => {
    const wrapper = render(<Tab
      id="hello"
      onClick={() => null}
      isActive={true}>Hello selected world</Tab>);

    expect(wrapper).toMatchSnapshot();
  });
});
