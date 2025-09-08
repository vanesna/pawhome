// postPet/index.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const crypto = require("crypto");

const client = new DynamoDBClient();
const ddb = DynamoDBDocumentClient.from(client);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
};

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    if (!body.nombre || !body.tipo) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "nombre y tipo son requeridos" }),
      };
    }

    const pet = {
      id: crypto.randomUUID(),
      nombre: body.nombre,
      edad: body.edad,
      tipo: body.tipo,
      sexo: body.sexo,
      localidad: body.localidad,
      foto: body.fotoUrl || null,
    };

    await ddb.send(
      new PutCommand({
        TableName: process.env.STORAGE_PETSTABLE_NAME,
        Item: pet,
      })
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(pet),
    };
  } catch (err) {
    console.error("Error en postPet:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
