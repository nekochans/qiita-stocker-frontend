import lambda from 'aws-lambda'
import awsServerlessExpress from 'aws-serverless-express'
import app from './app'

const server = awsServerlessExpress.createServer(app)

module.exports.render = (
  event: lambda.APIGatewayEvent,
  context: lambda.Context
) => {
  awsServerlessExpress.proxy(server, event, context)
}
