import {DataSource} from "typeorm";


export const truncateTables = async (connection: DataSource) => {
    const entities = connection.entityMetadatas;
    for (const entity of entities) {
        const repository = connection.getRepository(entity.name);
        await repository.clear();
    }
}

export const isJwt = (token: string | null): boolean => {
    if (!token) {
        return false;
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
        return false;
    }

    try {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
        return typeof payload === 'object' && payload !== null;
    }  catch (error) {
        return false;
    }
}

