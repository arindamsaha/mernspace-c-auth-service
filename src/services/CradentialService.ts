
import bcrypt from "bcrypt";

export class CredentialService {

    async comparePassword(password: string, hashedPassword: string) {
        // Implementation for validating credentials

        return await bcrypt.compare(password, hashedPassword);
       
    }
}