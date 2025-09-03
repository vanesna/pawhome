// postPet/index.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const crypto = require("crypto");

const client = new DynamoDBClient();
const ddb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const pet = {
      id: crypto.randomUUID(), // ✅ genera un UUID sin instalar nada
      nombre: body.nombre,
      edad: body.edad,
      tipo: body.tipo,
      sexo: body.sexo,
    };

    await ddb.send(
      new PutCommand({
        TableName: process.env.STORAGE_PETSTABLE_NAME,
        Item: pet,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(pet),
    };
  } catch (err) {
    console.error("Error en postPet:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
