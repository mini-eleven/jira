import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { http } from 'utils/http'

const apiUrl = process.env.REACT_APP_API_URL

const server = setupServer()

// 代表所有的测试之前, 先来执行一下回调
beforeAll(() => server.listen())

// 每一个测试跑完之后, 都重置mock路由
afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('http方法发送异步请求', async () => {
    const endpoint = 'test-endpoint'
    const mockResult = { mockValue: 'mock' }

    server.use(
        rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) => {
            res(ctx.json(mockResult))
        })
    )

    const result = await http(endpoint)
    expect(result).toEqual(mockResult)
})