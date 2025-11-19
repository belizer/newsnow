export default defineEventHandler((event) => {
  // 获取环境变量中的允许源，开发环境可以使用*，生产环境应该设置具体域名
  const allowedOrigins = process.env.ALLOWED_ORIGINS || '*';
  
  // 设置CORS头信息，允许所有来源访问
  setHeader(event, "Access-Control-Allow-Origin", allowedOrigins)
  setHeader(event, "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  setHeader(event, "Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
  setHeader(event, "Access-Control-Max-Age", 86400) // 24小时
  // 允许携带凭证（如果需要）
  setHeader(event, "Access-Control-Allow-Credentials", "true")

  // 处理预检请求
  if (event.method === "OPTIONS") {
    event.node.res.statusCode = 204
    event.node.res.end()
    return
  }

  // 继续处理其他请求
})