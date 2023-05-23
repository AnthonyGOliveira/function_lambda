var AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let responseBody = '';
  let statusCode = 0;
  let { id = null, price = null } = {}; // Definindo valores padrão
  
  if (event.body) {
    ({ id, price } = JSON.parse(event.body));
  }

  const params = {
    TableName: 'dioItems',
    Item: {
      id: id,
      price: price
    }
  };

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing 'id' parameter",
      }),
    };
  }
  
  try {
    await dynamodb.put(params).promise();
  } catch(err) {
    statusCode = 200;
    responseBody = JSON.stringify(err)
  }
  
  const response = {
    statusCode: statusCode,
    body: responseBody
  }
  
  return response;
};
