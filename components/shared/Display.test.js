import React from 'react'
import { shallow } from 'enzyme'
import Display from './Display'

describe('Display', () => {
  it('shows the children if truthy', () => {
    const wrapper = shallow(
      <Display if={true}>
        <p>show me please</p>
      </Display>)
    expect(wrapper.find('p').text()).toEqual(
      'show me please'
    )
  })
  it('does not render the children if falsy', () => {
    const wrapper = shallow(
      <Display if={false}>
        <p>show me please</p>
      </Display>)
    expect(wrapper.find('p').length).toEqual(0)
  })
})
