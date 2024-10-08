const { MongoClient } = require("mongodb");

// Conectar a la base de datos MongoDB
async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        // Conectar al servidor
        await client.connect();

        // Seleccionar la base de datos y la colección
        const database = client.db("FacturacionElectronica");
        const collection = database.collection("parque");

        // Insertar documentos
        await collection.insertMany([
            { numeroPlaca: "ABC123", tipo: "Factura", fechaEmision: new Date("2024-08-01T10:00:00Z"), estado: "Emitida", monto: 1500, alerta: false },
            { numeroPlaca: "DEF456", tipo: "Factura", fechaEmision: new Date("2024-08-02T11:00:00Z"), estado: "Pendiente", monto: 2000, alerta: true },
            { numeroPlaca: "GHI789", tipo: "Factura", fechaEmision: new Date("2024-08-03T12:00:00Z"), estado: "Emitida", monto: 1000, alerta: false },
            { numeroPlaca: "JKL012", tipo: "Factura", fechaEmision: new Date("2024-08-04T13:00:00Z"), estado: "Pendiente", monto: 2500, alerta: true },
            { numeroPlaca: "MNO345", tipo: "Factura", fechaEmision: new Date("2024-08-05T14:00:00Z"), estado: "Emitida", monto: 3000, alerta: false }
        ]);

        console.log("Documentos insertados");

        // Actualizar el primer registro
        await collection.updateOne(
            { numeroPlaca: "ABC123" },
            { $set: { alerta: true, estado: "Revisada" } }
        );

        // Actualizar el último registro
        await collection.updateOne(
            { numeroPlaca: "MNO345" },
            { $set: { alerta: true, estado: "Pendiente" } }
        );

        console.log("Registros actualizados");

        // Listar todos los documentos
        const allDocs = await collection.find().toArray();
        console.log("Documentos en la colección:", allDocs);

        // Borrar el tercer documento
        await collection.deleteOne({ numeroPlaca: "GHI789" });
        console.log("Tercer documento eliminado");

        // Buscar un documento por número de placa
        const doc = await collection.findOne({ numeroPlaca: "DEF456" });
        console.log("Documento encontrado:", doc);

    } finally {
        await client.close();
    }
}

main().catch(console.error);
