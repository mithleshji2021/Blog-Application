import { Account, Client, ID } from "appwrite"
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            if (error.type === "user_already_exists") {
                console.log("User already exists")
            }
            console.log("Error in Creating Account ::", error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
        } catch (error) {
            console.log("Error in login ::", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error in getting Account ::", error);
            return null; // ✅ move this INSIDE catch
        }
    }


    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Error in Deleting Account ::", error);
        }
    }
}

const authService = new AuthService()
export default authService
