import { shallow } from 'enzyme';
import EmptyState from '../../components/shared/EmptyState';

describe('EmptyState', () => {
	it ('shows the empty text passed as props', () => {
		const wrapper = shallow(<EmptyState emptyText="No users" />)
		expect(wrapper.find('p').text()).toEqual(
			'No users'
		);
	});
});
