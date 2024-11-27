import { connectDatabase } from '../database';

export const populateDrivers = async () => {
    const db = await connectDatabase();

    const drivers = [
        {
            name: 'Homer Simpson',
            description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
            vehicle: 'Plymouth Valiant 1973 Rosa e Enferrujado',
            review_rating: 2,
            review_comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
            rate_per_km: 2.5,
            min_km: 1,
        },
        {
            name: 'Dominic Toretto',
            description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
            vehicle: 'Dodge Charger R/T 1970 Modificado',
            review_rating: 4,
            review_comment: 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
            rate_per_km: 5.0,
            min_km: 5,
        },
        {
            name: 'James Bond',
            description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
            vehicle: 'Aston Martin DB5 Clássico',
            review_rating: 5,
            review_comment: 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
            rate_per_km: 10.0,
            min_km: 10,
        },
    ];

    try {
        for (const driver of drivers) {
            const existingDriver = await db.get('SELECT * FROM drivers WHERE name = ?', [driver.name]);

            if (!existingDriver) {
                await db.run(
                    `INSERT INTO drivers (name, description, vehicle, review_rating, review_comment, rate_per_km, min_km)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [
                        driver.name,
                        driver.description,
                        driver.vehicle,
                        driver.review_rating,
                        driver.review_comment,
                        driver.rate_per_km,
                        driver.min_km,
                    ]
                );
            } else {
            }
        }
    } catch (error) {
        console.error('Erro ao inserir motoristas:', error);
    } finally {
        await db.close();
    }
};


populateDrivers();
