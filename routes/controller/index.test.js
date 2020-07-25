const { createMember, index } = require('./index')
const sinon = require('sinon')
const Member = require('../members/model')

test('index() -> should show index API', () => {
  const sandbox = sinon.createSandbox()
  const send = sandbox.spy()
  index(null, { send })
  expect(send.calledOnceWith({ title: 'High Skill Masters API' })).toBeTruthy()
  sandbox.restore()
})

test('createMember() -> should create new member', async () => {
  const sandbox = sinon.createSandbox()
  const create = sandbox.stub(Member, 'create')
  const send = sandbox.spy()
  await createMember({ body: { email: 'a@b.com' } }, { send })
  expect(create.calledOnceWith({ email: 'a@b.com' })).toBeTruthy()
  expect(
    send.calledOnceWith({
      message: 'Email is successfully subscribed',
      email: 'a@b.com',
    })
  ).toBeTruthy()
  sandbox.restore()
})
