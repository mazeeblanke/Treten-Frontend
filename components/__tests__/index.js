import Banner from "../home/Banner";
import { shallow } from 'enzyme';

it ('works', () => {
  expect(1).toBe(1);
})

it ('renders component', () => {

  const wrapper = shallow(<Banner />);

  expect(wrapper.find('h2').text()).toEqual('Accelerate your career with industry-leading certifications');

})