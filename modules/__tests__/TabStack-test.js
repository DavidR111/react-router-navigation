import 'react-native'
import React, { PropTypes, Component } from 'react'
import { Match } from 'react-router'
import { TestRouter, componentFactory, TabView } from './utils'
import TabStack from './../TabStack'
import renderer from 'react-test-renderer'

it('<TabStack /> renders correctly', () => {
  const component = renderer.create(
    <TestRouter>
      <TabStack render={TabView}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
        <Match pattern="/goodbye" component={componentFactory('Goodbye')} />
      </TabStack>
    </TestRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<TabStack /> renders correctly with initialEntries prop ', () => {
  const component = renderer.create(
    <TestRouter initialEntries={['/hello']}>
      <TabStack render={TabView}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
        <Match pattern="/goodbye" component={componentFactory('Goodbye')} />
      </TabStack>
    </TestRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<TabStack /> re-renders correctly when "replace" action is called', () => {
  const component = renderer.create(
    <TestRouter>
      <TabStack render={TabView}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
        <Match pattern="/goodbye" component={componentFactory('Goodbye')} />
      </TabStack>
    </TestRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  tree.props.onPress((history) => history.replace('/hello'))
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
