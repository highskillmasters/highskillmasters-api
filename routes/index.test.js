const sinon = require('sinon')

const index = require('./middleware')
const Member = require('./members/model')
const members = require('./members/middleware')

test('index.get() -> should show index API', () => {
  const sandbox = sinon.createSandbox()
  const send = sandbox.spy()

  index.get(null, { send })

  expect(
    send.calledOnceWith({
      title: 'High Skill Masters API',
    })
  ).toBeTruthy()

  sandbox.restore()
})

test('members.subscribe() -> should create new member', async () => {
  const sandbox = sinon.createSandbox()
  const create = sandbox.stub(Member, 'create')
  const send = sandbox.spy()

  await members.subscribe({ body: { email: 'a@b.com' } }, { send })

  expect(create.calledOnceWith({ email: 'a@b.com' })).toBeTruthy()

  expect(
    send.calledOnceWith({
      message: 'Subscribe email success',
      email: 'a@b.com',
    })
  ).toBeTruthy()

  sandbox.restore()
})
