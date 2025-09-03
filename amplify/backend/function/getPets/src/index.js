// getPets/index.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient();
const ddb = DynamoDBDocumentClient.from(client);

exports.handler = async () => {
  try {
    const result = await ddb.send(
      new ScanCommand({
        TableName: process.env.STORAGE_PETSTABLE_NAME,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (err) {
    console.error("Error en getPets:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
